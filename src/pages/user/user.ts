import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { TasksPage } from "../tasks/tasks";
import { HostsPage } from "../hosts/hosts";
import { DevelopersPage } from "../developers/developers";
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
    public nav: Nav, 
    public params: NavParams,
    public platform: Platform, 
    public base: Base,
  ) {
    let role = this.params.get('role');
    if (role) {
      switch (role) {
        case "host": this.nav.setRoot(HostsPage); break;
        case "developer": this.nav.setRoot(DevelopersPage); break;
        default: this.nav.setRoot(TasksPage); break;
      }
    } else {
      this.base.rememberUser(this.nav, UserPage);
    }
  }
  
}
