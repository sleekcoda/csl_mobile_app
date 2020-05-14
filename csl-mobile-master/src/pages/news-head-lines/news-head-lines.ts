import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { LoginPage } from './../login/login';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the NewsHeadLinesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-head-lines',
  templateUrl: 'news-head-lines.html',
})
export class NewsHeadLinesPage {

  news: any | null;
  trans: any | null;
  constructor(public navCtrl: NavController, private _dashboard: DashboardProvider, private _alert: NoticeHandlerProvider, private iab: InAppBrowser) {
    this.newsUpdate();
  }

  ionViewDidLoad() {
  }

  newsUpdate(){
    this._dashboard.plainGetRequest('NewsHeadlines').then(
      response => {
        if(response.status == 'success' && response.data != null) {
          this.news = response.data;        
        } else{
          this._alert.notifyError('Unable to get news update. Check back later.');
        }
      },
      error => {
       if(error.status == 500){
        this._alert.notifyError('Unable to get news update. Check back later.');
       }else if(error.status == 401){
         this.navCtrl.setRoot(LoginPage);
       }
        
      }
    ).catch(reason => {console.log(reason)});
  }

  openLink(url: string){
    const browser = this.iab.create(url);

    browser.show();

  }
  
}
