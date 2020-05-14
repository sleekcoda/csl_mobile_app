import { OptValidationPage } from './../opt-validation/opt-validation';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { RequestResponse, RequestResponseError } from './../../providers/authentication/auth.model';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the RequestLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-login',
  templateUrl: 'request-login.html',
  providers:[DashboardProvider]
})
export class RequestLoginPage {

  cscsNumber: string;
  requestError: RequestResponseError;
  requestResponse: RequestResponse;
  nextAction: string;
  requestPath: string;
  action: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public _http: DashboardProvider, private _loading: LoadingController, private notifier: NoticeHandlerProvider) {
    this.action = this.navParams.get('action');
  }

  ionViewDidLoad() {
    
  }
  onRequestlogin(): void {

    if(this.action == "set_password"){
      this.doRequestLogin()
    }
    else if(this.action == "reset_password"){
      this.doResetPassword()
    }
    
    
  }
  validateCustomerByOtp(){
    
  }

  doRequestLogin(){
        
    ///api/users/reset/request
        this._http.requestCustomerLogin(this.cscsNumber).then(
          (response) => {

            this.requestResponse = response as RequestResponse;
            if(this.requestResponse.status == 'Failed'){
              this.notifier.notifyError(this.requestResponse.message);
            }
            else if(this.requestResponse.status == 'success'){
              this.notifier.notifyMessage(JSON.stringify(this.requestResponse.data));
              this.navCtrl.push(OptValidationPage,
              {
                email:this.requestResponse.data.email,
                phone: this.requestResponse.data.phone,
                accountId: this.cscsNumber,
                tokenId: this.requestResponse.data.tokenId,
                action: this.action,
                message: this.requestResponse.message,
              });
            } 
            
          },
          (error) => {
            this.requestError = error as RequestResponseError;
            this.notifier.notifyError(this.requestError.error);
          }
        ).catch(
          (reason) => {
            this.notifier.notifyError(JSON.stringify(reason.error));
          }
        );
      
      
  }
  doResetPassword(){
    let loading = this._loading.create({content:"",spinner:""});
    loading.present();
    ///api/users/reset/request

      this._http.makePostRequest(`users/reset/request`,{
        emailOrCustomerNumber : this.cscsNumber
      }).then(
        (response) => {

          loading.dismiss();
          this.requestResponse = response as RequestResponse;
          if(this.requestResponse.status == 'Failed'){
            this.notifier.notifyError(this.requestResponse.message);
          }
          else if(this.requestResponse.status == 'success'){
             this.navCtrl.push(OptValidationPage,
            {
              message: this.requestResponse.message,
              accountId: this.cscsNumber,
              tokenId: this.requestResponse.data.tokenId,
              action: this.action
            });
            // console.log(this.requestResponse)
          } 
          
        },
        (error) => {
          loading.dismiss();
          this.requestError = error as RequestResponseError;
          this.notifier.notifyError(this.requestError.error);
        }
      );
  }
}
