import { PortfoliosPage } from "./../portfolios/portfolios";
import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { OpenExecutedOrdersPage } from "../open-executed-orders/open-executed-orders";
import { SellAndBuyStocksPage } from "../sell-and-buy-stocks/sell-and-buy-stocks";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the MyStocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-my-stocks",
  templateUrl: "./my-stocks.html",
  styleUrls: [""]
})
export class MyStocksPage {
  constructor(public route: Router) {}

  ionViewDidLoad() {}

  openPortfolios() {
    this.route.navigate(["portfolio"], {
      queryParams: { action: "portfolio" }
    });
  }
  openOrders() {
    this.route.navigateByUrl("open-executed-order");
  }

  buyStocks() {
    this.route.navigate([""], { queryParams: { action: "buy" } });
  }
  sellStocks() {
    this.route.navigate(["/"], { queryParams: { action: "sell" } });
  }
}
