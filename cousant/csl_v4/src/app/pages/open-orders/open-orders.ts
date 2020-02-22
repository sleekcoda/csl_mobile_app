import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { SellAndBuyStocksPage } from "../sell-and-buy-stocks/sell-and-buy-stocks";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the OpenOrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-open-orders",
  templateUrl: "./open-orders.html",
  styleUrls: ["./open-orders.scss"]
})
export class OpenOrdersPage {
  orderType: string;
  orderObj: any | null;
  accountNumber: string;
  noOrders: boolean;

  customerId: string;
  portfolioDescription: string;
  productDescription: string;
  marketAccountId: string;
  cashAccountId: string;

  constructor(
    private route: Router,
    private navParams: ActivatedRoute,
    private _http: DashboardProvider,
    private _alert: NoticeHandlerProvider,
    private loading: LoadingController
  ) {
    this.orderType = this.navParams.snapshot.params.action;
    this.accountNumber = this.navParams.snapshot.params.marketAccountId;

    this.customerId = this.navParams.snapshot.params.customerId;
    this.portfolioDescription = this.navParams.snapshot.params.portfolioDescription;

    this.marketAccountId = this.navParams.snapshot.params.marketAccountId;

    this.cashAccountId = this.navParams.snapshot.params.cashAccountId;
  }

  ionViewDidLoad() {
    this.loading.create({ message: "" }).then(spin => spin.present());
    this._http
      .plainGetRequest(`orders/${this.accountNumber}/${this.orderType}`)
      .then(
        response => {
          if (response.status == "success" && response.data != null) {
            this.orderObj = response.data;
            this.noOrders = false;
          } else {
            this.noOrders = true;
          }
        },
        error => {
          if (error.status == 401) {
            this._alert.notifyError("Session expired!");
            this.route.navigateByUrl("/login");
          } else if (error.status == 500) {
            this._alert.notifyError("Server error try again later.");
          } else {
            this._alert.notifyError("Server error try again later.");
          }
          this.noOrders = true;
        }
      )
      .catch(e => {
        console.log(e);
      });
  }
  buyStocks() {
    this.route.navigate(["SellAndBuyStocksPage"], {
      queryParams: { action: "buy" }
    });
  }
  sellStocks() {
    this.route.navigate(["SellAndBuyStocksPage"], {
      queryParams: { action: "sell" }
    });
  }
}
