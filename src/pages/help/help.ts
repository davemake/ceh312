import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";

/**
 * Generated class for the HelpPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {

  email: any = "davemakena@gmail.com";
  password: any;
  reset_code: any;
  sent_reset_code: any;

  constructor(
		public nav: Nav,
		public params: NavParams,
		public platform: Platform, 
		public base: Base
  ) {
  }

  // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#sendPasswordResetEmail
  send_reset_code() {
    let email = this.email;
    this.base.auth.sendPasswordResetEmail(email).then( ()=>{
      debugger;
    }).catch( this.base.catchError );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

}
