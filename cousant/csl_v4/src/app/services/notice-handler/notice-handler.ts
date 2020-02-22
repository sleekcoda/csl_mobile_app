import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

/*
  Generated class for the NoticeHandlerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({ providedIn: "root" })
export class NoticeHandlerProvider {
  constructor(private alertCtrl: AlertController) {}
  notifyError(message) {
    // const error = message.message || message.statusText;
    this.alertCtrl
      .create({ header: "Error", subHeader: message, buttons: ["OK"] })
      .then(alert => alert.present());
  }

  notifyMessage(message) {
    this.alertCtrl
      .create({ header: "Info", subHeader: message, buttons: ["OK"] })
      .then(alert => alert.present());
  }

  notifyWarning(message) {
    this.alertCtrl
      .create({ header: "Warning", subHeader: message, buttons: ["OK"] })
      .then(alert => alert.present());
  }
}
