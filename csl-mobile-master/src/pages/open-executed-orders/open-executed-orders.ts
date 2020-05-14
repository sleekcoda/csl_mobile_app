import { PortfoliosPage } from './../portfolios/portfolios';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the OpenExecutedOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-open-executed-orders',
  templateUrl: 'open-executed-orders.html',
})
export class OpenExecutedOrdersPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
  }
  openOrders(){
    this.navCtrl.push(PortfoliosPage,{action:'open'});
  }
  executedOrders(){
      this.navCtrl.push(PortfoliosPage,{action:'executed'});
  }
}
