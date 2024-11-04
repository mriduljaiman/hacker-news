import { Component, OnInit } from '@angular/core';
import { NewsService } from '../services/news.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-stories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-stories.component.html',
  styleUrl: './top-stories.component.css'
})
export class TopStoriesComponent implements OnInit{

  stories: any[] = [];

  constructor(private news : NewsService){}

  ngOnInit(): void {
    this.news.getTopStoriesDetails().subscribe(stories =>{
      this.stories = stories;
    });
  }

}
