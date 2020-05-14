import { LoginPage } from './../login/login';
import { ViewStockPage } from './../view-stock/view-stock';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PriceListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-price-list',
  templateUrl: 'price-list.html',
})
export class PriceListPage {
  priceList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: DashboardProvider, private _notice: NoticeHandlerProvider) {
    
    this.getStocks();
    
  }
  getStocks(){
    this._http.plainGetRequest('stockprices').then(
      response => {
        if(response.status == 'success'){
         let resp = response.data;
         this.priceList = resp.sort((a,b) => (a.symbol > b.symbol) ? 1 : ((b.symbol > a.symbol) ? -1 : 0));
         
        }else{
          this._notice.notifyError('Unable to connect with server <br>'+ JSON.stringify(response.message));
        }
      },
      error => {
        if(error.status == 500){
          this._notice.notifyError('Server unavailable. Check back later ');
        }
        else if(error.status == 401){
          this._notice.notifyError(JSON.stringify(error.error)+'<br><br>You must login first');
          this.navCtrl.setRoot(LoginPage);
        }else{
          this._notice.notifyError(JSON.stringify(error.error)+'<br><br>NSE server is currently unavaible.');
        }
      }
      ).catch(reason => { this._notice.notifyError('Exception error');});
  }
  ionViewDidLoad() { }
  viewStock(symbol: any){
    this.navCtrl.push(ViewStockPage,symbol);
  }

}
