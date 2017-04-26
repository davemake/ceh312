import { Component } from '@angular/core';
import { IonicPage, Nav } from 'ionic-angular';
import { Base } from "../../providers/base";

/**
 * Generated class for the UserPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

@IonicPage()

export class UserPage {

  signupRoot = 'SignupPage'
  signinRoot = 'SigninPage'
  signoutRoot = 'SignoutPage'
  settingsRoot = 'SettingsPage'
  statusRoot = 'StatusPage'
  helpRoot = 'HelpPage'

  user: any;

  constructor(
      public navCtrl: Nav,
      public base: Base
    ) {
      this.user = this.base.user;
    }

}
