import { ViewWatchlistDetailsPage } from './../view-watchlist-details/view-watchlist-details';
import { LoginPage } from './../login/login';
import { AddWatchlistPage } from './../add-watchlist/add-watchlist';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, Events } from 'ionic-angular';

/**
 * Generated class for the MyWatchlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-watchlist',
  templateUrl: 'my-watchlist.html',
})
export class MyWatchlistPage {

  public watchlists:any | null;

  constructor(public _event: Events,public navCtrl: NavController, private _http: DashboardProvider, private _alert: NoticeHandlerProvider, private _spin: LoadingController) {
    let loading = this._spin.create({content:"Fetching your watchlists...",spinner:''});
    loading.present();
    this._http.getWatchLists().then(
      response => {
        if(response.status == 'success'){
          this.watchlists = response.data;
        } else{
          this._alert.notifyError(response.message);
        }
        loading.dismiss();
      },
      error => {
        if(error.status == 401){
          this.navCtrl.setRoot(LoginPage);
          this._alert.notifyError('Invalid session<br> You must login again.');
        }
        if(error.status == 500){
          this._alert.notifyError('Server error. <br>Unable to get price at the moment.');
        }
        loading.dismiss();
      }
    ).catch(reason => { this._alert.notifyError('Something went wrong.'); loading.dismiss();});
  }

  ionViewDidLoad() { }
 

  viewWatchlistItem(watchlistId: string,index: number){

    this.navCtrl.push(ViewWatchlistDetailsPage,{... this.watchlists[index],watchlistIndex: index});
  
  }

  addWatchlist(){
    this.navCtrl.push(AddWatchlistPage);
  }
  ngOnDestroy() {
    this._event.unsubscribe('watchlist:delete');
  }

}
