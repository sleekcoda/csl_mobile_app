import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayAtBankPage } from './pay-at-bank';

@NgModule({
  declarations: [
    PayAtBankPage,
  ],
  imports: [
    IonicPageModule.forChild(PayAtBankPage),
  ],
})
export class PayAtBankPageModule {}
