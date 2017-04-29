import { Component } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
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
  item: any={};
  item_old: any;
  items: any;
  mobile: any;
  host: any;
  hosts: any;
  host_family_name: any;
  county: any;
  city: any;
  keywords: any;
  introduction: any;
	images: FirebaseListObservable<any>;
	files: FirebaseListObservable<any>;


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

  getNew() {
    let mode = this.mode = "new";
    this.item_old = this.item;
    this.item = {}
  }

  getOld() {
    let mode = this.mode = "read";
    this.item = this.item_old;
    this.processItem();
  }

  processItem() {
    if (this.item) {
      if (this.item.path) {
        this.files = this.base.afd.list(this.item.path+"/files");
        this.images = this.base.afd.list(this.item.path+"/images");
      }
      this.host_family_name = this.item.host_family_name;
      this.county = this.item.county;
      this.city = this.item.city;
      this.keywords = this.item.keywords;
      this.introduction = this.item.introduction;
    }
  }

  createByFiles() {
    if (this.user) {
      let path = "users/"+this.key+"/hosts";
      this.item = this.base.create(path);
      this.base.uploadFiles(this.item.path);
      this.files = this.base.afd.list(this.item.path+"/files");
      this.images = this.base.afd.list(this.item.path+"/images");
    }
  }

  cancel() {
    this.mode = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostsPage');
  }

}
