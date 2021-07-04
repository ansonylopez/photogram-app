import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts/posts.service';
import { Post } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];
  disabled: boolean = false;

  constructor(private postService:PostsService) {}

  ngOnInit() {
      this.nextPosts();
  }

  reload(event) {
    this.disabled = false;
    this.posts = [];
    this.postService.restartPostPage();
    this.nextPosts(event);

  }

  nextPosts(event?) {

    this.postService.getPosts().subscribe( resp => {
      console.log(resp);

      this.posts.push( ...resp.posts );

      if (event) {
        event.target.complete();
      }

      if (!resp.posts.length) {
        this.disabled = true;
      }
    });

  }

}
