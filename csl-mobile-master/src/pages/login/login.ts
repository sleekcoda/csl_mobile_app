import { DashboardPage } from './../dashboard/dashboard';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { Storage } from '@ionic/storage';
import { RequestLoginPage } from './../request-login/request-login';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, MenuController, Events } from 'ionic-angular';
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { RequestResponse } from '../../providers/authentication/auth.model';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  emailOrCscs: string;
  password: string;
  errorText: string;
  
  constructor(public _events: Events, public menu: MenuController,private _cache: Storage, public _navCtrl: NavController, private _alert: NoticeHandlerProvider, private _http: DashboardProvider, private _spinner: LoadingController ) {
    this.menu.swipeEnable(false);

  }
 
  ionViewDidLoad() {
    this._cache.get('login_username').then(
      value => {
        if(value != null){
          this.emailOrCscs = value;
        }
      } 
    )
  }
  ionViewWillLeave() {

    this.menu.swipeEnable(true);
    this._events.unsubscribe('app:userAuthenticateError');

    // If you have more than one side menu, use the id like below
   }

  authenticate(){
    let spinner = this._spinner.create({spinner:'',content:'Verifying credentials'});
    spinner.present();
    this._http.makePostRequest('Auth/Token',{ emailOrCscs: this.emailOrCscs, password : this.password})
    .then((response)  =>  {

        let resquestResponse:any = response as RequestResponse;
          /**
           * Store tokenId and customerId as csl_login in cache
           *  
           * Then navigate to the dashboard page
           */
          spinner.dismiss();
          this._events.publish('app:userAuthenticateToken',this.emailOrCscs,resquestResponse.token);
          
          this._cache.set('login_username',this.emailOrCscs);
          this._navCtrl.setRoot(DashboardPage,{login: true ,emailOrCscs:this.emailOrCscs});
      }, (error)  =>  {
        spinner.dismiss();
        this._events.publish('app:userAuthenticateError',"Invalid customer Id or password") ;
      }
    ).catch(
      (reason) => {
        spinner.dismiss();
        this._alert.notifyError(JSON.stringify(reason.error))
    });
    this._events.subscribe('app:userAuthenticateError',(errorMessage)=>{this.errorText = errorMessage});

  }
  
  pushRequestLogin(param){
    this._navCtrl.push(RequestLoginPage,{
      action: param
    });
  }

  ngOnDestroy() {
    
  }

}
