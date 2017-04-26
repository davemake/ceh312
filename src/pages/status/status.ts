import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";
/**
 * Generated class for the StatusPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-status',
  templateUrl: 'status.html',
})
export class StatusPage {

	user: any;
	role: any;
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

}
