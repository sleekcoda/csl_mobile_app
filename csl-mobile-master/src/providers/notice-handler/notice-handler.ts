import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the NoticeHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NoticeHandlerProvider {

  constructor(private alertCtrl: AlertController) {  }
  notifyError(message){
    // const error = message.message || message.statusText;
    this.alertCtrl.create({ title: 'Error', subTitle: message ,buttons: ['OK'] }).present();
  }

  notifyMessage(message){
    this.alertCtrl.create({ title: 'Info', subTitle: message ,buttons: ['OK'] }).present();
  }

  notifyWarning(message){
    this.alertCtrl.create({ title: 'Warning', subTitle: message ,buttons: ['OK'] }).present();
  }
}
