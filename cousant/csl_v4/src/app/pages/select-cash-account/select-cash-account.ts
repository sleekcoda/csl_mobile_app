import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the SelectCashAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-select-cash-account",
  templateUrl: "./select-cash-account.html",
  styleUrls: [""]
})
export class SelectCashAccountPage {
  portfolios = new Array();
  actions: string | null;
  constructor(private route: Router, private navParams: ActivatedRoute) {
    const portfolios = Object.values(localStorage.getItem("portfolio"));
    portfolios.forEach(portfolioarr => {
      portfolioarr.map(e => {
        this.portfolios.push(e);
      }); // #map function
    }); // #foreach
  }

  openCardPage(accountNumber: string) {
    if (this.actions === "withdraw_cash") {
      this.route.navigate(["WithdrawCashPage"], {
        queryParams: {
          accountNumber
        }
      });
    } else {
      this.route.navigate(["EnterCardDetailsPage"], {
        queryParams: {
          accountNumber,
          actions: "withdraw"
        }
      });
    }
  }
}
