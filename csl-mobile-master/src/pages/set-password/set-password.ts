import { ConfirmationPage } from './../confirmation/confirmation';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { RequestResponse, RequestResponseError } from './../../providers/authentication/auth.model';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the SetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set-password',
  templateUrl: 'set-password.html',
})
export class SetPasswordPage {

  password: string;
  confirmPassword: string;
  userId: string;
  customerId: string;
  passwordError: string;
  resetToken: string;
  action: string;
  requestPath: string;
  requestResponse: RequestResponse;
  loadSpinner : any;
  requestError: RequestResponseError;

  constructor(public _navCtrl: NavController, public _navParams: NavParams,private _http: DashboardProvider, private _load: LoadingController,private _notifier: NoticeHandlerProvider) {
  }

  ionViewDidLoad() {
    this.userId = ( this._navParams.get('action') == 'reset_password' ) ? this._navParams.get('emailOrCustomerId')  : this._navParams.get('userId');
    this.resetToken = this._navParams.get('resetToken');
    this.action = this._navParams.get('action');
    let spinnerMessage = (this.action == 'reset_password') ? 'Resetting password...' : 'Setting password...';
    this.loadSpinner = this._load.create({content:spinnerMessage,spinner:''});

  }

  setPassword(){

    this.requestPath = this.action === "set_password" ? `users/${this.userId}/setPassword` : `users/account/reset`;
    
    if(this.password === this.confirmPassword && this.password !=="" ){

      this.loadSpinner.present();
      this.passwordError = "";
      
      this._http.makePostRequest(this.requestPath,{
        emailOrCustomerId: this.userId,
        resetToken: this.resetToken,
        newPassword: this.confirmPassword
      }).then(

        (response) => {
          this.loadSpinner.dismiss();
          this.requestResponse = response as RequestResponse;

           if(this.requestResponse.status === "success"){
             this._navCtrl.setRoot(ConfirmationPage,{action:this.action});
           }
           else if(this.requestResponse.status === "failed"){
             this._notifier.notifyError(JSON.stringify(this.requestResponse.message))
           }
        },
        (error) => {
          this.loadSpinner.dismiss();
          this.requestError = error as RequestResponseError;
          this.passwordError = (JSON.stringify(this.requestError.message));
        }
      ).catch(
        (reason) => {
          this._notifier.notifyError(JSON.stringify(this._notifier.notifyError(reason.error)))
        }
      );

    }
    else{
      this.passwordError = "Password combination is incorrect";
    }
  }

  passChange(){
    this.passwordError = "";
  }

}
