import { PortfoliosPage } from './../portfolios/portfolios';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular'; 
import { OpenExecutedOrdersPage } from '../open-executed-orders/open-executed-orders';
import { SellAndBuyStocksPage } from '../sell-and-buy-stocks/sell-and-buy-stocks';

/**
 * Generated class for the MyStocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-stocks',
  templateUrl: 'my-stocks.html', 
})
export class MyStocksPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {}

  openPortfolios(){
    this.navCtrl.push(PortfoliosPage,{action:'portfolio'});
  }
  openOrders(){
    this.navCtrl.push(OpenExecutedOrdersPage);
  }

  buyStocks(){
    this.navCtrl.push(SellAndBuyStocksPage, {action:'buy'});
  }
  sellStocks(){
    this.navCtrl.push(SellAndBuyStocksPage, {action:'sell'});
  }

}
