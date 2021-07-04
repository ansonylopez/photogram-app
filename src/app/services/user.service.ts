import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string = null;

  constructor(
    private http: HttpClient,
    private storage: Storage
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

    async saveToken( token: string) {

      this.token = token;
      await this.storage.set('token', token);
    }
}
