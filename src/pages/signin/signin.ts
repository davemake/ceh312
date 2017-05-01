import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";
import { UserPage } from '../user/user';
// ADD TASKS PAGE

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

	user: any;
	role: any;
	host: any;
	student: any;
	volunteer: any;
	email: any="davemakena@gmail.com";
	password: any="entering";

  constructor(
		public params: NavParams,
		public platform: Platform,
		public base: Base,
		public nav: Nav,
  ) {
		this.user = this.base.user;
  }

	signin() {
		let email = this.email;
		let password = this.password;
		this.base.user = null;
		this.base.userSignin(email, password);
		this.base.watchUser(this.nav, UserPage); // ADD PAGE TO METHOD
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
