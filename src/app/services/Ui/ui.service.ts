import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(
    private alertCtrl: AlertController
  ) { }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
        message,
        buttons: ['OK']
    });

    alert.present();
  }
}
