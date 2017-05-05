import { Component } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { HostPage } from "../host/host";
import { Base } from "../../providers/base";

declare var window: any;

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
  reading: any;
  item: any;
  item_old: any;
  items: any;
  isMobile: any;
  host: any;
  hosts: FirebaseListObservable<any>;
  host_family_name: any;
  county: any;
  city: any;
  keywords: any;
  statement: any;
	images: any;
	files: any;
  edits: any=[];
// 

// constructor
  constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
  ) {
    window.thisHosts = this;
    this.isMobile = this.base.isMobile;
		this.user = this.base.user;
    this.hosts = this.base.afd.list("/hosts");
    this.setMode(this.params.get('mode'));
  }
// 

  setMode(mode) {
    this.mode = mode;
    this.reading = null;
    this.edits = [];
    switch (mode) {
      case "read": 
        this.setItem(this.params.get('path'));
        if (this.item) {
          this.reading = true; 
        }
        break;
      default: 
        this.mode = null;
        this.item = null;
        this.images = null;
        this.files = null;
        break;
    }
  }

  setItem(path) {
    if (path) {
      this.item = this.base.read(path);
      this.images = [];
      if (this.item.images) {
        for (var i in this.item.images) {
          let obj = this.item.images[i];
          this.images.push(obj);
          let path_name = obj.path+"/"+obj.name;
          let ref = this.base.storage.ref(path_name);
          ref.getDownloadURL().then( this.setImagesUrl ).catch( this.base.catchError );
        }
      }
      this.files = [];
      if (this.item.files) {
        for (var i in this.item.files) {
          this.files.push(this.item.files[i]);
        }
      }
    }
  }

  setImagesUrl(url) {
    let names = url.split("?")[0].split("%2F");
    let name = names[names.length-1];
    let id = names[names.length-1].split(".")[0];
    let this2 = window.thisHosts;
    let images = this2.images;
    for (var i in this2.images) {
      let name2 = images[i].name;
      if (name==name2) {
        images[i].url = url;
      }
    }
  }

  edit(mode) {
    if (mode) {
      this.edits = [mode];
    } else {
      this.edits = [];
    }
  }

  editing(mode) {
    return this.edits.includes(mode);
  }

  fileId(i) {
    //...
  }

  create() {
    if (this.user) {
      this.item = this.base.create("hosts");
      if (this.item) {
        this.nav.push(HostsPage, {mode: 'read', path: this.item.path});
      }
    }
  }

  read(key) {
    this.nav.push(HostPage, {key: key});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostsPage');
  }

}
