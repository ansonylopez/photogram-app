import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Post, PostsResponse } from '../../interfaces/interfaces';
import { UserService } from '../user.service';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsPage = 0;
  newPost = new EventEmitter<Post>()

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
          this.newPost.emit( resp['post'] );
        })

    })

  }

  restartPostPage() {
    this.postsPage = 0;
  }
}
