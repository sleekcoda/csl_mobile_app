import {
  RequestResponseError,
  RequestResponseOfItems
} from "./../../services/authentication/auth.model";
import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { SellAndBuyStocksPage } from "./../sell-and-buy-stocks/sell-and-buy-stocks";
import { PortfolioInvestmentDetailsPage } from "./../portfolio-investment-details/portfolio-investment-details";
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the MyPortfolioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-my-portfolio",
  templateUrl: "./my-portfolio.html",
  styleUrls: [""]
})
export class MyPortfolioPage {
  portolioId: string;
  customerId: string;
  portfolioDescription: string;
  productDescription: string;
  cashAccountId: string;
  // tslint:disable-next-line: variable-name
  CscsNumber: string;

  portfolioInvestments: any | null;
  portfolioInvestmentSummary: number = 0;

  constructor(
    private route: Router,
    private navParams: ActivatedRoute,
    private _dashboardService: DashboardProvider,
    private _alert: NoticeHandlerProvider
  ) {
    this.customerId = this.navParams.snapshot.params.customerId;
    this.portfolioDescription = this.navParams.snapshot.params.portfolioDescription;
    this.cashAccountId = this.navParams.snapshot.params.cashAccountId;
    this.CscsNumber = this.navParams.snapshot.params.marketAccountId;

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
          this._alert.notifyError(JSON.stringify(err));
        }
      )
      .catch(err => this._alert.notifyError(JSON.stringify(err.error)));
  }
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
    this.route.navigate(["SellAndBuyStocksPage"], {
      queryParams: { action: "buy" }
    });
  }

  sellStocks() {
    this.route.navigate(["SellAndBuyStocksPage"], {
      queryParams: { action: "sell" }
    });
  }

  sellStock(index: number) {
    const stockToSell = {
      ...this.portfolioInvestments[index],
      cashAccountId: this.cashAccountId,
      marketAccId: this.CscsNumber,
      portfolioDesc: this.portfolioDescription,
      action: "sell"
    };
    this.route.navigate(["PortfolioInvestmentDetailsPage"], {
      queryParams: stockToSell
    });
  }
}
