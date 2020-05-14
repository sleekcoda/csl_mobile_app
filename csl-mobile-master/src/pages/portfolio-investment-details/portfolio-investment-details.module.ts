import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PortfolioInvestmentDetailsPage } from './portfolio-investment-details';

@NgModule({
  declarations: [
    PortfolioInvestmentDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PortfolioInvestmentDetailsPage),
  ],
})
export class PortfolioInvestmentDetailsPageModule {}
