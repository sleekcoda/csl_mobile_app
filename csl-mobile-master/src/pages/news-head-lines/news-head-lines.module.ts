import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsHeadLinesPage } from './news-head-lines';

@NgModule({
  declarations: [
    NewsHeadLinesPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsHeadLinesPage),
  ],
})
export class NewsHeadLinesPageModule {}
