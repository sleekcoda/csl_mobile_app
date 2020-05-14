import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the PayAtBankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pay-at-bank',
  templateUrl: 'pay-at-bank.html',
})
export class PayAtBankPage {

  public portfolios: any | undefined | null;
  constructor(public navCtrl: NavController, private _storage: Storage, private _alert: NoticeHandlerProvider) {
    this._storage.get('portfolio').then(
      value => {
        this.portfolios = value;
      }
        
        ).catch(reason => { this._alert.notifyError(  JSON.stringify(reason.message) );} );
  }

  ionViewDidLoad() {}

}
