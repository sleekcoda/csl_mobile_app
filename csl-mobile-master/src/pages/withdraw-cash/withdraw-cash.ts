import { LoginPage } from './../login/login';
import { ConfirmationPage } from './../confirmation/confirmation';
import { NoticeHandlerProvider } from './../../providers/notice-handler/notice-handler';
import { DashboardProvider } from './../../providers/dashboard/dashboard';
import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/**
 * Generated class for the WithdrawCashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw-cash',
  templateUrl: 'withdraw-cash.html',
})  

  export class WithdrawCashPage {
  banks: any;
  availableBalance: number;
  withdrawForm: FormGroup; 
  portfolioArray = new Array();
  withdrawalPortfolio: any;
  constructor( private fb: FormBuilder,private navCtrl: NavController, private _storage: Storage, private _http: DashboardProvider,private _alert: NoticeHandlerProvider,private _spin: LoadingController){
    this.availableBalance = 0;
    this._storage.get('banks').then(
        banks => {
            if(banks == null){
                this.getBanks();
            } else {
                this.banks = banks;
            }
        }
    ); //#storage.get()

  this._storage.get('portfolio').then(
      portfolio => {
        let portfolios = Object["values"](portfolio);
        portfolios.forEach(portfolioarr => {
          portfolioarr.map((e) =>{
            this.portfolioArray.push(e);
          }); // #map function
        }); // #foreach
      // console.log(this.portfolioArray);
      });// #portfolio.then()
      
  }
  
  ngOnInit() {
      this.withdrawForm = this.fb.group({
          accountNumber:[null,[Validators.required]],
          amount: [null,[Validators.required]],
          description: [null,[]],
          bankAccountNumber: [null,[Validators.required]],
          bankId: [null,[Validators.required]],
          reference: [null,[]],
          effectiveDate:[null,[Validators.required]]
      });

     this.accountNumber.valueChanges.subscribe(value=>{
       this.cashAccountStatement(value);
      //  console.log(value, '\n main value \n Portfolio inside ')
       this.withdrawalPortfolio = this.portfolioArray.filter( portfolio => {
         return portfolio.cashAccountId === value;
       });
       
      this.description.setValue('Withdraw_'+ value+ '_' + this.amount.value); 
    });

     this.amount.valueChanges.subscribe( value=> {
      this.description.setValue('Withdraw_'+ this.accountNumber.value + '_' + value);
    });

  }
  ionViewCanLeave(){
    // this.accountNumber.valueChanges.unsubscrib()
  }
  get bankAccountNumber(){
    return this.withdrawForm.get('bankAccountNumber');
  }

  get bankId(){
    return this.withdrawForm.get('bankId');
  }

  get accountNumber(){
      return this.withdrawForm.get('accountNumber');
  }
  get amount(){
    return this.withdrawForm.get('amount');
  }
  get effectiveDate(){
    return this.withdrawForm.get('effectiveDate');
  }
  get description(){
    return this.withdrawForm.get('description');
  }
  get reference(){
    return this.withdrawForm.get('reference');
  }

  get maxYear(){
    let today = new Date();
     
      return new Date(today.getFullYear() + 5,today.getMonth(),today.getDate());
  }
  get minYear(){
    let today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  proceed(){
      let loading =  this._spin.create({spinner:'',content:'Initializing withdraw...'});
      loading.present();
      let path = (this.withdrawForm.get('bankId').value  == "214") ? `cashaccount/withdrawal/${this.withdrawalPortfolio[0].customerId}/request` : `cashaccount/withdrawal/${this.withdrawalPortfolio[0].customerId}/thirdparty/request`;
      this.reference.setValue(`Ref-${Date.now()}`);
      this._http.withdrawCash(path,[this.withdrawForm.value]).then(
          response => {
              if(response.status == 'success'){
                  this.navCtrl.push(ConfirmationPage,{action:'withdrawal'})
              } else {
                  this._alert.notifyError(JSON.stringify( response.message ));
              } loading.dismiss();
          },
          error => {
              if(error.status == 401){
                  this.navCtrl.setRoot(LoginPage);
                  }else{  this._alert.notifyError(JSON.stringify( error.error )); }
                  loading.dismiss();
          }
      ).catch(reason => {loading.dismiss();this._alert.notifyError(JSON.stringify(reason.error));});
  }

  getBanks(){

    this._http.plainGetRequest('banks').then(
        response => {
            if(response.status=='success'){
                this.banks = response.data;
                this._storage.set('banks',response.data);
            }else{
                this._alert.notifyError(JSON.stringify( response.message ));
            }
        },
        error => {
            if(error.status == 401){
               this.navCtrl.setRoot(LoginPage);
            }else{  this._alert.notifyError(JSON.stringify( error.error )); }
        }
    ).catch(reason => {});
  }

  async cashAccountStatement(cashAccountId: string){

    await this._http.plainGetRequest(`cashaccounts/${cashAccountId}/balance/`).then(
      response => {
        if(response.status == 'success'){
          this.availableBalance = response.data.availableBalance;
          this.amount.setAsyncValidators
        }else {
          this.availableBalance = 0;
          this._alert.notifyError('Failed to get your account balance');
        }
      },
      error => {
        this.availableBalance = 0;
        if(error.status == '401'){
          this.navCtrl.setRoot(LoginPage);
          this._alert.notifyError('Session expired');}
        else{this._alert.notifyError(JSON.stringify(error.message+'<br><br>Failed to get your account balance'));}
      }
    ).catch(reason => {this._alert.notifyError(JSON.stringify(reason.error));})
  }

}