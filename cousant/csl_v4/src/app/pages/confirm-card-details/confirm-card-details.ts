import { Component } from "@angular/core";
/**
 * Generated class for the ConfirmCardDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: "page-confirm-card-details",
  templateUrl: "./confirm-card-details.html",
  styleUrls: [""]
})
export class ConfirmCardDetailsPage {
  chargeDataGlobal: any = {
    PBFPubKey: ""
  };

  constructor() {}

  ionViewDidLoad() {}
  // this is the getKey function that generates an encryption Key for you by passing your Secret Key as a parameter.
  getKey(seckey) {}

  getPublicKey() {}
}
