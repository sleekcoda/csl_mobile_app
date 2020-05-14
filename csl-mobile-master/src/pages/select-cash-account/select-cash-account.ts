import { WithdrawCashPage } from './../withdraw-cash/withdraw-cash';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnterCardDetailsPage } from './../enter-card-details/enter-card-details';

/**
 * Generated class for the SelectCashAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-cash-account',
  templateUrl: 'select-cash-account.html',
})
export class SelectCashAccountPage {

  portfolios = new Array();
  actions: string | null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _storage: Storage) {
    this._storage.get('portfolio').then(
      portfolio => {
        let portfolios = Object["values"](portfolio);
        portfolios.forEach(portfolioarr => {
          portfolioarr.map((e) =>{
            this.portfolios.push(e);
          }); // #map function
        }); // #foreach
  });// #get portfolios from memory
  }

  
  
  openCardPage(accountNumber: string ) {
    if(this.actions == 'withdraw_cash'){
      this.navCtrl.push(WithdrawCashPage,{accountNumber:accountNumber});
    }
    else {
      this.navCtrl.push(EnterCardDetailsPage, {accountNumber: accountNumber,actions:'withdraw'} );
    }
  }
}
