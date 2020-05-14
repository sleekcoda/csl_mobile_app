import { PortfolioListPage } from "./../portfolio-list/portfolio-list";
import { SellAndBuyStocksPage } from "./../sell-and-buy-stocks/sell-and-buy-stocks";
import { LoginPage } from "./../login/login";
import { Storage } from "@ionic/storage";
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NoticeHandlerProvider } from "../../providers/notice-handler/notice-handler";
import { OpenOrdersPage } from "../open-orders/open-orders";

/**
 * Generated class for the PortfoliosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-portfolios",
  templateUrl: "portfolios.html"
})
export class PortfoliosPage {
  portfolios: any | null;
  customerIdList: any | null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _storage: Storage,
    private _alert: NoticeHandlerProvider
  ) {
    this._storage
      .get("portfolio")
      .then(portfolio => {
        if (portfolio == null) {
          this._alert.notifyError(
            "Invalid session!<br><br>No portfolios found, the server maybe currently unreachable"
          );
          this.navCtrl.setRoot(LoginPage);
        } else {
          this.portfolios = Object["values"](portfolio);
          this.customerIdList = Object.keys(portfolio);
        }
      })
      .catch(reason => {});
  }
  ngOnInit() {}
  ionViewDidLoad() {}

  getPortfolio(portfolio: any) {
    let prevToNextPage = this.navParams.get("action");
    if (prevToNextPage == "executed" || prevToNextPage == "open") {
      this.navCtrl.push(OpenOrdersPage, {
        ...portfolio,
        action: prevToNextPage
      });
    } else {
      this.navCtrl.push(PortfolioListPage, portfolio);
    }
  }
  buyStocks() {
    this.navCtrl.push(SellAndBuyStocksPage, { action: "buy" });
  }
  sellStocks() {
    this.navCtrl.push(SellAndBuyStocksPage, { action: "sell" });
  }
}
