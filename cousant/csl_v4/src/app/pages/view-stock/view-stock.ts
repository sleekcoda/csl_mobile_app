import { SellAndBuyStocksPage } from "./../sell-and-buy-stocks/sell-and-buy-stocks";
import { AddWatchlistPage } from "./../add-watchlist/add-watchlist";
import { LoginPage } from "./../login/login";
import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@ionic/angular";
import { Router } from "@angular/router";

/**
 * Generated class for the ViewStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-view-stock",
  templateUrl: "./view-stock.html",
  styleUrls: [""]
})
export class ViewStockPage implements OnInit {
  symbol: string;
  stockName: string;
  bids: any | null;
  offers: any | null;
  offersError: string;
  bidsError: string;

  stockData: any = {};
  constructor(
    private route: Router,
    private navParams: ActivatedRoute,
    private _http: DashboardProvider,
    private _notice: NoticeHandlerProvider
  ) {
    this.symbol = this.navParams.snapshot.params.symbol;
    this.stockName = this.navParams.snapshot.params.stockName;

    this.getStockDetails();
    this.getBids(this.symbol);
    this.getOffers(this.symbol);
  }

  ionViewDidLoad() {}
  ngOnInit() {
    setTimeout(() => {
      this.getStockDetails();
    }, 5000);
  }
  getStockDetails() {
    this._http
      .plainGetRequest(`stockprices/${this.symbol}`)
      .then(
        response => {
          if (response.status == "success") {
            this.stockData = response.data;
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
        this._notice.notifyError(JSON.stringify(reason.error));
      });
  }

  getBids(symbol: string) {
    this._http
      .plainGetRequest(`stockprices/${symbol}/topbids`)
      .then(
        response => {
          if (response.status == "success") {
            this.bids = response.data;
          } else {
            this._notice.notifyError(
              "Unable to connect with server <br>" +
                JSON.stringify(response.message)
            );
          }
        },
        error => {
          if (error.status == 500) {
            this.bidsError = "No bids available for ";
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
        this._notice.notifyError(JSON.stringify(reason.error));
      });
  }
  getOffers(symbol: string) {
    this._http
      .plainGetRequest(`stockprices/${symbol}/topoffers`)
      .then(
        response => {
          if (response.status == "success") {
            this.offers = response.data;
            this.offers = this.offers.sort((a, b) =>
              a.OFFER_PRICE < b.OFFER_PRICE
                ? 1
                : b.OFFER_PRICE < a.OFFER_PRICE
                ? -1
                : 0
            );
          } else {
            this._notice.notifyError(
              "Unable to connect with server <br>" +
                JSON.stringify(response.message)
            );
          }
        },
        error => {
          if (error.status == 500) {
            this.offersError = "No offers available for ";
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
        this._notice.notifyError(JSON.stringify(reason.error));
      });
  }
  addToWatchlist() {
    this.route.navigateByUrl(AddWatchlistPage, { symbol: this.symbol });
  }
  buyStock() {
    this.route.navigateByUrl(SellAndBuyStocksPage, {
      action: "buy",
      symbol: this.symbol
    });
  }
}
