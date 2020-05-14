import { PriceListPage } from './../price-list/price-list';
import { TopLosersPage } from './../top-losers/top-losers';
import { TopGainersPage } from './../top-gainers/top-gainers';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the StockQuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-quotes',
  templateUrl: 'stock-quotes.html',
})
export class StockQuotesPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
  }

  openMarketList(){
    this.navCtrl.push(PriceListPage);
  }
  openTopGainers(){
    this.navCtrl.push(TopGainersPage);
  }
  openTopLosers(){
    this.navCtrl.push(TopLosersPage);
  }
}
