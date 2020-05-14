import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopGainersPage } from './top-gainers';

@NgModule({
  declarations: [
    TopGainersPage,
  ],
  imports: [
    IonicPageModule.forChild(TopGainersPage),
  ],
})
export class TopGainersPageModule {}
