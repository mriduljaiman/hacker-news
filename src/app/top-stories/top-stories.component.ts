import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-top-stories',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './top-stories.component.html',
  styleUrl: './top-stories.component.css'
})
export class TopStoriesComponent implements OnInit{

  stories: any[] = [];
  loading: boolean = false;
  startIndex: number = 0;
  batchSize: number = 10;
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;

  constructor(private news : NewsService){}

  ngOnInit(): void {
    this.loadMoreStories();
  }

  loadMoreStories(): void {
    if (this.loading) return;

    this.loading = true;

    this.news.getNewStoriesDetails(this.startIndex, this.batchSize).subscribe(stories => {
      this.stories = [...this.stories, ...stories];
      this.startIndex += this.batchSize;
      this.loading = false;
    });
  }

}
