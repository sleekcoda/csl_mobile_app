import { NoticeHandlerProvider } from "./../../services/notice-handler/notice-handler";
import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

/**
 * Generated class for the PayAtBankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-pay-at-bank",
  templateUrl: "./pay-at-bank.html",
  styleUrls: [""]
})
export class PayAtBankPage {
  public portfolios: any | undefined | null;
  constructor() {
    this.portfolios = localStorage.getItem("portfolio");
  }

  ionViewDidLoad() {}
}
