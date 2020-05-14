import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenOrdersPage } from './open-orders';

@NgModule({
  declarations: [
    OpenOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenOrdersPage),
  ],
})
export class OpenOrdersPageModule {}
