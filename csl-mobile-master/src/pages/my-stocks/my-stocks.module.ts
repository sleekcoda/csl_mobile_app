import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyStocksPage } from './my-stocks';

@NgModule({
  declarations: [
    MyStocksPage,
  ],
  imports: [
    IonicPageModule.forChild(MyStocksPage),
  ],
})
export class MyStocksPageModule {}
