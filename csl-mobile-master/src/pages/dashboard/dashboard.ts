import { Storage } from '@ionic/storage';
import { LoginPage } from './../login/login';
import { SellAndBuyStocksPage } from './../sell-and-buy-stocks/sell-and-buy-stocks';
import { PortfoliosPage } from './../portfolios/portfolios';
import { DashboardProvider } from './../../providers/dashboard/dashboard';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { NoticeHandlerProvider } from '../../providers/notice-handler/notice-handler';
import { MyCashAccountsPage } from '../my-cash-accounts/my-cash-accounts';
import { RequestResponse, RequestResponseError } from '../../providers/authentication/auth.model';

/**
 * Generated class for the DashboardPage page.
 * 
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  
  public customerId: string;
  public portfolioDescription: string;
  public cashAccountBalance: any | null;
  public portfolioInvestmentSummary: number | null;
  public portfolioInvestments: number | null;
  public spinner:any;

  
  public portfolioObject: Object;
  public porfolioInvestment: any | null;
  public customerIdList: any | null  ;
  public cashAccountCustomerId: any | null;
  constructor(public _event: Events, private _storage: Storage, public _navCtrl: NavController, public _navParams: NavParams,private _alert: NoticeHandlerProvider , private  _dashboardService: DashboardProvider,private _spinner: LoadingController) {
    this.spinner = this._spinner.create({content:"Updating dashboard...",spinner:''});
    this.spinner.present();
    this._storage.get('login_username').then(
      id => {  
        this.customerId = (id == null) ? this._navCtrl.setRoot(LoginPage) : id ; 
        this.getPortfolio(this.customerId);
      }
    );
    

    this.porfolioInvestment = new Array();
    this.cashAccountBalance = new Array();
   
  }

  ionViewDidLoad() { }
  ngOnInit(){}
  async getPortfolio(customerId){
    
     Promise.all([
      await this._dashboardService.getPortfolio(customerId).then(
      response => {
        if(response.status == "success"){
          this.portfolioObject = response.data; 
          this.portfolioDescription = this.portfolioObject[this.customerId][0].portfolioDescription;
          this.customerIdList = Object.keys(this.portfolioObject );
          

          (this._navParams.get('login') == true) ? this._event.publish('app:username', this.customerId,this.portfolioObject[this.customerId][0].portfolioDescription, Date.now() ): null;

          this._storage.set('portfolio',response.data);
          
        }else{
          this._alert.notifyError(JSON.stringify(response.message));
        }
      },
      err => {
        let error = err as RequestResponseError;
        (error.status == 500 || error.status == 400) ?  this._alert.notifyError(JSON.stringify(error.statusText)) : this._navCtrl.setRoot(LoginPage);
      }
    ).catch(reason => {this._alert.notifyError(JSON.stringify(reason.error));}),      

    ]).then(resolve => {
      this.customerIdList.forEach(customerId => {
        this.getPorfolioInvestmentStatement(customerId);
        this.updateCashAccount(customerId);
        
        this._storage.set('portfolio_investments', this.porfolioInvestment)
      });
      
    }).catch(); 
    
  }//app:userAuthenticateToken
  async getPorfolioInvestmentStatement(customerId){
    await this.portfolioObject[customerId].forEach(portfolio => {
      this._dashboardService.getPorfolioInvestments(customerId, portfolio.marketAccountId).then(
        response => {
          if(response.item1 == 200){
            this.porfolioInvestment.push(response.item3);
            this.customerId = customerId;
          }else{
            this._alert.notifyError(JSON.stringify(response.item2));
          }
        },
        err => {
          let error = err as RequestResponseError;
          (error.status == 401) ? this._navCtrl.setRoot(LoginPage) :  this._alert.notifyError(JSON.stringify(error.statusText));

        }
      ).catch(); });
      
  }
  
  async updateCashAccount(customerId){
        await this._dashboardService.plainGetRequest(`cashaccounts/${customerId}`).then(
          resp => {
            let response = resp as RequestResponse;
            if(response.status == 'success'){
              this.cashAccountBalance = Object["values"](response.data);
              this.cashAccountCustomerId = Object["entries"](response.data);
              this._storage.set('account_statement',response.data);
            }else{
              this._alert.notifyError(JSON.stringify(response.message));
            }
            this.dismissSpinner();
          },
          err => {
            let error = err as RequestResponseError;
            this.dismissSpinner();
            (error.status == 401) ?  this._navCtrl.setRoot(LoginPage) : this._alert.notifyError(JSON.stringify(error.statusText)) ;
          }
        ).catch(reason => { this.dismissSpinner(); });
  }
 
   dismissSpinner(){
      if(this.spinner){
        this.spinner.dismiss();
        this.spinner = null;
    }
  }
  sumInvestments(portInvest){
      let sum = 0;
      portInvest.forEach(portfolio => {
      sum += portfolio.currentValue;
    });
    return sum;
  } 
  sumAccountBalance(accounts, accountType){
    let sum = 0;
    if(accountType == 'available'){
      accounts.forEach(account => {
            sum += account.availableBalance;
          });
    } else {
      accounts.forEach(account => {
            sum += account.currentBalance;
          });
    }
    
    return sum;
  }
 
  openCashAccount(customerId,accountStatement){ 
    this._navCtrl.push(MyCashAccountsPage,{customerId:customerId,singleAccount:true,accountStatement:accountStatement});
  }
  openPortfolio(){
    this._navCtrl.push(PortfoliosPage,{customerId: this.customerId});
  }
  buyStocks(){
    this._navCtrl.push(SellAndBuyStocksPage, {action:'buy'});
  }
  sellStocks(){
    this._navCtrl.push(SellAndBuyStocksPage, {action:'sell'});
  }
  
}  
