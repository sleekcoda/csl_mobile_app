import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WatchlistDetailsPage } from './watchlist-details';

@NgModule({
  declarations: [
    WatchlistDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(WatchlistDetailsPage),
  ],
})
export class WatchlistDetailsPageModule {}
