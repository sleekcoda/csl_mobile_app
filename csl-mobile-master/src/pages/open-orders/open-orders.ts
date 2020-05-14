import { LoginPage } from './../login/login';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SellAndBuyStocksPage } from '../sell-and-buy-stocks/sell-and-buy-stocks';

/**
 * Generated class for the OpenOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-open-orders',
  templateUrl: 'open-orders.html',
})
export class OpenOrdersPage {

  orderType: string;
  orderObj: any | null ;
  accountNumber: string;
  noOrders: boolean;

  customerId: string;
  portfolioDescription: string;
  productDescription: string;
  marketAccountId: string;
  cashAccountId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: DashboardProvider,private _alert: NoticeHandlerProvider, private loading: LoadingController) {
    this.orderType = this.navParams.get('action');
    this.accountNumber = this.navParams.get('marketAccountId');

    this.customerId = this.navParams.get('customerId');
    this.portfolioDescription = this.navParams.get('portfolioDescription');
    
    this.marketAccountId = this.navParams.get('marketAccountId');
    
    this.cashAccountId = this.navParams.get('cashAccountId');
  }

  ionViewDidLoad() {
    let spin = this.loading.create({content:'',spinner:''});
    spin.present();
    this._http.plainGetRequest(`orders/${this.accountNumber}/${this.orderType}`).then(
      response => {
        if(response.status == 'success' && response.data != null){
          this.orderObj = response.data;
          this.noOrders = false;
        }else{
          this.noOrders = true;
        }
        spin.dismiss();
      },
      error => {
        if(error.status == 401){
          this._alert.notifyError('Session expired!');
          this.navCtrl.push(LoginPage);
        } else if (error.status == 500){
          this._alert.notifyError('Server error try again later.');
        }else{
          this._alert.notifyError('Server error try again later.');
        }
        this.noOrders = true;
        spin.dismiss();
      }
    ).catch(e => {console.log(e);})
  }
  buyStocks(){
    this.navCtrl.push(SellAndBuyStocksPage, {action:'buy'});
  }
  sellStocks(){
    this.navCtrl.push(SellAndBuyStocksPage, {action:'sell'});
  }

}
