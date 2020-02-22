import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

/**
 * Generated class for the PortfolioListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-portfolio-list",
  templateUrl: "./portfolio-list.html",
  styleUrls: ["./portfolio-list.scss"]
})
export class PortfolioListPage {
  portfolioList: any | null;
  constructor(public route: Router, private navParams: ActivatedRoute) {
    this.portfolioList = this.navParams.snapshot.params;
  }

  viewPortfolio(porfolioObject) {
    this.route.navigate(["MyPortfolioPage"], { queryParams: porfolioObject });
  }
}
