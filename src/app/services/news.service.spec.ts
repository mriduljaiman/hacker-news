import { TestBed } from '@angular/core/testing';

import { NewsService } from './news.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('NewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  // Sample mock data for the test
  const mockStoryIds = [1, 2, 3, 4, 5];
  const mockStories = [
    { id: 1, title: 'Story 1', by: 'Author 1', score: 100, descendants: 10, time: 1609459200, url: 'https://example.com' },
    { id: 2, title: 'Story 2', by: 'Author 2', score: 150, descendants: 20, time: 1609545600, url: 'https://example.com' },
    { id: 3, title: 'Story 3', by: 'Author 3', score: 200, descendants: 30, time: 1609632000, url: 'https://example.com' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  
      providers: [NewsService]
    });

    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Test for getNewStories
  it('should fetch new story IDs based on startIndex and batchSize', () => {
    const startIndex = 0;
    const batchSize = 2;

    service.getNewStories(startIndex, batchSize).subscribe((ids) => {
      expect(ids.length).toBe(2); 
      expect(ids).toEqual([1, 2]);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockStoryIds);
  });

  // Test for getStory
  it('should fetch details for a specific story', () => {
    const storyId = 1;

    // Make the HTTP request
    service.getStory(storyId).subscribe((story) => {
      expect(story).toEqual(mockStories[0]);
    });

    const req = httpMock.expectOne(`${service['itemUrl']}${storyId}.json?print=pretty`);
    expect(req.request.method).toBe('GET');
    req.flush(mockStories[0]);
  });

  it('should fetch details for multiple stories based on new story IDs', () => {
    const startIndex = 0;
    const batchSize = 2;

    // Make the HTTP request
    service.getNewStoriesDetails(startIndex, batchSize).subscribe((stories) => {
      expect(stories.length).toBe(2);
      expect(stories).toEqual([mockStories[0], mockStories[1]]); 
    });

    const req1 = httpMock.expectOne(service['apiUrl']);
    expect(req1.request.method).toBe('GET');
    req1.flush(mockStoryIds);

    const req2 = httpMock.expectOne(`${service['itemUrl']}1.json?print=pretty`);
    expect(req2.request.method).toBe('GET');
    req2.flush(mockStories[0]);

    const req3 = httpMock.expectOne(`${service['itemUrl']}2.json?print=pretty`);
    expect(req3.request.method).toBe('GET');
    req3.flush(mockStories[1]);
  });
});
