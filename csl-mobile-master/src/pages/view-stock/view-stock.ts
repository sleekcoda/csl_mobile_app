import { SellAndBuyStocksPage } from './../sell-and-buy-stocks/sell-and-buy-stocks';
import { AddWatchlistPage } from './../add-watchlist/add-watchlist';
import { LoginPage } from './../login/login';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-stock',
  templateUrl: 'view-stock.html',
})
export class ViewStockPage {
  symbol: string;
  stockName: string;
  bids: any | null;
  offers: any | null;
  offersError: string;
  bidsError: string;

  stockData: any={};
  constructor(public navCtrl: NavController, public navParams: NavParams, private _http: DashboardProvider, private _notice: NoticeHandlerProvider) {
    
    this.symbol = this.navParams.get('symbol');
    this.stockName = this.navParams.get('stockName');
    
    this.getStockDetails();
    this.getBids(this.symbol);
    this.getOffers(this.symbol);

  

  }
  
  ionViewDidLoad() {
    // var ctx = document.getElementById("stockChart");
    // var myChart = new Chart(ctx, {
    //     type: 'scatter',
    //     data: {
    //         labels: [],
    //         datasets: [{
    //             label: '# ',
    //             data: [],
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)',
    //                 'rgba(153, 102, 255, 0.2)',
    //                 'rgba(255, 159, 64, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255,99,132,1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)',
    //                 'rgba(255, 159, 64, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero:true
    //                 }
    //             }]
    //         }
    //     }
    // });
   }
  ngOnInit() {
    setTimeout(() => {
      this.getStockDetails();
    }, 5000);
  }
  getStockDetails(){
    this._http.plainGetRequest(`stockprices/${this.symbol}`).then(
      response => {
        if(response.status == 'success'){
          this.stockData = response.data;
        }else{

          this._notice.notifyError('Connection error:<br><br>NSE server is currently unavailable.');
          
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
    ).catch(reason => {this._notice.notifyError(JSON.stringify(reason.error))});
  }

  getBids(symbol: string){
    this._http.plainGetRequest(`stockprices/${symbol}/topbids`).then(
      response => {
        if(response.status == 'success'){
          this.bids = response.data;
        }else{
          this._notice.notifyError('Unable to connect with server <br>'+ JSON.stringify(response.message));
        }
      },
      error => {
        if(error.status == 500){
          this.bidsError = 'No bids available for ';
        }
        else if(error.status == 401){
          this._notice.notifyError(JSON.stringify(error.error)+'<br><br>You must login first');
          this.navCtrl.setRoot(LoginPage);
        }else{
          this._notice.notifyError(JSON.stringify(error.error)+'<br><br>NSE server is currently unavaible.');
        }
    }).catch(reason => {this._notice.notifyError(JSON.stringify(reason.error))});
  }
  getOffers(symbol: string){
    this._http.plainGetRequest(`stockprices/${symbol}/topoffers`).then(
      response => {
        if(response.status == 'success'){
          this.offers = response.data;
          this.offers = this.offers.sort((a,b) => (a.OFFER_PRICE < b.OFFER_PRICE) ? 1 : ((b.OFFER_PRICE < a.OFFER_PRICE) ? -1 : 0));

        }else{
          this._notice.notifyError('Unable to connect with server <br>'+ JSON.stringify(response.message));
        }
      },
      error => {
        if(error.status == 500){
          this.offersError = 'No offers available for ';
        }
        else if(error.status == 401){
          this._notice.notifyError(JSON.stringify(error.error)+'<br><br>You must login first');
          this.navCtrl.setRoot(LoginPage);
        }else{
          this._notice.notifyError(JSON.stringify(error.error)+'<br><br>NSE server is currently unavaible.');
        }
      }
    ).catch(reason => {this._notice.notifyError(JSON.stringify(reason.error))});
  }
  addToWatchlist(){
    this.navCtrl.push(AddWatchlistPage,{symbol:this.symbol});
  }
  buyStock(){
    this.navCtrl.push(SellAndBuyStocksPage,{action:'buy',symbol:this.symbol})
  }
}
