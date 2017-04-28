import { Component } from '@angular/core';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";

declare var cordova: any;

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
  key: any;
  mode: any=null;
  item: any;
  items: any;
  mobile: any;
  files: any;
  images: any;
  host: any;
  hosts: any;
  host_family_name: any;
  county: any;
  city: any;


  constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
  ) {
    this.mobile = this.base.mobile;
		this.user = this.base.user;
    this.key = this.user.uid;
  }

  create() {
    let mode = this.mode = "create";
    let key = this.user.uid;
    this.item = this.base.create("users/"+key+"/hosts");
  }

  createUploadImages() {
    if (this.user) {
      let path = "users/"+this.key+"/hosts";
      this.item = this.base.create(path);
      this.uploadImages();
    }
  }

  uploadImages() {
    if (this.item) {
      let path = this.item.path+"/images";
      this.base.uploadImages(path);
    }
  }

  uploadFiles() {
  }

  chooseFiles() {
  }

  cancel() {
    this.mode = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostsPage');
  }

}
