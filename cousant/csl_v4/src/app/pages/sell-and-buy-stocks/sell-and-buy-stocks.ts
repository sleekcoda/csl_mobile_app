import { LoginPage } from "./../login/login";
import { ConfirmBuyOrderPage } from "./../confirm-buy-order/confirm-buy-order";
import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { Component, Input } from "@angular/core";
import { LoadingController, ModalController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-sell-and-buy-stocks",
  templateUrl: "./sell-and-buy-stocks.html",
  styleUrls: [""]
})
export class SellAndBuyStocksPage {
  portfolio: any;
  availableQuantityForSell: number;
  today: any | null;
  maxYear: any | null;
  minDate: any;
  availableStocks: any | null;
  customerId: string | null;
  cscsNumber: string | null;
  currentPrice: any | null;
  dateValidated = true;
  cashAccountId: string | null;
  availableBalance: number | null;
  actions: string | null;
  stockValue: number | null;
  stockQuantity: number | null;
  companyName: string | null;
  preSelectedSymbol: string | null;
  portfolioArray = new Array();
  constructor(
    public _modalCtrl: ModalController,
    private route: Router,
    private navParams: ActivatedRoute,
    private _spin: LoadingController,
    private _http: DashboardProvider,
    private _alert: NoticeHandlerProvider
  ) {
    this.setupPortfolio();
    this.today = new Date();
    this.maxYear = this.today.getFullYear() + 5;
    this.minDate =
      this.today.getFullYear() +
      "-" +
      (this.today.getMonth() + 1) +
      "-" +
      this.today.getDate();

    this.stockDetails.price = this.currentPrice;
    this.stockDetails.expires = this.minDate;

    this.actions = this.navParams.snapshot.params.action;
    this.preSelectedSymbol = this.navParams.snapshot.params.symbol;
  }

  @Input() stockDetails: any = {
    cscsno: "",
    symbol: "",
    quantity: 1,
    ordertype: "00",
    pricetype: "00",
    price: 0,
    expires: "",
    reference: "",
    portfolioDesc: ""
  };

  ionViewDidLoad() {}
  async setupPortfolio() {
    const portfolios = Object.values(localStorage.getItem("portfolio"));
    portfolios.forEach(portfolioarr => {
      portfolioarr.map(e => {
        this.portfolioArray.push(e);
      }); // #map function

      if (this.actions === "sell") {
        this.getPorfolioInvestments(
          this.portfolioArray[0].customerId,
          this.portfolioArray[0].marketAccountId
        );
      } // #if user want's to sell stock
      if (this.actions === "buy") {
        this.getStock(
          this.portfolioArray[0].customerId,
          this.portfolioArray[0].marketAccountId
        );
      } // #if user want's to buy stock

      // Set default portfolio from dropdown
      this.selectPorfolioInvestments(0);
    }); // #get portfolios from memory
  }

  getPorfolioInvestments(customerId: string, cscsNumber: string) {
    this._http.getPorfolioInvestments(customerId, cscsNumber).then(
      response => {
        if (response.item1 == 200) {
          if (response.item3 != null) {
            this.availableStocks = response.item3;
            // Set default stock symbol
            this.stockDetails.symbol = response.item3[0].symbol;
            // Set default maximum quantity available for sale
            this.availableQuantityForSell = response.item3[0].quantity;
            // Set current price of stock
            this.getPrice(response.item3[0].symbol);
          } else {
            this._alert.notifyError(JSON.stringify("You have no investment"));
          }
        } else {
          this._alert.notifyError(JSON.stringify(response.item2));
        }
      },
      error => {
        this._alert.notifyError(JSON.stringify(error.error));
      }
    );
  }

  setAvailableStockQuantity(symbol: string) {
    this.getPrice(symbol);
    for (const i in this.availableStocks) {
      if (this.availableStocks[i].symbol == symbol) {
        //
        this.availableQuantityForSell = this.availableStocks[i].quantity;
        // Change stock symbol
        this.stockDetails.symbol = this.availableStocks[i].symbol;
      }
    }
  }
  selectPorfolioInvestments(i: number) {
    if (this.actions == "sell") {
      // Get a new list of investment for selected portfolio
      this.getPorfolioInvestments(
        this.portfolioArray[i].customerId,
        this.portfolioArray[i].marketAccountId
      );
    } else {
      this.stockDetails.symbol = null;
      this.currentPrice = null;
      // Get the list of stocks available for users to trade
      this.getStock(
        this.portfolioArray[i].customerId,
        this.portfolioArray[i].marketAccountId
      );
    }
    this.cscsNumber = this.portfolioArray[i].marketAccountId;
    this.cashAccountStatement(this.portfolioArray[i].cashAccountId);

    this.stockDetails.portfolioDesc = this.portfolioArray[
      i
    ].portfolioDescription;
    this.stockDetails.cscsno = this.portfolioArray[i].marketAccountId;
  }

  confirmOrder() {
    if (this.stockDetails.ordertype == "00") {
      this.stockDetails.expires = this.minDate;
    }
    if (this.stockDetails.pricetype == "00") {
      this.stockDetails.price = this.currentPrice;
    }

    if (this.actions == "buy") {
      this.stockDetails.actions = "buy";
      this.stockDetails.reference = Date.now();

      this.route.navigate([""], { queryParams: this.stockDetails });
    } else if (this.actions == "sell") {
      this.stockDetails.actions = "sell";
      this.stockDetails.reference = Date.now();

      this.route.navigate(["ConfirmBuyOrderPage"], {
        queryParams: this.stockDetails
      });
    }
  }

  sellStock() {
    this._alert.notifyMessage("Sell stocks");
  }
  buyStocks() {}

  async getStock(customerId, cscsNumber) {
    const loading = await this._spin.create({
      message: "Fetching available stocks'..."
    });
    await loading.present();

    const path =
      this.actions == "sell"
        ? `portfolios/${customerId}/investments/${cscsNumber}`
        : `stocks/${cscsNumber}`;

    this._http
      .plainGetRequest(path)
      .then(
        response => {
          if (response.status == "success") {
            /**
             * Set the minimum and maximum date for Good till date order type
             */
            this.today = new Date();
            this.maxYear = this.today.getFullYear() + 5;
            this.minDate =
              this.today.getFullYear().toString() +
              "-" +
              (this.today.getMonth() + 1).toString() +
              "-" +
              this.today.getDate().toString();
            this.availableStocks = response.data;
            /**
             *
             * Get default stock symbol by selecting the first stock from list of dropdown
             * Set default value for current price and curresponding symbol
             *
             */

            // set default stock price from previous page or from this list of stocks (response.data)
            const selectedStock =
              this.preSelectedSymbol != null
                ? this.preSelectedSymbol
                : response.data[0].symbol;

            this.stockDetails.symbol = selectedStock;
            // get current price of stock (selectedStock)
            this.getPrice(selectedStock);

            this.stockDetails.ordertype = "00";
            this.stockDetails.pricetype = "00";
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
          } else if (error.status == 500) {
            this._alert.notifyError("Server is currently unreachable <br><br>");
          }
        }
      )
      .catch(reason => {
        this._alert.notifyError("Something went wrong");
      });
  }

  getPrice(symbol: string) {
    this._http
      .plainGetRequest(`stockprices/${symbol}`)
      .then(
        response => {
          if (response.status === "success") {
            this.currentPrice = response.data.currentPrice;
            this.stockDetails.price = response.data.currentPrice;
            this.dateValidated = true;
          } else {
            this._alert.notifyError(
              "Unable to retreive current stock price at the moment"
            );
          }
        },
        error => {
          if (error.status === 401) {
            this.route.navigateByUrl("/login");
            this._alert.notifyError(
              "Invalid session.<br><br>You must login again."
            );
            this.dateValidated = false;
          }
          if (error.status == 500) {
            // this._alert.notifyError('Server error.<br><br>Unable to get price at the moment.');
            this.dateValidated = false;
          }
        }
      )
      .catch(reason => {
        this._alert.notifyError("Something went wrong");
      });
  }

  validateDate() {
    setTimeout(() => {
      const today = new Date(this.minDate).getTime();
      const dateDifference =
        new Date(this.stockDetails.expires).getTime() - today;

      if (dateDifference < 0) {
        this.dateValidated = false;
      } else {
        this.dateValidated = true;
      }
    }, 500);
  }

  cashAccountStatement(cashAccountId: string) {
    this._http
      .plainGetRequest(`cashaccounts/${cashAccountId}/balance/`)
      .then(
        response => {
          if (response.status == "success") {
            this.availableBalance = response.data.availableBalance;
          } else {
            this.availableBalance = 0;
            this._alert.notifyError("Failed to get your account balance");
          }
        },
        error => {
          this.availableBalance = 0;
          if (error.status == "401") {
            this.route.navigateByUrl("/login");
            this._alert.notifyError("Session expired");
          } else {
            this._alert.notifyError(
              JSON.stringify(
                error.message + "<br><br>Failed to get your account balance"
              )
            );
          }
        }
      )
      .catch(reason => {
        this._alert.notifyError(JSON.stringify(reason.error));
      });
  }
}
