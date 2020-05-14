import { RequestResponseError } from "./../../providers/authentication/auth.model";
import { NoticeHandlerProvider } from "./../../providers/notice-handler/notice-handler";
import { DashboardProvider } from "./../../providers/dashboard/dashboard";
import { SellAndBuyStocksPage } from "./../sell-and-buy-stocks/sell-and-buy-stocks";
import { PortfolioInvestmentDetailsPage } from "./../portfolio-investment-details/portfolio-investment-details";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

/**
 * Generated class for the MyPortfolioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-my-portfolio",
  templateUrl: "my-portfolio.html"
})
export class MyPortfolioPage {
  portolioId: string;
  customerId: string;
  portfolioDescription: string;
  productDescription: string;
  cashAccountId: string;
  CscsNumber: string;

  portfolioInvestments: any | null;
  portfolioInvestmentSummary: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _dashboardService: DashboardProvider,
    private _alert: NoticeHandlerProvider
  ) {
    this.customerId = this.navParams.get("customerId");
    this.portfolioDescription = this.navParams.get("portfolioDescription");
    this.cashAccountId = this.navParams.get("cashAccountId");
    this.CscsNumber = this.navParams.get("marketAccountId");

    this._dashboardService
      .getPorfolioInvestments(this.customerId, this.CscsNumber)
      .then(
        response => {
          if (response.item1 == 200) {
            this.portfolioInvestments = response.item3;
          } else {
            this._alert.notifyError(JSON.stringify(response.item2));
          }
        },
        err => {
          error => {
            err as RequestResponseError;
            this._alert.notifyError(JSON.stringify(err));
          };
        }
      )
      .catch(err => this._alert.notifyError(JSON.stringify(err.error)));
  }
  ngAfterViewInit() {}
  getSum(investmentArray) {
    let sum = 0;
    if (investmentArray) {
      investmentArray.forEach(investment => {
        sum += investment.currentValue;
      });
    }
    return sum;
  }

  buyStocks() {
    this.navCtrl.push(SellAndBuyStocksPage, { action: "buy" });
  }

  sellStocks() {
    this.navCtrl.push(SellAndBuyStocksPage, { action: "sell" });
  }

  sellStock(index: number) {
    let stockToSell = {
      ...this.portfolioInvestments[index],
      cashAccountId: this.cashAccountId,
      marketAccId: this.CscsNumber,
      portfolioDesc: this.portfolioDescription,
      action: "sell"
    };
    this.navCtrl.push(PortfolioInvestmentDetailsPage, stockToSell);
  }
}
