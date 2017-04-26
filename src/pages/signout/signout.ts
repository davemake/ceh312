import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";
import { UserPage } from '../user/user';

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
	userPage: any=UserPage;

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
		this.base.watchUser(this.nav);
	}
	
	watchUser() {
		let i = 300;
		let myTimer = setInterval( ()=>{
			console.log(i--);
			if ( i<0 || (this.base.user!=null && typeof(this.base.user)==='object') ) {
				console.log(this.user = this.base.user);
				clearInterval(myTimer);
				this.nav.setRoot(this.userPage);
			}
		}, 100);
	}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignoutPage');
  }

}
