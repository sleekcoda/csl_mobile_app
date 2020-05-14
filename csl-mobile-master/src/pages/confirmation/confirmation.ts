import { LoginPage } from "./../login/login";
import { DashboardPage } from "./../dashboard/dashboard";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  MenuController
} from "ionic-angular";

/**
 * Generated class for the ConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-confirmation",
  templateUrl: "confirmation.html"
})
export class ConfirmationPage {
  action: string;
  symbol: string;
  buyStockReference: string;
  constructor(
    public _navCtrl: NavController,
    public menu: MenuController,
    public _navParams: NavParams
  ) {
    this.action = _navParams.get("action");
    this.symbol = _navParams.get("symbol");
    this.buyStockReference = _navParams.get("reference");
  }

  ionViewDidLoad() {
    this.menu.swipeEnable(false);
  }
  ionViewWillLeave() {
    this.menu.swipeEnable(true);
  }

  backToLogin() {
    this._navCtrl.setRoot(LoginPage);
  }
  backToDashboard() {
    this._navCtrl.setRoot(DashboardPage);
  }
}
