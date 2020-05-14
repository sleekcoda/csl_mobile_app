import { SetPasswordPage } from './../set-password/set-password';
import { RequestResponse, RequestResponseError } from './../../providers/authentication/auth.model';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DashboardProvider } from '../../providers/dashboard/dashboard';

/**
 * Generated class for the OptValidationPage page.
 * 
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opt-validation',
  templateUrl: 'opt-validation.html',
})
export class OptValidationPage {

  otpCode: string;
  tokenId: string;
  otpMessage: string;
  accountId: string;
  action: string | undefined;
  loading: any;
  requestError: RequestResponseError; 
  requestResponse: RequestResponse;

  constructor(public navCtrl: NavController, public navParams: NavParams, private notifier: NoticeHandlerProvider, private _http: DashboardProvider, private _loading: LoadingController ) {
    this.loading = this._loading.create({content:"Validating OTP...",spinner:""});
    this.accountId = this.navParams.get('accountId');
    this.action = this.navParams.get('action');
    this.tokenId = this.navParams.get('tokenId');
    this.otpMessage =  this.navParams.get('message');  //? `Please enter the code sent to ${this.navParams.get('phone')} and ${this.navParams.get('email')}` : this.navParams.get('message') ;

  }

  ionViewDidLoad() {}
  confirmOtp(){
    
    this.loading.present();
    let resetPayload = {
              otpCode: `${this.otpCode}`,
              emailOrCustomerId: `${this.accountId}`,
              otpId: this.tokenId
            }
    let requestPayload = {
        accountId: this.accountId,
        token: this.otpCode,
        tokenId: this.tokenId,
      }
     let path = (this.action == 'reset_password') ? `users/reset/request/validate` : `customer/${this.accountId}/loginRequest/validateOtp`;
     let payload = (this.action == 'reset_password') ? resetPayload : requestPayload;
    this._http.makePostRequest(
      path, payload ).then(
      (response) => {
        this.loading.dismiss();
        this.requestResponse = response as RequestResponse;
        
        if(this.requestResponse.status == 'success'){
          if(this.action == 'reset_password')
          {
            this.navCtrl.push(SetPasswordPage,{
              resetToken:   this.requestResponse.data.resetToken,
              emailOrCustomerId: this.accountId,
              action: this.action
          });
          } else if(this.action == 'set_password')
          {
              this.navCtrl.push(SetPasswordPage,{
                userId: this.requestResponse.data.userId,
                resetToken:   this.requestResponse.data.token,
                action: this.action
            });
          }
            
        } else if(this.requestResponse.status == 'Failed'){
            this.notifier.notifyError(JSON.stringify(this.requestResponse.message));
        }
       
      },
      (error) => {
        this.loading.dismiss();
        this.requestError = error as RequestResponseError;
        this.notifier.notifyError(JSON.stringify(this.requestError.error));
      }
    ).catch(
      (reason) => {
        this.notifier.notifyError(JSON.stringify(reason.error));
      }
    );
  }
  resendOtp(){}
  doSetPassword(){}
  doResetPassword(){}
}
