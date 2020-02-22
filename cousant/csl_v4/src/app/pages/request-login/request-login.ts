import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import {
  RequestResponse,
  RequestResponseError
} from "./../../services/authentication/auth.model";
import { DashboardProvider } from "../../services/dashboard/dashboard";
import { Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the RequestLoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-request-login",
  templateUrl: "./request-login.html",
  styleUrls: ["./request-login.scss"],
  providers: [DashboardProvider]
})
export class RequestLoginPage {
  cscsNumber: string;
  requestError: RequestResponseError;
  requestResponse: RequestResponse;
  nextAction: string;
  requestPath: string;
  action: string;
  constructor(
    private route: Router,
    private navParams: ActivatedRoute,
    public _http: DashboardProvider,
    private _loading: LoadingController,
    private notifier: NoticeHandlerProvider
  ) {
    this.action = this.navParams.snapshot.params.action;
  }

  ionViewDidLoad() {}
  onRequestlogin(): void {
    if (this.action == "set_password") {
      this.doRequestLogin();
    } else if (this.action == "reset_password") {
      this.doResetPassword();
    }
  }
  validateCustomerByOtp() {}

  doRequestLogin() {
    // api/users/reset/request
    this._http
      .requestCustomerLogin(this.cscsNumber)
      .then(
        response => {
          this.requestResponse = response as RequestResponse;
          if (this.requestResponse.status == "Failed") {
            this.notifier.notifyError(this.requestResponse.message);
          } else if (this.requestResponse.status == "success") {
            this.notifier.notifyMessage(
              JSON.stringify(this.requestResponse.data)
            );
            this.route.navigate(["OptValidationPage"], {
              queryParams: {
                email: this.requestResponse.data.email,
                phone: this.requestResponse.data.phone,
                accountId: this.cscsNumber,
                tokenId: this.requestResponse.data.tokenId,
                action: this.action,
                message: this.requestResponse.message
              }
            });
          }
        },
        error => {
          this.requestError = error as RequestResponseError;
          this.notifier.notifyError(this.requestError.error);
        }
      )
      .catch(reason => {
        this.notifier.notifyError(JSON.stringify(reason.error));
      });
  }
  async doResetPassword() {
    const loading = await this._loading.create({ message: "" });
    await loading.present();
    // api/users/reset/request

    this._http
      .makePostRequest(`users/reset/request`, {
        emailOrCustomerNumber: this.cscsNumber
      })
      .then(
        response => {
          this.requestResponse = response as RequestResponse;
          if (this.requestResponse.status == "Failed") {
            this.notifier.notifyError(this.requestResponse.message);
          } else if (this.requestResponse.status == "success") {
            this.route.navigate(["OptValidationPage"], {
              queryParams: {
                message: this.requestResponse.message,
                accountId: this.cscsNumber,
                tokenId: this.requestResponse.data.tokenId,
                action: this.action
              }
            });
            // console.log(this.requestResponse)
          }
        },
        error => {
          this.requestError = error as RequestResponseError;
          this.notifier.notifyError(this.requestError.error);
        }
      );
  }
}
