import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopLosersPage } from './top-losers';

@NgModule({
  declarations: [
    TopLosersPage,
  ],
  imports: [
    IonicPageModule.forChild(TopLosersPage),
  ],
})
export class TopLosersPageModule {}
