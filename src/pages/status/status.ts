import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { TasksPage } from "../tasks/tasks";
import { HostPage } from "../host/host";
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
	email: any;
	role: any;
	role_page: any;
	host: any;
	student: any;
	volunteer: any;

  constructor(
		public params: NavParams,
		public platform: Platform,
		public base: Base,
		public nav: Nav,
  ) {
		this.user = this.base.user;
		this.role = this.user.role;
		this.email = this.user.email;
  }

	linkTasks() {
		this.nav.setRoot(TasksPage);
	}

	linkRole() {
		switch (this.role) {
			case "host": 
				this.nav.setRoot(HostPage); 
				break;
		}
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StatusPage');
  }

}
