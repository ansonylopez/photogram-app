import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;
  private user: User = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController
    ) { }

    login(email: string, password: string) {

      const payload = { email, password };

      return new Promise( resolve => {

        this.http.post(`${ URL }/user/login`, payload).subscribe( response =>  {

            if (response['ok']) {
              this.saveToken(response['token']);
              resolve(true);
              return;
            }

            this.token = null;
            this.storage.clear();
            console.log(response);
            resolve(false);
            return;
          })

      });

    }

    register( user: User) {

      return new Promise( resolve => {

        this.http.post(`${ URL }/user/create`, user)
            .subscribe( resp => {

              if (resp['ok']) {
                this.saveToken(resp['token']);
                resolve(true);
                return;
              }

              this.token = null;
              this.storage.clear();
              console.log(resp);
              resolve(false);
              return;

            })

      })
    }

    getUser() {

      if (!this.user._id) {
        this.validateToken();
      }

      return {...this.user};
    }

    async saveToken( token: string) {

      this.token = token;
      await this.storage.set('token', token);
    }

    async loadToken() {

      this.token = await this.storage.get('token') || null;

    }

    async validateToken(): Promise<boolean> {

      await this.loadToken();

      if (!this.token) {
        this.navCtrl.navigateRoot('/login');
        return Promise.resolve(false);
      }

      return new Promise<boolean>( resolve => {

        const headers = new HttpHeaders({
          'x-token': this.token
        });

        this.http.get(`${ URL }/user/`, { headers })
                .subscribe( resp => {

                  if (resp['ok']) {
                    this.user = resp['user'];
                    console.log('usuario raro', resp['user']);

                    resolve(true);
                    return;
                  }
                  this.navCtrl.navigateRoot('/login');
                  resolve(false);

                })

      });

    }

    updateUser(user: User) {

      const headers = new HttpHeaders({
        'x-token': this.token
      });

      return new Promise(resolve => {

        this.http.post(`${ URL }/user/update`, user, { headers })
          .subscribe( resp => {

            if (resp['ok']) {
              console.log(resp);

              this.saveToken(resp['userToken']);
              resolve(true);
              return;
            }

            resolve(false);
          })

      });


    }

}
