import { MyWatchlistPage } from './../my-watchlist/my-watchlist';
import { LoginPage } from './../login/login';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController} from 'ionic-angular';

/**
 * Generated class for the ViewWatchlistDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-watchlist-details',
  templateUrl: 'view-watchlist-details.html',
})
export class ViewWatchlistDetailsPage {

  
  watchlist: any;
  currentPrice: any;
  constructor( private confirm: AlertController,public navCtrl: NavController,private _alert:NoticeHandlerProvider, public navParams: NavParams, private _view: ViewController,private _spin: LoadingController, private _http: DashboardProvider) {
    this.watchlist = this.navParams.data;
    this.currentPrice = 'unavailable';
  }

  ionViewDidLoad() {
    this.watchlist = this.navParams.data;
  }
  ngOnInit() {
    this.getCurrentPrice();
  }

  delete() {
    let confirmation = this.confirm.create({
      title:'',
      message:'Are you sure you want to remove '+ this.watchlist.symbol +' from your watchlist?' ,
      buttons:[
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            confirmation.dismiss();
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let spin = this._spin.create({content:'Deleting please wait...',spinner:''});
            this._http.plainGetRequest(`watchlist/${this.watchlist.symbol}/delete`).then(
              response =>{
                if(response.status == 'success'){
                  this._alert.notifyMessage(this.watchlist.symbol + ' has been deleted from your watchlist.');
                  this.navCtrl.setRoot(MyWatchlistPage);
                  spin.dismiss();
                  
                }else{
                  this._alert.notifyError(JSON.stringify(response.message));
                  spin.dismiss();
                }
                
              },
              error => {
                if(error.status == 400 || error.status == 500){
                  this._alert.notifyError(JSON.stringify(error.error) + '<br> Unable to get the current price for '+this.watchlist.symbol);
                } else if(error.status == 401){
                  this._alert.notifyError('Session expired');
                }
                spin.dismiss();
                
              }
            ).catch(reason => {this._alert.notifyError(reason.error); });
          }
        }
      ]
    });
    confirmation.present();
  }
  getCurrentPrice(){
    this._http.plainGetRequest(`stockprices/${this.watchlist.symbol}`).then(
      response => {
        if(response.status == 'success'){
          this.currentPrice = response.data.currentPrice
        }else{
          this._alert.notifyError(JSON.stringify(response.message));
        }
      },
      error => {
        if(error.status == 400 || error.status == 500){
          this._alert.notifyError(JSON.stringify(error.error) + '<br> Unable to get the current price for '+this.watchlist.symbol);
        } else if(error.status == 401){
          this._alert.notifyError('Session expired');
          this.navCtrl.push(LoginPage);
        }
      }
    ).catch(reason => {console.log(reason);});
  }
  close(){
    this._view.dismiss();
  }

  

}
