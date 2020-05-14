import { SellAndBuyStocksPage } from './../sell-and-buy-stocks/sell-and-buy-stocks';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PortfolioInvestmentDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portfolio-investment-details',
  templateUrl: 'portfolio-investment-details.html',
})
export class PortfolioInvestmentDetailsPage {

  
    order: any;
    portfolioDesc: string;
    constructor(private navCtrl: NavController, private navParams: NavParams){

        this.order = this.navParams.data;
        this.order.actions = 'sell'; 

    }

    sell(){
        this.navCtrl.push(SellAndBuyStocksPage,this.order);
    }

}
