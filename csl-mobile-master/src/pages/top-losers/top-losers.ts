import { LoginPage } from './../login/login';
import { ViewStockPage } from './../view-stock/view-stock';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NoticeHandlerProvider } from '../../providers/notice-handler/notice-handler';

/**
 * Generated class for the TopLosersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-losers',
  templateUrl: 'top-losers.html',
})
export class TopLosersPage {

  topLossers: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: DashboardProvider,private _notice: NoticeHandlerProvider) {
    this.getStocks();
  }

  ionViewDidLoad() {  }
  ngOnInit() {
    setTimeout(() => {
      this.getStocks();
    }, 5000);
  }
  getStocks(){
    this._http.plainGetRequest('stockprices/toplossers').then(
      response => {
        if(response.status == 'success'){
          let resp = response.data;
          this.topLossers = resp.sort((a,b) => (a.currentPrice < b.currentPrice) ? 1 : ((b.currentPrice < a.currentPrice) ? -1 : 0));
        }else{
          this._notice.notifyError('Connection error: <br>NSE server is currently unavaible.');
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
    ).catch(reason => {console.log(reason);});
  }
  viewStock(symbol: any){
    this.navCtrl.push(ViewStockPage,symbol);
  }
}
