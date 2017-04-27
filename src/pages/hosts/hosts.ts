import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";

/**
 * Generated class for the HostsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hosts',
  templateUrl: 'hosts.html',
})
export class HostsPage {

	user: any;
  mode: any;
  item: any;
  items: any;
  files: any;
  host_family_name: any;
  county: any;
  city: any;

  constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base
  ) {
		this.user = this.base.user;
    this.mode = null;
  }

  create() {
    let mode = this.mode = "create";
    let key = this.user.uid;
    this.item = this.base.create("users/"+key+"/hosts");
  }

  upload() {

  }

  cancel() {
    this.mode = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostsPage');
  }

}
