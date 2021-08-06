import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { PostsResponse } from '../../interfaces/interfaces';
import { UserService } from '../user.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsPage = 0;

  constructor(
    private http: HttpClient,
    private userService: UserService
    ) { }

  getPosts() {
    this.postsPage++;

    return this.http.get<PostsResponse>(`${URL}/posts/?page=${this.postsPage}`);
  }

  createPost(post) {

    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise( resolve => {

      this.http.post(`${ URL }/posts`, post, { headers })
        .subscribe( resp => {
          console.log(resp);
        })

    })

  }

  restartPostPage() {
    this.postsPage = 0;
  }
}
