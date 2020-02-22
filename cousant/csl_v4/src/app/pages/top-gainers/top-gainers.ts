import { LoginPage } from "./../login/login";
import { ViewStockPage } from "./../view-stock/view-stock";
import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { NoticeHandlerProvider } from "../../services/notice-handler/notice-handler";

/**
 * Generated class for the TopGainersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-top-gainers",
  templateUrl: "./top-gainers.html",
  styleUrls: [""]
})
export class TopGainersPage implements OnInit {
  topGainers: any;
  stocksA: any;
  stocksB: any;
  alternator = 1;
  constructor(
    private route: Router,
    private _http: DashboardProvider,
    private _notice: NoticeHandlerProvider
  ) {
    this.getStocks();
  }

  ionViewDidLoad() {}
  ngOnInit() {
    setTimeout(() => {
      this.getStocks();
    }, 30000);
  }
  getStocks() {
    this._http
      .plainGetRequest("stockprices/topgainers")
      .then(
        response => {
          if (response.status == "success") {
            let resp = response.data;
            this.topGainers = resp.sort((a, b) =>
              a && b && a.currentPrice < b.currentPrice
                ? 1
                : b.currentPrice < a.currentPrice
                ? -1
                : 0
            );
          } else {
            this._notice.notifyError(
              "Connection error:<br><br>NSE server is currently unavailable."
            );
          }
        },
        error => {
          if (error.status == 500) {
            this._notice.notifyError("Server unavailable. Check back later ");
          } else if (error.status == 401) {
            this._notice.notifyError(
              JSON.stringify(error.error) + "<br><br>You must login first"
            );
            this.route.navigateByUrl("/login");
          } else {
            this._notice.notifyError(
              JSON.stringify(error.error) +
                "<br><br>NSE server is currently unavaible."
            );
          }
        }
      )
      .catch(reason => {
        console.log(reason);
      });
  }
  viewStock(symbol: any) {
    this.route.navigateByUrl(ViewStockPage, symbol);
  }
  isEven(n) {
    return n % 2 == 0;
  }
}
