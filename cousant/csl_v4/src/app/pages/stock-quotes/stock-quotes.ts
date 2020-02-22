import { PriceListPage } from "./../price-list/price-list";
import { TopLosersPage } from "./../top-losers/top-losers";
import { TopGainersPage } from "./../top-gainers/top-gainers";
import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Router } from "@angular/router";

/**
 * Generated class for the StockQuotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-stock-quotes",
  templateUrl: "./stock-quotes.html",
  styleUrls: ["./stock-quotes.scss"]
})
export class StockQuotesPage {
  constructor(public route: Router) {}

  ionViewDidLoad() {}

  openMarketList() {
    this.route.navigateByUrl("PriceListPage");
  }
  openTopGainers() {
    this.route.navigateByUrl("TopGainersPage");
  }
  openTopLosers() {
    this.route.navigateByUrl("TopLosersPage");
  }
}
