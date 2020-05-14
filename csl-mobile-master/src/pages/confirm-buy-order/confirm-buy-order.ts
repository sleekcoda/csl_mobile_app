import { ConfirmationPage } from './../confirmation/confirmation';
import { DateFormatPipe } from './../cash-statement/date-format-pipe';
import { DatePicker } from '@ionic-native/date-picker';
import { LoginPage } from './../login/login';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ConfirmBuyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-buy-order',
  templateUrl: 'confirm-buy-order.html',
  providers:[DateFormatPipe,DatePicker]
})

export class ConfirmBuyOrderPage {

  order: any;
  portfolioDesc: string;
  actions: string;
  constructor(private _datePipe: DateFormatPipe ,public navCtrl: NavController, public navParams: NavParams,private _spin: LoadingController,private _alert: NoticeHandlerProvider,private _http: DashboardProvider) {
    this.order = this.navParams.data;
    this.actions = this.navParams.get('actions')
  }

  ionViewDidLoad() {
    this.portfolioDesc = this.navParams.get('portfolioDesc');
  }
  ngOnInit() {
    this.portfolioDesc = this.navParams.get('portfolioDesc');
  }
  buyStock(){

    var body: any={};
    
    body.order = [{
      cscsno: this.navParams.get('cscsno'),
      expires: this._datePipe.transform(this.navParams.get('expires'),'d-MMM-y'),
      ordertype: this.navParams.get('ordertype'),
      price: this.navParams.get('price'),
      pricetype: this.navParams.get('pricetype'),
      quantity: this.navParams.get('quantity'),
      reference: this.navParams.get('reference'),
      symbol: this.navParams.get('symbol')
    }];

    let spin = this._spin.create({spinner:'',content:'Placing order...'});
    spin.present();    this._http.buyStock(body).then(
      response => {
        if(response.status == 'success' && response.data[0].status == '000'){
         this.navCtrl.push(ConfirmationPage,{reference:this.navParams.get('reference'),action:'buy_stock'});
        }else{
          this._alert.notifyError(JSON.stringify(response.data[0].remarks)+'<br>'+JSON.stringify(response.data[0].reference)+'<br><br>Try again later.');
        }
        console.log(response);
        spin.dismiss();
      },
      error =>{
        if(error.status == 401){
          this.navCtrl.setRoot(LoginPage);
          this._alert.notifyError('Invalid session<br><br>You must login again.');
        }
        else if(error.status == 500){
          this._alert.notifyError('Server error.<br><br>Unable to place order at the moment please check back later.');
        }else{
          this._alert.notifyError(JSON.stringify(error.error));
        }
        console.log(error);
        spin.dismiss();
      }
    ).catch(reason => {console.log(reason);spin.dismiss();});
  }
  sellStock(){
    var body: any={};
    
    body.order = [{
      cscsno: this.navParams.get('cscsno'),
      expires: this._datePipe.transform(this.navParams.get('expires'),'d-MMM-y'),
      ordertype: this.navParams.get('ordertype'),
      price: this.navParams.get('price'),
      pricetype: this.navParams.get('pricetype'),
      quantity: this.navParams.get('quantity'),
      reference: this.navParams.get('reference'),
      symbol: this.navParams.get('symbol')
    }];

    let spin = this._spin.create({spinner:'',content:'Placing order...'});
    spin.present();    this._http.sellStock(body).then(
      response => {
        if(response.status == 'success' && response.data[0].status == '000'){
         this.navCtrl.push(ConfirmationPage,{reference:this.navParams.get('reference'),action:'buy_stock'});
        }else{
          this._alert.notifyError(JSON.stringify(response.data[0].remarks)+'<br>'+JSON.stringify(response.data[0].reference)+'<br><br>Try again later.');
        }
        spin.dismiss();
      },
      error =>{
        if(error.status == 401){
          this.navCtrl.setRoot(LoginPage);
          this._alert.notifyError('Invalid session<br><br>You must login again.');
        }
        else if(error.status == 500){
          this._alert.notifyError('Server error.<br><br>Unable to place order at the moment please check back later.');
        }else{
          this._alert.notifyError(JSON.stringify(error.error));
        }
        spin.dismiss();
      }
    ).catch(reason => {console.log(reason);spin.dismiss();});
  }

}
