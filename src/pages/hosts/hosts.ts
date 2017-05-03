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

// vars
	user: any;
  key: any;
  mode: any;
  modeNew: any;
  modeRead: any;
  modeEdit: any;
  item: any;
  item_old: any;
  items: any;
  isMobile: any;
  host: any;
  hosts: any;
  host_family_name: any;
  county: any;
  city: any;
  keywords: any;
  statement: any;
	images: FirebaseListObservable<any>;
	files: FirebaseListObservable<any>;
// end vars

// constructor
  constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
  ) {
    this.isMobile = this.base.isMobile;
		this.user = this.base.user;
    this.hosts = this.base.afd.list("/hosts");
    this.setMode(this.params.get('mode'));
    this.setItem(this.params.get('path'));
  }
// end constructor

  setMode(mode) {
    this.mode = mode;
    this.modeNew = null;
    this.modeRead = null;
    this.modeEdit = null;
    switch (mode) {
      case "new": 
        this.modeNew = true;
        break;
      case "read": 
        this.modeRead = true; 
        break;
      case "edit": 
        this.modeEdit = true; 
        break;
      default: 
        this.mode = null;
        this.item = null;
        break;
    }
  }

  setItem(path) {
    if (path) {
      this.item = this.base.read(path);
    }
  }

  newItem() {
    this.item = {
      images: null,
      files: null,
      host_family_name: null,
      county: null,
      city: null,
      keywords: null,
      statement: null
    }
    this.nav.push(HostsPage, {mode: 'new', item: this.item});
  }

  read(item) {
    this.nav.push(HostsPage, {mode: 'read', path: item.path});
  }

  destroy(item) {
    this.base.destroy(item.path);
    this.setMode(null);
  }

  createByFiles() {
    if (this.user) {
      this.item = this.base.create("hosts");
      this.base.uploadFiles(this.item.path);
      this.nav.pop();
      this.read(this.item);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostsPage');
  }

}
