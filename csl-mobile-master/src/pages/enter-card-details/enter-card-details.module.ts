import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EnterCardDetailsPage } from './enter-card-details';

@NgModule({
  declarations: [
    EnterCardDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EnterCardDetailsPage),
  ],
})
export class EnterCardDetailsPageModule {}
