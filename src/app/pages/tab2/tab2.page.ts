import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
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
  };
  loadingGeo = false;

  constructor(
    private postService: PostsService,
    private route: Router,
    private geolocation: Geolocation
  ) {}

  async createPost() {
    
    const created = await this.postService.createPost(this.post);

    this.post = {
      message: '',
      coords: null,
      position: false
    };

    this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo() {

    if (!this.post.position) {
      this.post.coords = null;
      this.loadingGeo = false;
      return;
    }

    this.loadingGeo = true;

    this.geolocation.getCurrentPosition().then((resp) => {
      this.loadingGeo = false;

      const coords = `${ resp.coords.latitude},${ resp.coords.longitude}`
      
      this.post.coords = coords;
      
    }).catch((error) => {
      console.log('Error getting location', error);
      this.loadingGeo = false;
    });    
  }

}
