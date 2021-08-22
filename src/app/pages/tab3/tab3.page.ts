import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/interfaces';
import { UiService } from 'src/app/services/Ui/ui.service';
import { UserService } from 'src/app/services/user.service';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

  user: User = {};

  constructor(
    private userService: UserService,
    private uiService: UiService,
    private postService: PostsService
  ) {}

  ngOnInit() {
    this.setUser();
    console.log(this.user);
  }

  ionViewDidLeave() {
    this.setUser();
  }

  async update( fUpdate: HTMLFormElement ) {

    if (fUpdate.invalid) { return; }
    const updated = await this.userService.updateUser(this.user);

    if (updated) {
      this.uiService.presentToast('Usuario actualizado correctamente.');
      return;
    }

    this.uiService.presentToast('Ocurrio un problema actualizando el usuario.')
  }

  setUser() {
    this.user = this.userService.getUser();
  }

  logout() {
    this.postService.restartPostPage();
    this.userService.logout();

  }

}
