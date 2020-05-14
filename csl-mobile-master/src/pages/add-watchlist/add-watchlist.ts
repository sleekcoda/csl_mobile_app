import { LoginPage } from './../login/login';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { WatchlistDetailsPage } from './../confirm-watchlist-details/watchlist-details';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AddWatchlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-watchlist',
  templateUrl: 'add-watchlist.html',
})
export class AddWatchlistPage {
  
  availableStocks: any | null;
  currentPrice: string | null;
  today: any ;
  year: any;
  minYear:any;
  todayDate: any;
  expiryDate: any;
  dateValidated: boolean = false;
  preSelectedSymbol: string | null;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _http: DashboardProvider, private _spin:LoadingController, private _alert: NoticeHandlerProvider) {
    this.todayDate = new Date();
    this.getStock();
    this.preSelectedSymbol = this.navParams.get('symbol');
  }
@Input() addWatchlist:any = {
      "expiry": '',
      "targetPrice":'',
      "margin": '',
      "symbol": this.navParams.get('symbol'),
    };
    
  ionViewDidLoad() {
    this.todayDate = new Date();
  }

  addToWishlist(){
   
    this.addWatchlist.currentPrice = this.currentPrice;
    this.navCtrl.push(WatchlistDetailsPage,this.addWatchlist);
    
  }

  getStock(){
    let loading = this._spin.create({content:"Fetching available stocks'...",spinner:''});
    loading.present();

    this._http.plainGetRequest('stockprices').then(
      response => {
        if(response.status == 'success'){
          this.today = new Date();
          this.year = this.today.getFullYear() + 5;
          this.minYear = this.today.getFullYear();
          this.availableStocks = response.data;
        } else{
          this._alert.notifyError(response.message);
        }
        loading.dismiss();
      },
      error => {
        this._alert.notifyError('Stock prices are not available.<br><br>You may not be able to add stocks to your watchlist at the moment please check back later.');
        loading.dismiss();
      }
    ).catch(reason => {this._alert.notifyError(JSON.stringify(reason.error));});
  }

  changeSymbol(symbol: string){

    this._http.plainGetRequest(`stockprices/${symbol}`).then(
      response => {
        if(response.status == 'success'){
          this.currentPrice = response.data.currentPrice;
        } else{
          this._alert.notifyError(response.message);
        }
      },
      error => {
        if(error.status == 401){
          this.navCtrl.setRoot(LoginPage);
          this._alert.notifyError('Session expired<br><br>You must login again.');
        }
        if(error.status == 500){
          this._alert.notifyError('Server error.<br><br>Unable to get price at the moment.');
        }
      }
    ).catch(reason => {this._alert.notifyError(JSON.stringify(reason.error));});
  }
  validateDate(){
    setTimeout(()=>{
      let now = new Date().getTime();
      let dateDifference  = new Date(this.addWatchlist.expiry).getTime() - now;

      
      if(dateDifference < 0){
        this.dateValidated = false;
      }else{
        this.dateValidated = true;
      }
    },500)
    
  }
}