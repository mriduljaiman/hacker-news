import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AppConstants } from '../AppConstants';
import { Story } from '../model/Story';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiUrl = AppConstants.API_URL;
  private itemUrl = AppConstants.ITEM_URL;

  constructor(private http: HttpClient) {}

  // Fetches a list of story IDs
  getNewStories(startIndex: number, batchSize: number = 10): Observable<number[]> {
    return this.http.get<number[]>(this.apiUrl).pipe(
      map(ids =>ids.slice(startIndex, startIndex+ batchSize))
    );
  }

    // Fetches the details of a single story by ID
  getStory(id: number): Observable<Story> {
    return this.http.get<Story>(`${this.itemUrl}${id}.json?print=pretty`);
  }

    // Fetches multiple stories' details by their IDs
  getNewStoriesDetails(startIndex: number, batchSize: number = 10): Observable<Story[]> {
    return this.getNewStories(startIndex, batchSize).pipe(
      switchMap(ids => {
        const requests = ids.map(id => this.getStory(id));
        return forkJoin(requests);
      })
    );
  }


}