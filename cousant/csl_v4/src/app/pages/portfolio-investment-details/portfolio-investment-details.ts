import { SellAndBuyStocksPage } from "./../sell-and-buy-stocks/sell-and-buy-stocks";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

/**
 * Generated class for the PortfolioInvestmentDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-portfolio-investment-details",
  templateUrl: "./portfolio-investment-details.html",
  styleUrls: [""]
})
export class PortfolioInvestmentDetailsPage {
  order: any;
  portfolioDesc: string;
  constructor(private navParams: ActivatedRoute, private route: Router) {
    this.order = this.navParams.snapshot.params;
    this.order.actions = "sell";
  }

  sell() {
    this.route.navigate(["SellAndBuyStocksPage"], { queryParams: this.order });
  }
}
