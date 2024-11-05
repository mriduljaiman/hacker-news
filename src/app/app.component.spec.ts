import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,           
        MatToolbarModule,        
        RouterLink,
        RouterLinkActive,
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "hacker-news"', () => {
    expect(component.title).toEqual('hacker-news');
  });

  it('should have router links working', () => {
    const compiled = fixture.nativeElement;
    const newPostsButton = compiled.querySelector('button');
    expect(newPostsButton).toBeTruthy();
    expect(newPostsButton.getAttribute('routerLink')).toEqual('/new-posts');
  });
});
