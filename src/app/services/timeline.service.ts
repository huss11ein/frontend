import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TimelineService {
  constructor(private http: HttpClient) {}
  private get httpOptions(): { headers: HttpHeaders } {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${userData.token}`,
    });
    return { headers };
  }

  public getPosts(start: number): Observable<any> {
    const url = 'http://localhost:8000/user/post';
    return this.http.post(url, { start: start }, this.httpOptions);
  }
  public getMorePosts(start: number, lastPostSeen: string): Observable<any> {
    const url = 'http://localhost:8000/user/post';
    return this.http.post(
      url,
      { start: start, lastPostSeen: lastPostSeen },
      this.httpOptions
    );
  }
  public like(id: string): Observable<any> {
    const url = `http://localhost:8000/user/reaction/${id}`;
    return this.http.post(url, '', this.httpOptions);
  }
  public comment(id: string, comment: string): Observable<any> {
    const url = `http://localhost:8000/user/comment/${id}`;
    return this.http.post(url, { comment: comment }, this.httpOptions);
  }
  public getCompanyPosts(start: number, id: String): Observable<any> {
    const url = `http://localhost:8000/user/companyPosts/${id}`;
    return this.http.post(url, { start: start }, this.httpOptions);
  }
  public getMoreCompanyPosts(
    start: number,
    lastPostSeen: string,
    id: any
  ): Observable<any> {
    const url = `http://localhost:8000/user/companyPosts/${id}`;
    return this.http.post(
      url,
      { start: start, lastPostSeen: lastPostSeen },
      this.httpOptions
    );
  }
}
