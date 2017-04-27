import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";

/**
 * Generated class for the HostPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-host',
  templateUrl: 'host.html',
})
export class HostPage {

	user: any;
	role: any;
	role_page: any;
	host: any;
	student: any;
	volunteer: any;
	email: any;

  constructor(
		public params: NavParams,
		public platform: Platform,
		public base: Base,
		public nav: Nav,
  ) {
		this.user = this.base.user;
		this.role = this.user.role;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostPage');
  }

}
