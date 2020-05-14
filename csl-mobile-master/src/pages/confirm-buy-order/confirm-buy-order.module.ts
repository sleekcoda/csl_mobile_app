import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmBuyOrderPage } from './confirm-buy-order';

@NgModule({
  declarations: [
    ConfirmBuyOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmBuyOrderPage),
  ],
})
export class ConfirmBuyOrderPageModule {}
