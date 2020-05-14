import { Storage } from '@ionic/storage';
import { NewsHeadLinesPage } from './../pages/news-head-lines/news-head-lines';
import { WithdrawCashPage } from './../pages/withdraw-cash/withdraw-cash';
import { MyWatchlistPage } from './../pages/my-watchlist/my-watchlist';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { StockQuotesPage } from './../pages/stock-quotes/stock-quotes';
import { MyCashAccountsPage } from './../pages/my-cash-accounts/my-cash-accounts';
import { MyStocksPage } from './../pages/my-stocks/my-stocks';
import { FundAccountPage } from './../pages/fund-account/fund-account';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DashboardProvider } from '../providers/dashboard/dashboard';
import { NoticeHandlerProvider } from '../providers/notice-handler/notice-handler';

@Component({
  templateUrl: 'app.html'
})
export class CSL {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any, url: string}>;
  portfolioDescription: string;
  enableSideMenu: boolean;
  today: any;
  token: string;
  emailOrCscs: string;
  password: string;
  constructor(public platform: Platform,public _http: DashboardProvider, public _alert: NoticeHandlerProvider, public _spinner: LoadingController, public statusBar: StatusBar, public splashScreen: SplashScreen, private _cache: Storage, private _event: Events) {
    this.initializeApp();
    this.today = new Date();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dashboard', component: DashboardPage,  url: 'assets/imgs/csl-icon-home.png' },
      { title: 'Fund Account', component: FundAccountPage,  url: 'assets/imgs/csl-icon-card.png' },
      { title: 'My Stocks', component: MyStocksPage,  url: 'assets/imgs/csl-icon-portfolio.png' },
      { title: 'My Cash Accounts', component: MyCashAccountsPage,  url: 'assets/imgs/csl-cash-icon.png' },
      { title: 'Stock Quotes', component: StockQuotesPage,  url: 'assets/imgs/csl-icon-trend.png' },
      { title: 'News Headlines', component: NewsHeadLinesPage,  url: 'assets/imgs/csl-icon-paper.png' },
      { title: 'My Watchlist', component: MyWatchlistPage,  url: 'assets/imgs/csl-icon-watchlist.png' },
      { title: 'Withdraw Cash', component: WithdrawCashPage,  url: 'assets/imgs/csl-icon-portfolio-2.png' },

    ];

    this.watchLogin();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      
    });
  }

  watchLogin(){
    this._event.subscribe('app:username', (customerId,name,time) => {
      this.portfolioDescription = name;
      this.today = time;
    });

  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component == DashboardPage) {
       this.nav.setRoot(page.component);
    } else {
      this.nav.push(page.component);
    }
   
  }

  logout(){ 
    this._cache.remove('csl_login');
    this._cache.remove('portfolio');
    this._event.publish('app:username', 'User', '');
    this.nav.setRoot(LoginPage);
  }

  ngOnDestroy() {
    this._event.unsubscribe('app:username');
    this._event.unsubscribe('app:userAuthenticateToken');
    this._event.unsubscribe('app:userAuthenticate');
    this._event.unsubscribe('app:userPortfolioObject');
    this._event.unsubscribe('app:userIdList');
  }
}
