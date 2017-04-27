import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";

/**
 * Generated class for the TasksPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {

	user: any;
	role: any;

  constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base
  ) {
		this.user = this.base.user;
  }

	setRole(role) {
		this.role = role;
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
  }

}
