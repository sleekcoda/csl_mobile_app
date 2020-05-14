import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
/**
 * Generated class for the ConfirmCardDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-card-details',
  templateUrl: 'confirm-card-details.html',
})
export class ConfirmCardDetailsPage {
  chargeDataGlobal: any = { 
    PBFPubKey:'' 
  };
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }
  // this is the getKey function that generates an encryption Key for you by passing your Secret Key as a parameter.
  getKey(seckey){}


getPublicKey(){}


}
