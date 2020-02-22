import {
  RequestResponse,
  RequestResponseError
} from "./../../services/authentication/auth.model";
import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { DashboardProvider } from "../../services/dashboard/dashboard";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the OptValidationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-opt-validation",
  templateUrl: "./opt-validation.html",
  styleUrls: ["./opt-validation.scss"]
})
export class OptValidationPage {
  otpCode: string;
  tokenId: string;
  otpMessage: string;
  accountId: string;
  action: string | undefined;
  loading: any;
  requestError: RequestResponseError;
  requestResponse: RequestResponse;

  constructor(
    private route: Router,
    private navParams: ActivatedRoute,
    private notifier: NoticeHandlerProvider,
    private _http: DashboardProvider,
    private _loading: LoadingController
  ) {
    this.loading = this._loading.create({
      message: "Validating OTP..."
    });
    this.accountId = this.navParams.snapshot.params.accountId;
    this.action = this.navParams.snapshot.params.action;
    this.tokenId = this.navParams.snapshot.params.tokenId;
    this.otpMessage = this.navParams.snapshot.params.message;
    // `Please enter the code sent to ${this.navParams.snapshot.params.('phone')}
    // and ${this.navParams.snapshot.params.('email')}` : this.navParams.snapshot.params.('message') ;
  }

  ionViewDidLoad() {}
  confirmOtp() {
    this.loading.present();
    const resetPayload = {
      otpCode: `${this.otpCode}`,
      emailOrCustomerId: `${this.accountId}`,
      otpId: this.tokenId
    };
    const requestPayload = {
      accountId: this.accountId,
      token: this.otpCode,
      tokenId: this.tokenId
    };
    const path =
      this.action == "reset_password"
        ? `users/reset/request/validate`
        : `customer/${this.accountId}/loginRequest/validateOtp`;
    const payload =
      this.action == "reset_password" ? resetPayload : requestPayload;
    this._http
      .makePostRequest(path, payload)
      .then(
        response => {
          this.requestResponse = response as RequestResponse;

          if (this.requestResponse.status == "success") {
            if (this.action == "reset_password") {
              this.route.navigate(["SetPasswordPage"], {
                queryParams: {
                  resetToken: this.requestResponse.data.resetToken,
                  emailOrCustomerId: this.accountId,
                  action: this.action
                }
              });
            } else if (this.action == "set_password") {
              this.route.navigate(["SetPasswordPage"], {
                queryParams: {
                  userId: this.requestResponse.data.userId,
                  resetToken: this.requestResponse.data.token,
                  action: this.action
                }
              });
            }
          } else if (this.requestResponse.status == "Failed") {
            this.notifier.notifyError(
              JSON.stringify(this.requestResponse.message)
            );
          }
        },
        error => {
          this.requestError = error as RequestResponseError;
          this.notifier.notifyError(JSON.stringify(this.requestError.error));
        }
      )
      .catch(reason => {
        this.notifier.notifyError(JSON.stringify(reason.error));
      });
  }
  resendOtp() {}
  doSetPassword() {}
  doResetPassword() {}
}
