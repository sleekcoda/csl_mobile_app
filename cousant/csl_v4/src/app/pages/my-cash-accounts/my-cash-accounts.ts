import { CashStatementPage } from "./../cash-statement/cash-statement";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the MyCashAccountsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-my-cash-accounts",
  templateUrl: "./my-cash-accounts.html",
  styleUrls: [""]
})
export class MyCashAccountsPage implements OnInit {
  usersAccounts: any;
  userAccounts: any;
  totalCurrentBalance: number;
  totalAvailableBalance: number;
  customerId: string | null;
  customerIdList: any | null;

  usersCurrentBalance;
  usersAvailableBalance;

  constructor(private route: Router, private navParams: ActivatedRoute) {
    const singleViewType =
      this.navParams.snapshot.params.singleAccount == true ? true : false;
    if (singleViewType == true) {
      this.userAccounts = this.navParams.snapshot.params.accountStatement;
      this.totalAvailableBalance = this.userAccounts.reduce((acc, el) => {
        // tslint:disable-next-line: no-unused-expression
        acc.availableBalance + el.availableBalance;
      });
      this.totalCurrentBalance = this.userAccounts.reduce((acc, el) => {
        // tslint:disable-next-line: no-unused-expression
        acc.currentBalance + el.availableBalance;
      });
    }
  }
  ngOnInit() {
    if (this.navParams.snapshot.params.singleAccount != true) {
      if (localStorage.getItem("account_statement")) {
        this.customerIdList = Object.keys(
          localStorage.getItem("account_statement")
        );

        // tslint:disable-next-line: no-string-literal
        this.usersAccounts = Object.values(
          localStorage.getItem("account_statement")
        );
        this.usersCurrentBalance = 0;
        this.usersAvailableBalance = 0;
        this.usersAccounts.forEach(account => {
          this.usersCurrentBalance += this.sumAccountBalance(
            account,
            "current"
          );
          this.usersAvailableBalance += this.sumAccountBalance(
            account,
            "available"
          );
        });
      }
    }
  }

  getStatement(
    customerId: string,
    accountNumber: string,
    totalCurrentBalance,
    totalAvailableBalance
  ) {
    this.route.navigate(["CashStatementPage"], {
      queryParams: {
        customerId,
        accountNumber,
        currentBalance: totalCurrentBalance,
        availableBalance: totalAvailableBalance
      }
    });
  }
  sumAccountBalance(accounts, accountType) {
    let sum = 0;
    if (accountType == "available") {
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
}
