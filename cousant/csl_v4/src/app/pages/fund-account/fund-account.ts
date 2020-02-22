import { Component } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Generated class for the FundAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-fund-account",
  templateUrl: "./fund-account.html",
  styleUrls: ["./fund-account.scss"]
})
export class FundAccountPage {
  constructor(public route: Router) {}

  ionViewDidLoad() {}
  payWithBank() {
    this.route.navigateByUrl("PayAtBankPage");
  }

  payWithCard() {
    this.route.navigateByUrl("SelectCashAccountPage");
  }
}
