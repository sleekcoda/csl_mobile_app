// import { ConfirmationPage } from "./../confirmation/confirmation";
import { DateFormatPipe } from "./../cash-statement/date-format-pipe";
// import { DatePicker } from "@ionic-native/date-picker";
// import { LoginPage } from "./../login/login";
import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the ConfirmBuyOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-confirm-buy-order",
  templateUrl: "./confirm-buy-order.html",
  styleUrls: ["./confirm-buy-order.scss"],
  providers: [DateFormatPipe]
})
export class ConfirmBuyOrderPage implements OnInit {
  order: any;
  portfolioDesc: string;
  actions: string;
  constructor(
    private _datePipe: DateFormatPipe,
    private route: Router,
    private navParams: ActivatedRoute,
    private _spin: LoadingController,
    private _alert: NoticeHandlerProvider,
    private _http: DashboardProvider
  ) {
    this.order = this.navParams.data;
    this.actions = this.navParams.snapshot.params.actions;
  }

  ionViewDidLoad() {
    this.portfolioDesc = this.navParams.snapshot.params.portfolioDesc;
  }
  ngOnInit() {
    this.portfolioDesc = this.navParams.snapshot.params.portfolioDesc;
  }
  buyStock() {
    let body: any = {};

    body.order = [
      {
        cscsno: this.navParams.snapshot.params.cscsno,
        expires: this._datePipe.transform(
          this.navParams.snapshot.params.expires,
          "d-MMM-y"
        ),
        ordertype: this.navParams.snapshot.params.ordertype,
        price: this.navParams.snapshot.params.price,
        pricetype: this.navParams.snapshot.params.pricetype,
        quantity: this.navParams.snapshot.params.quantity,
        reference: this.navParams.snapshot.params.reference,
        symbol: this.navParams.snapshot.params.symbol
      }
    ];

    this._spin
      .create({ message: "Placing order..." })
      .then(spin => spin.present());
    this._http
      .buyStock(body)
      .then(
        response => {
          // this._alert.notifyMessage(JSON.stringify(response));
          if (
            response.status === "success" &&
            response.data &&
            response.data.status == "success"
          ) {
            this.route.navigate(["ConfirmationPage"], {
              queryParams: {
                reference: this.navParams.snapshot.params.reference,
                action: "buy_stock"
              }
            });
          } else {
            this._alert.notifyError(
              JSON.stringify(response.data.result[0].remarks) +
                "<br>" +
                JSON.stringify(response.data.result[0].reference) +
                "<br><br>Try again later."
            );
          }
          console.log(response);
        },
        error => {
          // this._alert.notifyMessage(JSON.stringify(error));
          if (error.status == 401) {
            this.route.navigateByUrl("/login");
            this._alert.notifyError(
              "Invalid session<br><br>You must login again."
            );
          } else if (error.status == 500) {
            this._alert.notifyError(
              "Server error.<br><br>Unable to place order at the moment please check back later."
            );
          } else {
            this._alert.notifyError(JSON.stringify(error.error));
          }
          console.log(error);
        }
      )
      .catch(reason => {
        console.log(reason);
      });
  }
  sellStock() {
    let body: any = {};

    body.order = [
      {
        cscsno: this.navParams.snapshot.params.cscsno,
        expires: this._datePipe.transform(
          this.navParams.snapshot.params.expires,
          "d-MMM-y"
        ),
        ordertype: this.navParams.snapshot.params.ordertype,
        price: this.navParams.snapshot.params.price,
        pricetype: this.navParams.snapshot.params.pricetype,
        quantity: this.navParams.snapshot.params.quantity,
        reference: this.navParams.snapshot.params.reference,
        symbol: this.navParams.snapshot.params.symbol
      }
    ];

    this._spin
      .create({ message: "Placing order..." })
      .then(spin => spin.present());
    this._http
      .sellStock(body)
      .then(
        response => {
          // this._alert.notifyMessage(JSON.stringify(response));

          if (
            response.data &&
            response.data.status == "success" &&
            response.status == "success"
          ) {
            this.route.navigate(["ConfirmationPage"], {
              queryParams: {
                reference: this.navParams.snapshot.params.reference,
                action: "buy_stock"
              }
            });
          } else {
            this._alert.notifyError(
              JSON.stringify(response.data.result[0].remarks) +
                "<br>" +
                JSON.stringify(response.data.result[0].reference) +
                "<br><br>Try again later."
            );
          }
        },
        error => {
          // this._alert.notifyMessage(JSON.stringify(error));
          if (error.status == 401) {
            this.route.navigateByUrl("/login");
            this._alert.notifyError(
              "Invalid session<br><br>You must login again."
            );
          } else if (error.status == 500) {
            this._alert.notifyError(
              "Server error.<br><br>Unable to place order at the moment please check back later."
            );
          } else {
            this._alert.notifyError(JSON.stringify(error.error));
          }
        }
      )
      .catch(reason => {
        console.log(reason);
      });
  }
}
