import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
// import * as Ravepay from "ravepay";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the CardOtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-card-otp",
  templateUrl: "./card-otp.html",
  styleUrls: ["./card-otp.scss"]
})
export class CardOtpPage implements OnInit {
  // tslint:disable-next-line: variable-name
  OTPCode: string;
  private createFundResponse;
  constructor(
    private route: Router,
    private navParams: ActivatedRoute,
    public _alert: NoticeHandlerProvider,
    private _http: DashboardProvider,
    private _spin: LoadingController
  ) {}

  ionViewDidLoad() {
    this.createFund();
  }
  ngOnInit() {}
  get OTPMessage() {
    return `${this.navParams.snapshot.params.otpMessage}`;
  }
  get rave() {
    return {};
  }
  get grossAmount() {
    return (
      this.navParams.snapshot.params.amount +
      this.navParams.snapshot.params.appfee
    );
  }
  get appFee() {
    return this.navParams.snapshot.params.appfee;
  }
  get amount() {
    return this.navParams.snapshot.params.amount;
  }
  get accountNumber() {
    return this.navParams.snapshot.params.accountNumber;
  }

  async createFund() {
    const loading = await this._spin.create({ message: "" });
    await loading.present();
    const reqBody = {
      accountNumber: this.navParams.snapshot.params.accountNumber,
      grossAmount: this.grossAmount,
      fee: this.navParams.snapshot.params.appfee,
      transactionReference: this.navParams.snapshot.params.ref
    };
    this._http
      .makePostRequest("fundingRequest/create", reqBody)
      .then(
        resp => {
          if (resp.status == "success") {
            this.createFundResponse = resp.data;
          } else {
            this._alert.notifyError(JSON.stringify(resp.message));
          }
        },
        err => {
          this._alert.notifyError(JSON.stringify(err.statusText));
        }
      )
      .catch();
  }
  get requestId() {
    return this.createFundResponse.requestId;
  }
  async confirmFund(requestId, gateResponse, debitStatus: boolean) {
    const loading = await this._spin.create({ message: "" });
    await loading.present();
    const payload = {
      requestId,
      debitStatus,
      paymentGatewayResponseMsg: gateResponse
    };
    this._http
      .makePostRequest(`fundingRequest/${requestId}`, payload)
      .then(
        resp => {
          if (resp.status == "success") {
            debitStatus === true
              ? this.route.navigate(["ConfirmationPage"], {
                  queryParams: {
                    action: "fund",
                    reference: this.navParams.snapshot.params.ref
                  }
                })
              : null;
          } else {
            this._alert.notifyError(JSON.stringify(resp.message));
          }
        },
        err => {
          this._alert.notifyError(JSON.stringify(err.error));
        }
      )
      .catch(err => {
        this._alert.notifyError(JSON.stringify(err.error));
      });
  }
  confirmOTP() {
    const payload = {
      PBFPubKey: this.navParams.snapshot.params.pk,
      transaction_reference: this.navParams.snapshot.params.ref,
      otp: this.OTPCode
    };
    if (this.OTPCode) {
      console.log(payload);
      //   this.rave.Card.validate(payload)
      //     .then(
      //       response => {
      //         if (response.body.status == "success") {
      //           this.confirmFund(this.requestId, response.body.message, true);
      //         } else {
      //           this._alert.notifyError(JSON.stringify(response.body.message));
      //           this.confirmFund(this.requestId, response.body.message, false);
      //         }
      //       },
      //       err => {
      //         this._alert.notifyError(err.statusText);
      //         console.log(err);
      //       }
      //     )
      //     .catch(err => {
      //       this.confirmFund(this.requestId, err.statusText, false);
      //       this._alert.notifyError(JSON.stringify(err.message));
      //     });
    }
  }
}
