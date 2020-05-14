import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCashAccountPage } from './select-cash-account';

@NgModule({
  declarations: [
    SelectCashAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectCashAccountPage),
  ],
})
export class SelectCashAccountPageModule {}
