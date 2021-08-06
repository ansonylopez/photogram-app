import { Component } from '@angular/core';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages: string[] = [];
  post = {
    message: '',
    coords: null,
    position: false
  }

  constructor(
    private postService: PostsService
  ) {}

  createPost() {
    console.log(this.post);
    this.postService.createPost(this.post);
  }

}
