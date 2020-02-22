import { Component } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-confirmation",
  templateUrl: "./confirmation.html",
  styleUrls: ["./confirmation.scss"]
})
export class ConfirmationPage {
  action: string;
  symbol: string;
  buyStockReference: string;
  constructor(
    public route: Router,
    public menu: MenuController,
    public _navParams: ActivatedRoute
  ) {
    this.action = _navParams.snapshot.params.action;
    this.symbol = _navParams.snapshot.params.symbol;
    this.buyStockReference = _navParams.snapshot.params.reference;
  }

  ionViewDidLoad() {}
  ionViewWillLeave() {}

  backToLogin() {
    this.route.navigateByUrl("/login");
  }
  backToDashboard() {
    this.route.navigateByUrl("/dashboard");
  }
}
