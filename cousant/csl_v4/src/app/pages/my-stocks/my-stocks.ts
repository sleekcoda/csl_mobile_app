import { Component } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Generated class for the MyStocksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-my-stocks",
  templateUrl: "./my-stocks.html",
  styleUrls: ["./my-stocks.scss"]
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
