import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { WithdrawCashPage } from './../withdraw-cash/withdraw-cash';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DateFormatPipe } from './date-format-pipe';
import { DatePicker } from '@ionic-native/date-picker';


/**
 * Generated class for the CashStatementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * `${this.customerId}/statements`
 */

@IonicPage()
@Component({
  selector: 'page-cash-statement',
  templateUrl: 'cash-statement.html',
  providers:[DateFormatPipe,DatePicker]
})
export class CashStatementPage {

    startDate: any;
    todayDate: any;
    endDate:any;
    accountStateObject:any | null ;
    totalCurrentBalance: number;
    totalAvailableBalance: number;
    customerId: string;
    spinner:any;
    noTransaction: boolean = true;

  constructor(private _date: DateFormatPipe, public navCtrl: NavController, public navParams: NavParams,public _datePicker:DatePicker, private _dashboardProvider: DashboardProvider,private _spinner: LoadingController, private _alert: NoticeHandlerProvider ) {
    let today = new Date();

    this.todayDate = new Date();
    
    this.totalAvailableBalance = this.navParams.get('availableBalance');
    this.totalCurrentBalance = this.navParams.get('currentBalance');
    this.customerId = this.navParams.get('customerId');

    this.startDate = this._date.transform( new Date(today.getFullYear() ,  today.getMonth() - 6, today.getDay()),'d-MMM-y');
    this.endDate = this._date.transform( new Date(today.getFullYear() , today.getMonth() , today.getDay()),'d-MMM-y');
  
  }

  ionViewDidLoad() {

  }
  withdrawCash(){
    this.navCtrl.push(WithdrawCashPage);
  }
  pickStart(){
    this._datePicker.show({
      date: this.startDate,
      mode: 'date',
      androidTheme: this._datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
      maxDate: this.todayDate
    }).then(
      date => {
        this.startDate = this._date.transform( date,'dd-MMM-y');
      },
      err => {}
    );
  }

  pickEnd(){
    this._datePicker.show({
      date: this.endDate,
      mode: 'date',
      androidTheme: this._datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
      maxDate: this.todayDate
    }).then(
      date => {
        this.endDate = this._date.transform( date,'dd-MMM-y');    
      },
      err => {}
    );
  }

  getStatementRange(){
    this.spinner = this._spinner.create({spinner:'',content:'Retrieving account statement...'});
    this.spinner.present();

    let body = {
      accountNum: this.navParams.get('accountNumber'),
      startDate: this.startDate,
      endDate: this.endDate
    }

  /**
   * Use customerId to get account Statement
   */
  
  this._dashboardProvider.getAccountStatement(`${this.customerId}/statements`, body).then(
    response => {
      if(response.status == 'success' && response.data.length > 0 ) {
        this.noTransaction = true;
        this.accountStateObject = response.data;
      }
      else{
        this._alert.notifyError('No transactions occured within selected period');
        this.noTransaction = false;                
      }
      this.spinner.dismiss();
    },
    error => {
      this.noTransaction = false;      
      this._alert.notifyError('Network error occured trying to get account update');
      this.spinner.dismiss();
    }
        
  ).catch(reason => {this._alert.notifyError(JSON.stringify(reason.error));  this.spinner.dismiss();this.noTransaction = false;});
  /**
   * Use customerId to get account Statement
   */
  }

}