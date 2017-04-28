import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";

/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  email: any = "davemakena@gmail.com";
  newEmail: any;
  password: any;
  sent_to: any;
  sent_at: any;
  user: any;
  mode: any;

  constructor(
		public nav: Nav,
		public params: NavParams,
		public platform: Platform, 
		public base: Base
  ) {
    this.user = this.base.user;
  }

  setMode(mode) {
    this.mode = mode;
  }

  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sendPasswordResetEmail
  send_password_reset() {
    let email = this.user.email;
    this.base.auth.sendPasswordResetEmail(email).then( ()=>{
      console.log("password reset link sent to ", email);
      this.sent_to = email;
      this.sent_at = (new Date);
    }).catch( this.base.catchError );
  }

  // https://firebase.google.com/docs/reference/js/firebase.User#updateEmail
  update_email() {
    let newEmail = this.newEmail;
    this.base.passAuth.updateEmail(newEmail).then( ()=>{
      console.log("email updated to ", newEmail);
      this.base.passAuth.sendEmailVerification();
      alert("Please check your email and click the link to verify your email address: "+newEmail);
      this.base.userSignout();
      this.base.watchUser(this.nav, this.nav.root);
    }).catch( this.base.catchError );
  }

  destroy_user() {
    let confirmed = prompt("Permanently Destroy User? Type the word 'destroy' and press OK to continue:");
    if ( confirmed=="destroy" ) {
      this.base.userDestroy();
      this.base.watchUser(this.nav, this.nav.root);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
