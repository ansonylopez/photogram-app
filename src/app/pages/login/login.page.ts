import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/interfaces';
import { UiService } from 'src/app/services/Ui/ui.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mainSlide', { static: true }) mainSlides: IonSlides;

  avatars = [
    {
      img: 'av-1.png',
      selected: true
    },
    {
      img: 'av-2.png',
      selected: false
    },
    {
      img: 'av-3.png',
      selected: false
    },
    {
      img: 'av-4.png',
      selected: false
    },
    {
      img: 'av-5.png',
      selected: false
    },
    {
      img: 'av-6.png',
      selected: false
    },
    {
      img: 'av-7.png',
      selected: false
    },
    {
      img: 'av-8.png',
      selected: false
    },
];

  avatarSlide = {
    slidesPerView: 3.5,
  };

  loginUser = {
    email: 'test4@test.com',
    password: '1234'
  };

  registerUser: User = {
    email: 'test',
    password: '1234',
    name: 'Test',
    avatar: 'av-1.png'
  }

  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private uiService: UiService
  ) { }

  ngOnInit() {

    this.mainSlides.lockSwipes(true);
  }

  async login(loginForm: NgForm) {

    if (loginForm.invalid) { return }

    const loginSuccess = await this.userService.login(this.loginUser.email, this.loginUser.password);

    if (loginSuccess) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true});
      return;
    }

    this.uiService.presentAlert('Usuario o contraseña son incorrectos')
    // alerta
  }

  async register(registerForm: NgForm) {

    if (registerForm.invalid) {
      return;
    }

    const valid = await this.userService.register( this.registerUser )

    if (valid) {
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
      return;
    }

    this.uiService.presentAlert('El correo electronico ya existe.')
  }

  selectAvatar( avatar ) {

      this.avatars.forEach( avatar => avatar.selected = false);

      avatar.selected = true;

  }

  showRegister() {
    this.mainSlides.lockSwipes(false);
    this.mainSlides.slideTo(0);
    this.mainSlides.lockSwipes(true);

  }

  showLogin() {
    this.mainSlides.lockSwipes(false);
    this.mainSlides.slideTo(1);
    this.mainSlides.lockSwipes(true);

  }

}
