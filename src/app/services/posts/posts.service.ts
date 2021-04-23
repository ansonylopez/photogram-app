import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsPage = 0;

  constructor(private http: HttpClient) { }

  getPosts() {
    this.postsPage++;

    return this.http.get(`${URL}/posts/?page=${this.postsPage}`);
  }
}
