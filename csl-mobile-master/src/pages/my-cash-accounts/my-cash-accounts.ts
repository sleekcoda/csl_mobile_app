import { CashStatementPage } from './../cash-statement/cash-statement';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyCashAccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-cash-accounts',
  templateUrl: 'my-cash-accounts.html'
})
export class MyCashAccountsPage {

  usersAccounts:any;
  userAccounts:any;
  totalCurrentBalance: number;
  totalAvailableBalance: number;
  customerId: string | null;
  customerIdList: any | null;

  usersCurrentBalance;
  usersAvailableBalance;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _storage: Storage) {
    

    let singleViewType = (this.navParams.get('singleAccount') == true) ? true:false;
    if(singleViewType == true){
        this.userAccounts = this.navParams.get('accountStatement');
        this.totalAvailableBalance = this.userAccounts.reduce((acc,el) => {acc.availableBalance + el.availableBalance});
        this.totalCurrentBalance = this.userAccounts.reduce((acc,el) => {acc.currentBalance + el.availableBalance});
    } 
  } 
  ngOnInit() {
    if(this.navParams.get('singleAccount') != true){
        this._storage.get('account_statement').then((accountStatement) => {
          if(accountStatement != null){
            this.customerIdList = Object["keys"](accountStatement);
            this.usersAccounts = Object["values"](accountStatement);
            this.usersCurrentBalance = 0;
            this.usersAvailableBalance = 0;
            this.usersAccounts.forEach(account => {
              this.usersCurrentBalance += this.sumAccountBalance(account, 'current');
              this.usersAvailableBalance += this.sumAccountBalance(account, 'available');
            });
          }
      });
    }
  }

  getStatement(customerId: string, acountNumber: string, totalCurrentBalance, totalAvailableBalance ){ 
    this.navCtrl.push(CashStatementPage,{customerId:customerId, accountNumber: acountNumber,currentBalance: totalCurrentBalance,availableBalance: totalAvailableBalance});
  }
  sumAccountBalance(accounts, accountType){
    let sum = 0;
    if(accountType == 'available'){
      accounts.forEach(account => { sum += account.availableBalance;});
    } else {
      accounts.forEach(account => { sum += account.currentBalance; });
    }
    return sum;
  }
  
}
