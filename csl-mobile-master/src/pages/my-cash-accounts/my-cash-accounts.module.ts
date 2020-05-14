import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCashAccountsPage } from './my-cash-accounts';

@NgModule({
  declarations: [
    MyCashAccountsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCashAccountsPage),
  ],
})
export class MyCashAccountsPageModule {}
