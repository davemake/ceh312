import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";

/**
 * Generated class for the SignoutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signout',
  templateUrl: 'signout.html',
})
export class SignoutPage {

	user: any;
	role: any;
	host: any;
	student: any;
	volunteer: any;
	email: any="davemakena@gmail.com";
	password: any="entering";

  constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
  ) {
		this.user = this.base.user;
  }

	signout() {
		this.base.userSignout();
		this.base.watchUser(this.nav, this.nav.root);
	}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignoutPage');
  }

}
