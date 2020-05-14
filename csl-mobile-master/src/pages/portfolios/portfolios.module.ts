import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PortfoliosPage } from './portfolios';

@NgModule({
  declarations: [
    PortfoliosPage,
  ],
  imports: [
    IonicPageModule.forChild(PortfoliosPage),
  ],
})
export class PortfoliosPageModule {}
