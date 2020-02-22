import { ViewWatchlistDetailsPage } from "./../view-watchlist-details/view-watchlist-details";
import { LoginPage } from "./../login/login";
import { AddWatchlistPage } from "./../add-watchlist/add-watchlist";
import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";

/**
 * Generated class for the MyWatchlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-my-watchlist",
  templateUrl: "./my-watchlist.html",
  styleUrls: [""]
})
export class MyWatchlistPage implements OnInit, OnDestroy {
  public watchlists: any | null;

  constructor(
    private route: Router,
    private _http: DashboardProvider,
    private _alert: NoticeHandlerProvider,
    private _spin: LoadingController
  ) {
    this.getWatchList();
  }
  ngOnInit() {}
  ionViewDidLoad() {}

  viewWatchlistItem(watchlistId: string, index: number) {
    this.route.navigate(["ViewWatchlistDetailsPage"], {
      queryParams: {
        ...this.watchlists[index],
        watchlistIndex: index
      }
    });
  }
  async getWatchList() {
    const loading = await this._spin.create({
      message: "Fetching your watchlists..."
    });
    await loading.present();

    this._http
      .getWatchLists()
      .then(
        response => {
          if (response.status == "success") {
            this.watchlists = response.data;
          } else {
            this._alert.notifyError(response.message);
          }
        },
        error => {
          if (error.status == 401) {
            this.route.navigateByUrl("/login");
            this._alert.notifyError(
              "Invalid session<br> You must login again."
            );
          }
          if (error.status == 500) {
            this._alert.notifyError(
              "Server error. <br>Unable to get price at the moment."
            );
          }
        }
      )
      .catch(reason => {
        this._alert.notifyError("Something went wrong.");
      });
  }
  addWatchlist() {
    this.route.navigateByUrl("AddWatchlistPage");
  }
  ngOnDestroy() {
    // "watchlist:delete"
    // this._event.unsubscribe();
  }
}
