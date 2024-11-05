import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';
  private itemUrl = 'https://hacker-news.firebaseio.com/v0/item/';

  constructor(private http: HttpClient) {}

  getNewStories(startIndex: number, batchSize: number = 10): Observable<any[]> {
    return this.http.get<number[]>(this.apiUrl).pipe(
      map(ids =>ids.slice(startIndex, startIndex+ batchSize))
    );
  }

  getStory(id: number): Observable<any> {
    return this.http.get<any>(`${this.itemUrl}${id}.json?print=pretty`);
  }

  getNewStoriesDetails(startIndex: number, batchSize: number = 10): Observable<any[]> {
    return this.getNewStories(startIndex, batchSize).pipe(
      switchMap(ids => {
        const requests = ids.map(id => this.getStory(id));
        return forkJoin(requests);
      })
    );
  }


}