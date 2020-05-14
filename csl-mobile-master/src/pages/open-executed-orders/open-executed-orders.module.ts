import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenExecutedOrdersPage } from './open-executed-orders';

@NgModule({
  declarations: [
    OpenExecutedOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenExecutedOrdersPage),
  ],
})
export class OpenExecutedOrdersPageModule {}
