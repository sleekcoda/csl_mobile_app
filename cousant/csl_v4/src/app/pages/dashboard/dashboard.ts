import { DashboardProvider } from "./../../services/dashboard/dashboard";

import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { NoticeHandlerProvider } from "../../services/notice-handler/notice-handler";
import {
  RequestResponse,
  RequestResponseError
} from "../../services/authentication/auth.model";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-dashboard",
  templateUrl: "./dashboard.html",
  styleUrls: ["./dashboard.scss"]
})
export class DashboardPage implements OnInit {
  public customerId: string;
  public portfolioDescription: string;
  public cashAccountBalance: any | null;
  public portfolioInvestmentSummary: number | null;
  public portfolioInvestments: number | null;
  public spinner: any;

  public portfolioObject: any;
  public porfolioInvestment: any | null;
  public customerIdList: any | null;
  public cashAccountCustomerId: any | null;
  @Output() _event = new EventEmitter<{ type: string; value: any }>();
  constructor(
    public route: Router,
    public _navParams: ActivatedRoute,
    private _alert: NoticeHandlerProvider,
    private _dashboardService: DashboardProvider,
    private _spinner: LoadingController
  ) {
    this._spinner
      .create({
        message: "Updating dashboard..."
      })
      .then(spin => spin.present());

    if (localStorage.getItem("login_username") == null) {
      this.route.navigateByUrl("/login");
    } else {
      this.customerId = localStorage.getItem("login_username");
    }
    this.getPortfolio(this.customerId);

    this.porfolioInvestment = new Array();
    this.cashAccountBalance = new Array();
  }

  ionViewDidLoad() {}
  ngOnInit() {}
  async getPortfolio(customerId) {
    Promise.all([
      await this._dashboardService
        .getPortfolio(customerId)
        .then(
          response => {
            if (response.status == "success") {
              this.portfolioObject = response.data;
              this.portfolioDescription = this.portfolioObject[
                this.customerId
              ][0].portfolioDescription;
              this.customerIdList = Object.keys(this.portfolioObject);

              if (this._navParams.snapshot.params.login == true) {
                this._event.emit({
                  type: "app:username",
                  value: {
                    customerId: this.customerId,
                    portfolioObject: this.portfolioObject[this.customerId][0]
                      .portfolioDescription,
                    timestamp: Date.now()
                  }
                });
              }

              localStorage.setItem("portfolio", response.data);
            } else {
              this._alert.notifyError(JSON.stringify(response.message));
            }
          },
          err => {
            const error = err as RequestResponseError;
            error.status == 500 || error.status == 400
              ? this._alert.notifyError(JSON.stringify(error.statusText))
              : this.route.navigateByUrl("/login");
          }
        )
        .catch(reason => {
          this._alert.notifyError(JSON.stringify(reason.error));
        })
    ])
      .then(resolve => {
        // tslint:disable-next-line: variable-name
        this.customerIdList.forEach(customer_id => {
          this.getPorfolioInvestmentStatement(customer_id);
          this.updateCashAccount(customer_id);

          localStorage.setItem(
            "portfolio_investments",
            this.porfolioInvestment
          );
        });
      })
      .catch();
  } // app:userAuthenticateToken
  async getPorfolioInvestmentStatement(customerId) {
    await this.portfolioObject[customerId].forEach(portfolio => {
      this._dashboardService
        .getPorfolioInvestments(customerId, portfolio.marketAccountId)
        .then(
          response => {
            if (response.item1 == 200) {
              this.porfolioInvestment.push(response.item3);
              this.customerId = customerId;
            } else {
              this._alert.notifyError(JSON.stringify(response.item2));
            }
          },
          err => {
            const error = err as RequestResponseError;
            error.status == 401
              ? this.route.navigateByUrl("/login")
              : this._alert.notifyError(JSON.stringify(error.statusText));
          }
        )
        .catch();
    });
  }

  async updateCashAccount(customerId) {
    await this._dashboardService
      .plainGetRequest(`cashaccounts/${customerId}`)
      .then(
        resp => {
          const response = resp as RequestResponse;
          if (response.status == "success") {
            this.cashAccountBalance = Object.values(response.data);
            this.cashAccountCustomerId = Object.entries(response.data);
            localStorage.setItem("account_statement", response.data);
          } else {
            this._alert.notifyError(JSON.stringify(response.message));
          }
          this.dismissSpinner();
        },
        err => {
          const error = err as RequestResponseError;
          this.dismissSpinner();
          error.status == 401
            ? this.route.navigateByUrl("/login")
            : this._alert.notifyError(JSON.stringify(error.statusText));
        }
      )
      .catch(reason => {
        this.dismissSpinner();
      });
  }

  dismissSpinner() {
    if (this.spinner) {
      this.spinner = null;
    }
  }
  sumInvestments(portInvest) {
    let sum = 0;
    portInvest.forEach(portfolio => {
      sum += portfolio.currentValue;
    });
    return sum;
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

  openCashAccount(customerId, accountStatement) {
    this.route.navigate(["MyCashAccountsPage"], {
      queryParams: {
        customerId,
        singleAccount: true,
        accountStatement
      }
    });
  }
  openPortfolio() {
    this.route.navigate(["PortfoliosPage"], {
      queryParams: { customerId: this.customerId }
    });
  }
  buyStocks() {
    this.route.navigate(["SellAndBuyStocksPage"], {
      queryParams: { action: "buy" }
    });
  }
  sellStocks() {
    this.route.navigate(["SellAndBuyStocksPage"], {
      queryParams: { action: "sell" }
    });
  }
}
