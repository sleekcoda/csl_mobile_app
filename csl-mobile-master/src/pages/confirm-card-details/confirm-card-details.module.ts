import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmCardDetailsPage } from './confirm-card-details';

@NgModule({
  declarations: [
    ConfirmCardDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmCardDetailsPage),
  ],
})
export class ConfirmCardDetailsPageModule {}
