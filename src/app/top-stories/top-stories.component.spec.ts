import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TopStoriesComponent } from './top-stories.component';
import { NewsService } from '../services/news.service';
import { of } from 'rxjs';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';

describe('TopStoriesComponent', () => {
  let component: TopStoriesComponent;
  let fixture: ComponentFixture<TopStoriesComponent>;
  let newsService: jasmine.SpyObj<NewsService>;

  // Mock data for testing
  const mockStories = [
    { id: 1, title: 'Story 1', by: 'Author 1', score: 100, descendants: 10, time: 1609459200, url: 'https://example.com' },
    { id: 2, title: 'Story 2', by: 'Author 2', score: 150, descendants: 20, time: 1609545600, url: 'https://example.com' },
  ];

  beforeEach(async () => {
    const newsServiceMock = jasmine.createSpyObj('NewsService', ['getNewStoriesDetails', 'getStory']);

    newsServiceMock.getNewStoriesDetails.and.returnValue(of(mockStories));

    await TestBed.configureTestingModule({
      imports: [TopStoriesComponent, CommonModule, InfiniteScrollModule],
      providers: [{ provide: NewsService, useValue: newsServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(TopStoriesComponent);
    component = fixture.componentInstance;
    newsService = TestBed.inject(NewsService) as jasmine.SpyObj<NewsService>;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load stories on init', () => {
    expect(newsService.getNewStoriesDetails).toHaveBeenCalled();
    expect(component.stories.length).toBeGreaterThan(0);
    expect(component.stories).toEqual(mockStories);
  });

  it('should load more stories when scrolled', () => {
    const spy = spyOn(component, 'loadMoreStories');
    
    component.loadMoreStories();
    
    expect(spy).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });

  it('should append new stories when loadMoreStories is called', () => {
    component.stories = [...mockStories];
    const newStories = [
      {  id: 1, title: 'Story 1', by: 'Author 1', score: 100, descendants: 10, time: 1609459200, url: 'https://example.com' }
    ];

    component.loadMoreStories();

    expect(component.stories.length).toBe(4);
    expect(component.stories[2]).toEqual(newStories[0]);
  });

  it('should display loading indicator when loading stories', () => {
    component.loading = true;
    fixture.detectChanges();

    const loadingMessage = fixture.nativeElement.querySelector('div');
    expect(loadingMessage.textContent).toContain('Loading stories...');
  });
});
