import { LoginPage } from "./../login/login";
import { ConfirmBuyOrderPage } from "./../confirm-buy-order/confirm-buy-order";
import { NoticeHandlerProvider } from "./../../providers/notice-handler/notice-handler";
import { DashboardProvider } from "./../../providers/dashboard/dashboard";
import { Component, Input } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ModalController
} from "ionic-angular";
/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-orders",
  templateUrl: "orders.html"
})
export class OrdersPage {
  portfolioDesc: string;
  marketAccId: string;
  today: any | null;
  maxYear: any | null;
  minDate: any;
  availableStocks: string | null;
  currentPrice: any | null;
  dateValidated: boolean = true;

  constructor(
    public _modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private _spin: LoadingController,
    private _http: DashboardProvider,
    private _alert: NoticeHandlerProvider
  ) {
    this.portfolioDesc = this.navParams.get("portfolioDesc");
    this.marketAccId = this.navParams.get("marketAccId");

    this.today = new Date();
    this.maxYear = this.today.getFullYear() + 5;
    this.minDate =
      this.today.getFullYear() +
      "-" +
      (this.today.getMonth() + 1) +
      "-" +
      this.today.getDate();

    this.getStock();
  }
  @Input() buyStock: any = {
    cscsno: this.navParams.get("marketAccId"),
    market_account_Id: this.navParams.get("marketAccId"),
    symbol: "",
    quantity: 1,
    ordertype: "",
    pricetype: "",
    price: this.currentPrice,
    expires: this.minDate,
    reference: "",
    portfolioDesc: this.navParams.get("portfolioDesc")
  };
  ionViewDidLoad() {}

  confirmOrder() {
    if (this.buyStock.ordertype == "00") {
      this.buyStock.expires = this.minDate;
    }
    if (this.buyStock.pricetype == "00") {
      this.buyStock.price = this.currentPrice;
      console.log(this.currentPrice);
      console.log(this.buyStock.price);
    }
    this.buyStock.reference =
      this.buyStock.cscsno +
      " Order " +
      this.buyStock.symbol +
      " @ " +
      new Date().toISOString();

    console.log("body ", this.buyStock);
    this.navCtrl.push(ConfirmBuyOrderPage, this.buyStock);
  }

  getStock() {
    let loading = this._spin.create({
      content: "Fetching available stocks'...",
      spinner: ""
    });
    loading.present();

    this._http
      .plainGetRequest("stockprices")
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
            console.log(
              "maxYearb--\n",
              this.maxYear,
              "minDateb--\n",
              this.minDate
            );
            this.availableStocks = response.data;
            /**
             * Set default value for current price and curresponding symbol
             */
            this.currentPrice = response.data[0].currentPrice;
            this.buyStock.symbol = response.data[0].symbol;

            this.buyStock.ordertype = "00";
            this.buyStock.pricetype = "00";
          } else {
            this._alert.notifyError(response.message);
          }
          loading.dismiss();
        },
        error => {
          if (error.status == 401) {
            this.navCtrl.setRoot(LoginPage);
            this._alert.notifyError(
              "Invalid session<br><br>You must login again."
            );
          }
          console.log(error);
          loading.dismiss();
        }
      )
      .catch(reason => {
        console.log(reason);
        this._alert.notifyError("Something went wrong");
      });
  }

  changeSymbol(symbol: string) {
    this._http
      .plainGetRequest(`stockprices/${symbol}`)
      .then(
        response => {
          if (response.status == "success") {
            this.currentPrice = response.data.currentPrice;
            this.buyStock.price = response.data.currentPrice;
            console.log(this.currentPrice);
            this.dateValidated = true;
          } else {
            this._alert.notifyError(
              "Unable to retreive current stock price at the moment"
            );
          }
        },
        error => {
          if (error.status == 401) {
            this.navCtrl.setRoot(LoginPage);
            this._alert.notifyError(
              "Invalid session.<br><br>You must login again."
            );
            this.dateValidated = false;
          }
          if (error.status == 500) {
            this._alert.notifyError(
              "Server error.<br><br>Unable to get price at the moment."
            );
            this.dateValidated = false;
          }
          console.log(error);
        }
      )
      .catch(reason => {
        console.log(reason);
        this._alert.notifyError("Something went wrong");
      });
  }

  validateDate() {
    setTimeout(() => {
      console.log(this.buyStock.expires);
      console.log(this.minDate);
      let today = new Date(this.minDate).getTime();
      let dateDifference = new Date(this.buyStock.expires).getTime() - today;

      if (dateDifference < 0) {
        this.dateValidated = false;
      } else {
        this.dateValidated = true;
      }
      console.log(dateDifference);
    }, 500);
  }
}
