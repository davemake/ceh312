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
  isMobile: any;
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
    this.isMobile = this.base.isMobile;
		this.user = this.base.user;
    this.key = this.user.uid;
    if (this.item) {
      this.hosts = this.base.afd.list(this.user.path+"/hosts");
      this.files = this.base.afd.list(this.item.path+"/files");
      this.images = this.base.afd.list(this.item.path+"/images");
    }
  }

  newItem() {
    let mode = this.mode = "new";
    this.item_old = this.item;
    this.item = {}
    this.processItem();
  }

  oldItem() {
    let mode = this.mode = "read";
    this.item = this.item_old;
    this.processItem();
  }

  getItem(key) {
debugger;
  }

  processItem() {
    if (this.user && this.user.path) {
      this.items = this.base.afd.list(this.user.path+"/hosts");
    } else {
      this.items = null;
    }
    if (this.item) {
      if (this.item.path) {
        this.files = this.base.afd.list(this.item.path+"/files");
        this.images = this.base.afd.list(this.item.path+"/images");
      } else {
        this.files = null;
        this.images = null;
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
      let path = this.user.path+"/hosts";
      this.item = this.base.create(path);
      this.base.uploadFiles(this.item.path);
      this.hosts = this.base.afd.list(this.user.path+"/hosts");
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
