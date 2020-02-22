import { PortfolioListPage } from "./../portfolio-list/portfolio-list";
import { SellAndBuyStocksPage } from "./../sell-and-buy-stocks/sell-and-buy-stocks";
import { Component, OnInit } from "@angular/core";
import { NoticeHandlerProvider } from "../../services/notice-handler/notice-handler";
import { OpenOrdersPage } from "../open-orders/open-orders";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the PortfoliosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-portfolios",
  templateUrl: "./portfolios.html",
  styleUrls: ["./portfolios.scss"]
})
export class PortfoliosPage implements OnInit {
  portfolios: any | null;
  customerIdList: any | null;

  constructor(
    private route: Router,
    private navParams: ActivatedRoute,
    private _alert: NoticeHandlerProvider
  ) {
    if (!localStorage.getItem("portfolio")) {
      this._alert.notifyError(
        "Invalid session!<br><br>No portfolios found, the server maybe currently unreachable"
      );
      this.route.navigateByUrl("/login");
    } else {
      this.portfolios = Object.values(localStorage.getItem("portfolio"));
      this.customerIdList = Object.keys(localStorage.getItem("portfolio"));
    }
  }
  ngOnInit() {}
  ionViewDidLoad() {}

  getPortfolio(portfolio: any) {
    const prevToNextPage = this.navParams.snapshot.params.action;
    if (prevToNextPage == "executed" || prevToNextPage == "open") {
      this.route.navigate(["OpenOrdersPage"], {
        queryParams: {
          ...portfolio,
          action: prevToNextPage
        }
      });
    } else {
      this.route.navigate(["PortfolioListPage"], { queryParams: portfolio });
    }
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
