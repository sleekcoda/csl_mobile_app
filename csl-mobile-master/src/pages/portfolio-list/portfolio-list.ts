import { MyPortfolioPage } from './../my-portfolio/my-portfolio';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PortfolioListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-portfolio-list',
  templateUrl: 'portfolio-list.html',
})
export class PortfolioListPage {
  portfolioList: any | null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.portfolioList = this.navParams.data;
  }

  ionViewDidLoad() {}
  viewPortfolio(porfolioObject){
    this.navCtrl.push(MyPortfolioPage,porfolioObject);
  }

}
