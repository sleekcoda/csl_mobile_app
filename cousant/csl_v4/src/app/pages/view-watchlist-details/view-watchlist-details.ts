import { MyWatchlistPage } from "./../my-watchlist/my-watchlist";
import { LoginPage } from "./../login/login";
import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the ViewWatchlistDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-view-watchlist-details",
  templateUrl: "./view-watchlist-details.html",
  styleUrls: [""]
})
export class ViewWatchlistDetailsPage implements OnInit {
  watchlist: any;
  currentPrice: any;
  constructor(
    private confirm: AlertController,
    private route: Router,
    private _alert: NoticeHandlerProvider,
    private navParams: ActivatedRoute,
    private _spin: LoadingController,
    private _http: DashboardProvider
  ) {
    this.watchlist = this.navParams.data;
    this.currentPrice = "unavailable";
  }

  ionViewDidLoad() {
    this.watchlist = this.navParams.data;
  }
  ngOnInit() {
    this.getCurrentPrice();
  }

  delete() {
    this.confirm
      .create({
        header: "",
        message:
          "Are you sure you want to remove " +
          this.watchlist.symbol +
          " from your watchlist?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {}
          },
          {
            text: "Yes",
            handler: () => {
              this._spin
                .create({
                  message: "Deleting please wait..."
                })
                .then(spin => spin.present());
              this._http
                .plainGetRequest(`watchlist/${this.watchlist.symbol}/delete`)
                .then(
                  response => {
                    if (response.status == "success") {
                      this._alert.notifyMessage(
                        this.watchlist.symbol +
                          " has been deleted from your watchlist."
                      );
                      this.route.navigateByUrl("MyWatchlistPage");
                    } else {
                      this._alert.notifyError(JSON.stringify(response.message));
                    }
                  },
                  error => {
                    if (error.status == 400 || error.status == 500) {
                      this._alert.notifyError(
                        JSON.stringify(error.error) +
                          "<br> Unable to get the current price for " +
                          this.watchlist.symbol
                      );
                    } else if (error.status == 401) {
                      this._alert.notifyError("Session expired");
                    }
                  }
                )
                .catch(reason => {
                  this._alert.notifyError(reason.error);
                });
            }
          }
        ]
      })
      .then(el => el.present());
  }
  getCurrentPrice() {
    this._http
      .plainGetRequest(`stockprices/${this.watchlist.symbol}`)
      .then(
        response => {
          if (response.status == "success") {
            this.currentPrice = response.data.currentPrice;
          } else {
            this._alert.notifyError(JSON.stringify(response.message));
          }
        },
        error => {
          if (error.status == 400 || error.status == 500) {
            this._alert.notifyError(
              JSON.stringify(error.error) +
                "<br> Unable to get the current price for " +
                this.watchlist.symbol
            );
          } else if (error.status == 401) {
            this._alert.notifyError("Session expired");
            this.route.navigateByUrl("/login");
          }
        }
      )
      .catch(reason => {
        console.log(reason);
      });
  }
  close() {}
}
