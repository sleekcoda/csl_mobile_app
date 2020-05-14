import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundAccountPage } from './fund-account';

@NgModule({
  declarations: [
    FundAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(FundAccountPage),
  ],
})
export class FundAccountPageModule {}
