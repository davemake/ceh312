import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { UserPage } from "../user/user";
import { TasksPage } from "../tasks/tasks";
import { HostsPage } from "../hosts/hosts";
import { Base } from "../../providers/base";


/**
 * Generated class for the DevelopersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-developers',
  templateUrl: 'developers.html',
})
export class DevelopersPage {

	user: any;
  pages: Array<{title: string, component: any}>;

// constructor
  constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base
  ) {
		this.user = this.base.user;
    this.setPages();
  }
// end constructor

  setPages() {
    this.pages = [
      { title: 'Home', component: UserPage },
      { title: 'Hosts', component: HostsPage },
      { title: 'Tasks', component: TasksPage }
    ];
  }

	openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevelopersPage');
  }

}
