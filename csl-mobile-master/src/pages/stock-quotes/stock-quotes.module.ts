import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StockQuotesPage } from './stock-quotes';

@NgModule({
  declarations: [
    StockQuotesPage,
  ],
  imports: [
    IonicPageModule.forChild(StockQuotesPage),
  ],
})
export class StockQuotesPageModule {}
