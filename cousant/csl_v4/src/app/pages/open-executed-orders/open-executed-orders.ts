import { Component } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Generated class for the OpenExecutedOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-open-executed-orders",
  templateUrl: "./open-executed-orders.html",
  styleUrls: ["./open-executed-orders.scss"]
})
export class OpenExecutedOrdersPage {
  constructor(private route: Router) {}

  ionViewDidLoad() {}
  openOrders() {
    this.route.navigate(["PortfoliosPage"], {
      queryParams: { action: "open" }
    });
  }
  executedOrders() {
    this.route.navigate(["PortfoliosPage"], {
      queryParams: { action: "executed" }
    });
  }
}
