import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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


  constructor(public navCtrl: NavController) {}

}
