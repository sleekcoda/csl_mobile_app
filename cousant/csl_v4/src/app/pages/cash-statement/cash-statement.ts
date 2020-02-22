import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { DashboardProvider } from "./../../services/dashboard/dashboard";
import { WithdrawCashPage } from "./../withdraw-cash/withdraw-cash";
import { Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { DateFormatPipe } from "./date-format-pipe";
// import { DatePicker } from "@ionic-native/date-picker";
import { ActivatedRoute, Router } from "@angular/router";

/**
 * Generated class for the CashStatementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * `${this.customerId}/statements`
 */

@Component({
  selector: "page-cash-statement",
  templateUrl: "./cash-statement.html",
  styleUrls: ["./cash-statement.scss"],
  providers: [DateFormatPipe]
})
export class CashStatementPage {
  startDate: any;
  todayDate: any;
  endDate: any;
  accountStateObject: any | null;
  totalCurrentBalance: number;
  totalAvailableBalance: number;
  customerId: string;
  spinner: any;
  noTransaction = true;

  constructor(
    private _date: DateFormatPipe,
    private route: Router,
    private navParams: ActivatedRoute,
    // public _datePicker: DatePicker,
    private _dashboardProvider: DashboardProvider,
    private _spinner: LoadingController,
    private _alert: NoticeHandlerProvider
  ) {
    this.todayDate = new Date();

    this.totalAvailableBalance = this.navParams.snapshot.params.availableBalance;
    this.totalCurrentBalance = this.navParams.snapshot.params.currentBalance;
    this.customerId = this.navParams.snapshot.params.customerId;
  }

  ionViewDidLoad() {
    const today = new Date();
    this.startDate = this._date.transform(
      new Date(today.getFullYear(), today.getMonth() - 5, today.getDay()),
      "d-MMM-y"
    );
    this.endDate = this._date.transform(
      new Date(today.getFullYear(), today.getMonth() + 1, today.getDay()),
      "d-MMM-y"
    );
    this.getStatementRange();
  }
  withdrawCash() {
    this.route.navigateByUrl("WithdrawCashPage");
  }
  pickStart() {
    // this._datePicker
    //   .show({
    //     date: this.startDate,
    //     mode: "date",
    //     androidTheme: this._datePicker.ANDROID_THEMES
    //       .THEME_DEVICE_DEFAULT_LIGHT,
    //     maxDate: this.todayDate
    //   })
    //   .then(
    //     date => {
    //       this.startDate = this._date.transform(date, "dd-MMM-y");
    //     },
    //     err => {}
    //   );
  }

  pickEnd() {
    // this._datePicker
    //   .show({
    //     date: this.endDate,
    //     mode: "date",
    //     androidTheme: this._datePicker.ANDROID_THEMES
    //       .THEME_DEVICE_DEFAULT_LIGHT,
    //     maxDate: this.todayDate
    //   })
    //   .then(
    //     date => {
    //       this.endDate = this._date.transform(date, "dd-MMM-y");
    //     },
    //     err => {}
    //   );
  }

  getStatementRange() {
    this._spinner
      .create({
        message: "Retrieving account statement..."
      })
      .then(spin => spin.present());

    const body = {
      accountNum: this.navParams.snapshot.params.accountNumber,
      startDate: this.startDate,
      endDate: this.endDate
    };

    /**
     * Use customerId to get account Statement
     */

    this._dashboardProvider
      .getAccountStatement(`${this.customerId}/statements`, body)
      .then(
        response => {
          if (response.status == "success" && response.data.length > 0) {
            this.noTransaction = true;
            this.accountStateObject = response.data;
          } else {
            this._alert.notifyError(
              "No transactions occured within selected period"
            );
            this.noTransaction = false;
          }
        },
        error => {
          this.noTransaction = false;
          this._alert.notifyError(
            "Network error occured trying to get account update"
          );
        }
      )
      .catch(reason => {
        this._alert.notifyError(JSON.stringify(reason.error));

        this.noTransaction = false;
      });
    /**
     * Use customerId to get account Statement
     */
  }
}
