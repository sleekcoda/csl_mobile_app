import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellAndBuyStocksPage } from './sell-and-buy-stocks';

@NgModule({
  declarations: [
    SellAndBuyStocksPage,
  ],
  imports: [
    IonicPageModule.forChild(SellAndBuyStocksPage),
  ],
})
export class SellAndBuyStocksPageModule {}
