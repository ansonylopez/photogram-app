import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Post, PostsResponse } from '../../interfaces/interfaces';
import { UserService } from '../user.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsPage = 0;
  newPost = new EventEmitter<Post>()

  constructor(
    private http: HttpClient,
    private userService: UserService,
    private fileTransfer: FileTransfer
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
          resolve(true);
        })

    })

  }

  restartPostPage() {
    this.postsPage = 0;
  }

  uploadImage(imgPath: string) {

    const options: FileUploadOptions = {
      fileKey: 'image',
      headers: {
        'x-token': this.userService.token
      }
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();

    fileTransfer.upload(imgPath, `${ URL}/posts/upload`, options)
                .then( data => {
                  console.log('IMAGEN  a subir', data);
                }).catch( error => {
                  console.log('ERROR IMAGEN SUBIDA', error);
                })

  }
}
