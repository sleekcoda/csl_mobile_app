import { DashboardPage } from "./../dashboard/dashboard";
import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { RequestLoginPage } from "./../request-login/request-login";
import { Component, Output } from "@angular/core";
import { LoadingController, MenuController } from "@ionic/angular";
import { DashboardProvider } from "../../services/dashboard/dashboard";
import { RequestResponse } from "../../services/authentication/auth.model";
import { EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-login",
  templateUrl: "./login.html",
  styleUrls: [""]
})
export class LoginPage {
  emailOrCscs: string;
  password: string;
  errorText: string;
  @Output() _events = new EventEmitter<{ type: string; value: any }>();
  constructor(
    public menu: MenuController,
    public route: Router,
    private _alert: NoticeHandlerProvider,
    private _http: DashboardProvider,
    private _spinner: LoadingController
  ) {}

  ionViewDidLoad() {
    if (!localStorage.getItem("login_username")) {
      this.emailOrCscs = localStorage.getItem("login_username");
    }
  }
  ionViewWillLeave() {
    this._events.unsubscribe();

    // If you have more than one side menu, use the id like below
  }

  authenticate() {
    this._spinner
      .create({
        message: "Verifying credentials"
      })
      .then(spin => spin.present());

    this._http
      .makePostRequest("Auth/Token", {
        emailOrCscs: this.emailOrCscs,
        password: this.password
      })
      .then(
        response => {
          const resquestResponse: any = response as RequestResponse;
          /**
           * Store tokenId and customerId as csl_login in cache
           *
           * Then navigate to the dashboard page
           */
          this._events.emit({
            type: "app:userAuthenticateToken",
            value: {
              emailOrCscs: this.emailOrCscs,
              token: resquestResponse.token
            }
          });

          localStorage.setItem("login_username", this.emailOrCscs);
          this.route.navigate(["DashboardPage"], {
            queryParams: {
              login: true,
              emailOrCscs: this.emailOrCscs
            }
          });
        },
        error => {
          this._events.emit({
            type: "app:userAuthenticateError",
            value: "Invalid customer Id or password"
          });
        }
      )
      .catch(reason => {
        this._alert.notifyError(JSON.stringify(reason.error));
      });
    this._events.subscribe("app:userAuthenticateError", errorMessage => {
      this.errorText = errorMessage;
    });
  }

  pushRequestLogin(param) {
    this.route.navigate(["RequestLoginPage"], {
      queryParams: {
        action: param
      }
    });
  }
}
