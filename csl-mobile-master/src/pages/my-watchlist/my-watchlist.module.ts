import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyWatchlistPage } from './my-watchlist';

@NgModule({
  declarations: [
    MyWatchlistPage,
  ],
  imports: [
    IonicPageModule.forChild(MyWatchlistPage),
  ],
})
export class MyWatchlistPageModule {}
