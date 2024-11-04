import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
  private itemUrl = 'https://hacker-news.firebaseio.com/v0/item/';

  constructor(private http: HttpClient) {}

  getTopStories(): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl);
  }

  getStory(id: number): Observable<any> {
    return this.http.get<any>(`${this.itemUrl}${id}.json?print=pretty`);
  }

  getTopStoriesDetails(): Observable<any[]> {
    return this.getTopStories().pipe(
      switchMap(ids => {
        const topTenIds = ids.slice(0, 10);
        const requests = topTenIds.map(id => this.getStory(id));
        return forkJoin(requests);
      })
    );
  }
}