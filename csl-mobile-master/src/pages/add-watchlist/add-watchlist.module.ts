import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddWatchlistPage } from './add-watchlist';

@NgModule({
  declarations: [
    AddWatchlistPage,
  ],
  imports: [
    IonicPageModule.forChild(AddWatchlistPage),
  ],
})
export class AddWatchlistPageModule {}
