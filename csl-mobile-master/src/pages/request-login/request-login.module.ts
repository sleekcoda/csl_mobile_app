import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestLoginPage } from './request-login';

@NgModule({
  declarations: [
    RequestLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(RequestLoginPage),
  ],
})
export class RequestLoginPageModule {}
