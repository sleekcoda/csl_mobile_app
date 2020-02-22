import { LoginPage } from "./../login/login";
import { ConfirmationPage } from "./../confirmation/confirmation";
import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { NoticeHandlerProvider } from "../../services/notice-handler/notice-handler";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the WatchlistDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-watchlist-details",
  templateUrl: "./watchlist-details.html",
  styleUrls: [""]
})
export class WatchlistDetailsPage {
  currentPrice: any | null;
  addWatchlist: any;

  constructor(
    private route: Router,
    private navParams: ActivatedRoute,
    private _http: DashboardProvider,
    private _spin: LoadingController,
    private _alert: NoticeHandlerProvider
  ) {
    this.currentPrice = this.navParams.snapshot.params.targetPrice;

    this.addWatchlist = {
      expiry: this.navParams.snapshot.params.expiry,
      targetPrice: this.navParams.snapshot.params.targetPrice,
      margin: this.navParams.snapshot.params.margin,
      symbol: this.navParams.snapshot.params.symbol
    };
  }

  ionViewDidLoad() {}

  async confirmAdd() {
    const loading = await this._spin.create({
      message: "Fetching your watchlists..."
    });
    await loading.present();
    this._http
      .addToWatchlist(this.addWatchlist)
      .then(
        response => {
          if (response.status == "success") {
            this.route.navigate(["ConfirmationPage"], {
              queryParams: {
                action: "add_watchlist",
                symbol: this.addWatchlist.symbol
              }
            });
            console.log(response.data);
          } else {
            this._alert.notifyError(response.message);
          }
        },
        error => {
          if (error.status == 400 || error.status == 500) {
            this._alert.notifyError(JSON.stringify(error.error));
          } else if (error.status == 401) {
            this._alert.notifyError("Session expired");
            this.route.navigateByUrl("/login");
          }
        }
      )
      .catch(reason => {
        console.log(reason);
        this._alert.notifyError("Something went wrong");
      });
  }
}
