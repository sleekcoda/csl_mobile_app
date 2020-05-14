import { LoginPage } from './../login/login';
import { ConfirmationPage } from './../confirmation/confirmation';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { NoticeHandlerProvider } from '../../providers/notice-handler/notice-handler';

/**
 * Generated class for the WatchlistDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-watchlist-details',
  templateUrl: 'watchlist-details.html',
})
export class WatchlistDetailsPage {
  
  currentPrice: any | null;
  addWatchlist: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private _http: DashboardProvider, private _spin:LoadingController, private _alert: NoticeHandlerProvider) {
    
    this.currentPrice = this.navParams.get('targetPrice');

    this.addWatchlist = {
      "expiry": this.navParams.get('expiry'),
      "targetPrice": this.navParams.get('targetPrice'),
      "margin": this.navParams.get('margin'),
      "symbol": this.navParams.get('symbol')
    }
  }

  ionViewDidLoad() {
  }

  confirmAdd(){
    let loading = this._spin.create({content:"Fetching your watchlists...",spinner:''});
    loading.present();
    this._http.addToWatchlist(this.addWatchlist).then(
      response => {
        if(response.status == 'success'){
          this.navCtrl.setRoot(ConfirmationPage,{action:'add_watchlist',symbol:this.addWatchlist.symbol})
          console.log(response.data);
        } else{
          this._alert.notifyError(response.message);
        }
        loading.dismiss();
      },
      error => {
        if(error.status == 400 || error.status == 500){
          this._alert.notifyError(JSON.stringify(error.error));
        } else if(error.status == 401){
          this._alert.notifyError('Session expired');
          this.navCtrl.push(LoginPage);
        }
        loading.dismiss();
      }
    ).catch(reason => {console.log(reason); this._alert.notifyError('Something went wrong');});
  }
}
