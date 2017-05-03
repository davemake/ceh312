import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { TasksPage } from "../tasks/tasks";
import { HostsPage } from "../hosts/hosts";
import { DevelopersPage } from "../developers/developers";
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
	host: any;
	student: any;
	volunteer: any;
	developers: any;
  pages: Array<{title: string, component: any}>;

  constructor(
		public params: NavParams,
		public platform: Platform,
		public base: Base,
		public nav: Nav,
  ) {
		this.user = this.base.user;
  }
	
	openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

}
