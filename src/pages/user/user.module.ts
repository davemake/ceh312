import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage } from '../user/user';
import { SignupPage } from '../signup/signup';

@NgModule({
  declarations: [
    UserPage,
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPage),
  ]
})
export class UserPageModule {}
