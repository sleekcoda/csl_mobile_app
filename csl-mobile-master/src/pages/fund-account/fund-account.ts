import { SelectCashAccountPage } from './../select-cash-account/select-cash-account';
import { PayAtBankPage } from './../pay-at-bank/pay-at-bank';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the FundAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fund-account',
  templateUrl: 'fund-account.html',
})
export class FundAccountPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() { }
  payWithBank(){
    this.navCtrl.push(PayAtBankPage);
  }

  payWithCard(){
    this.navCtrl.push(SelectCashAccountPage);
  }
}
