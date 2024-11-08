import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { CommonModule } from '@angular/common';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-top-stories',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule, NgxSpinnerModule],
  templateUrl: './top-stories.component.html',
  styleUrl: './top-stories.component.css'
})
export class TopStoriesComponent implements OnInit{
[x: string]: any;

  stories: any[] = [];
  loading: boolean = false;
  startIndex: number = 0;
  batchSize: number = 10;
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;

  constructor(private news : NewsService,
    private spinner: NgxSpinnerService
  ){}

  ngOnInit(): void {
    this.loadMoreStories();
  }

  loadMoreStories(): void {
    if (this.loading) return;

    this.loading = true;
    console.log('Loading started...');
    this.spinner.show();

    this.news.getNewStoriesDetails(this.startIndex, this.batchSize).subscribe(stories => {
      console.log('API response received:', stories);
      this.stories = [...this.stories, ...stories];
      this.startIndex += this.batchSize;
      this.loading = false;
      this.spinner.hide();
      console.log('Loading finished');
    });
  }

}
