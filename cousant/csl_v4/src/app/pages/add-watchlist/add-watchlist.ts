import { LoginPage } from "./../login/login";
// import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { WatchlistDetailsPage } from "./../confirm-watchlist-details/watchlist-details";
// import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { Component, Input } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { DashboardProvider } from "src/app/services/dashboard/dashboard";
import { NoticeHandlerProvider } from "src/app/services/notice-handler/notice-handler";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the AddWatchlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-add-watchlist",
  templateUrl: "./add-watchlist.html",
  styleUrls: ["./add-watchlist.scss"]
})
export class AddWatchlistPage {
  availableStocks: any | null;
  currentPrice: string | null;
  today: any;
  year: any;
  minYear: any;
  todayDate: any;
  expiryDate: any;
  dateValidated = false;
  preSelectedSymbol: string | null;

  constructor(
    private route: Router,
    private navParams: ActivatedRoute,
    private _http: DashboardProvider,
    private _spin: LoadingController,
    private _alert: NoticeHandlerProvider
  ) {
    this.todayDate = new Date();
    this.getStock();
    this.preSelectedSymbol = this.navParams.snapshot.params.symbol;
  }
  @Input() addWatchlist: any = {
    expiry: "",
    targetPrice: "",
    margin: "",
    symbol: this.navParams.snapshot.params.symbol
  };

  ionViewDidLoad() {
    this.todayDate = new Date();
  }

  addToWishlist() {
    this.addWatchlist.currentPrice = this.currentPrice;
    this.route.navigate(["WatchlistDetailsPage"], {
      queryParams: this.addWatchlist
    });
  }

  async getStock() {
    const loading = await this._spin.create({
      message: "Fetching available stocks'..."
    });
    await loading.present();

    this._http
      .plainGetRequest("stockprices")
      .then(
        response => {
          if (response.status == "success") {
            this.today = new Date();
            this.year = this.today.getFullYear() + 5;
            this.minYear = this.today.getFullYear();
            this.availableStocks = response.data;
          } else {
            this._alert.notifyError(response.message);
          }
        },
        error => {
          this._alert.notifyError(
            `Stock prices are not available.<br><br>You may not\s
             able to add stocks to your watchlist at the moment please check back later`
          );
        }
      )
      .catch(reason => {
        this._alert.notifyError(JSON.stringify(reason.error));
      });
  }

  changeSymbol(symbol: string) {
    this._http
      .plainGetRequest(`stockprices/${symbol}`)
      .then(
        response => {
          if (response.status == "success") {
            this.currentPrice = response.data.currentPrice;
          } else {
            this._alert.notifyError(response.message);
          }
        },
        error => {
          if (error.status == 401) {
            this.route.navigateByUrl("/login");
            this._alert.notifyError(
              "Session expired<br><br>You must login again."
            );
          }
          if (error.status == 500) {
            this._alert.notifyError(
              "Server error.<br><br>Unable to get price at the moment."
            );
          }
        }
      )
      .catch(reason => {
        this._alert.notifyError(JSON.stringify(reason.error));
      });
  }
  validateDate() {
    setTimeout(() => {
      const now = new Date().getTime();
      const dateDifference = new Date(this.addWatchlist.expiry).getTime() - now;

      if (dateDifference < 0) {
        this.dateValidated = false;
      } else {
        this.dateValidated = true;
      }
    }, 500);
  }
}
