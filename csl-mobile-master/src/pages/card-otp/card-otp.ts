import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as Ravepay from 'ravepay';
import { ConfirmationPage } from '../confirmation/confirmation';

/**
 * Generated class for the CardOtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-otp',
  templateUrl: 'card-otp.html',
})
export class CardOtpPage {
  OTPCode:string;
  private createFundResponse;
  constructor(public navCtrl: NavController, public navParams: NavParams, public _alert: NoticeHandlerProvider,private _http: DashboardProvider,private _spin: LoadingController) {
     
  }

  ionViewDidLoad() { this.createFund(); }
  ngOnInit() {
    
  }
  get OTPMessage(){
    return  `${this.navParams.get('otpMessage')}`;
  }
  get rave(){
    return new Ravepay('FLWPUBK-8247b8fd71a635eca705bfa7247b0f05-X', 'FLWSECK-4fea61350032b5097f1bcecb8c4567ea-X', false);
  }
  get grossAmount(){
    return this.navParams.get('amount') +  this.navParams.get('appfee');

  }
  get appFee(){
    return this.navParams.get('appfee');
  }
  get amount(){
    return this.navParams.get('amount');
  }
  get accountNumber(){
    return this.navParams.get('accountNumber');
  }
 
  createFund(){

    let loading = this._spin.create({spinner:'',content:''});
    loading.present();
    let reqBody = {
      "accountNumber": this.navParams.get('accountNumber'),
      "grossAmount": this.grossAmount,
      "fee": this.navParams.get('appfee'),
      "transactionReference": this.navParams.get('ref')
    }
     this._http.makePostRequest('fundingRequest/create',reqBody).then(
      resp =>{
        if(resp.status == 'success'){
          this.createFundResponse = resp.data;
          
        }else{
          this._alert.notifyError(JSON.stringify(resp.message))
        } loading.dismiss();
      },
      err => {this._alert.notifyError(JSON.stringify(err.statusText)); loading.dismiss();}
    ).catch();
  }
  get requestId(){
    return this.createFundResponse.requestId;
  }
  confirmFund(requestId, gateResponse, debitStatus: boolean){

  let loading = this._spin.create({spinner:'',content:''});
  loading.present();
    let payload = {
      requestId: requestId,
      debitStatus: debitStatus,
      paymentGatewayResponseMsg: gateResponse
    };
     this._http.makePostRequest(`fundingRequest/${requestId}`, payload).then(
      resp =>{
        if(resp.status == 'success'){
          (debitStatus === true ) ? this.navCtrl.setRoot(ConfirmationPage,{action:'fund',reference:this.navParams.get('ref')}) : null;
          
        }else{
          this._alert.notifyError(JSON.stringify(resp.message));
        }
      },
      err =>{ this._alert.notifyError(JSON.stringify(err.error));loading.dismiss();}
    ).catch( err =>{ this._alert.notifyError(JSON.stringify(err.error)); loading.dismiss();}); 
    loading.dismiss();
  }
  confirmOTP(){

    let payload = {
      PBFPubKey: this.navParams.get('pk'),
      transaction_reference: this.navParams.get('ref'),
      otp: this.OTPCode
    }
    if(this.OTPCode){
      console.log(payload);
        this.rave.Card.validate(payload).then(response => {
      if(response.body.status == 'success'){
        this.confirmFund(this.requestId,response.body.message,true);
      } else { 
          this._alert.notifyError(JSON.stringify(response.body.message))
        this.confirmFund(this.requestId,response.body.message,false); 
        }
      },
      err => {
        this._alert.notifyError(err.statusText);
        console.log(err);
      }
      ).catch(err => { this.confirmFund(this.requestId,err.statusText,false); this._alert.notifyError(  JSON.stringify(err.message) );});

    }
    

  }

}
