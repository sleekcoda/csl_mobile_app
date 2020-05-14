import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPortfolioPage } from './my-portfolio';

@NgModule({
  declarations: [
    MyPortfolioPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPortfolioPage),
  ],
})
export class MyPortfolioPageModule {}
