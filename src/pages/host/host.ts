import { Component } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
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
  selector: 'page-host',
  templateUrl: 'host.html',
})
export class HostPage {

// vars
	user: any;
  isMobile: any;
  family_name: FirebaseObjectObservable<any>;
  images: any;
  county: any;
  city: any;
  keywords: any;
  statement: any;
	files: any;
  edits: any=[];
  key: any;
  path: any;
  imagePaths: any=[];
  pageIsLoaded: any;
// 

// constructor
  constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
  ) {
    window.thisHost = this;
    this.key = this.params.get('key');
    this.path = "hosts/"+this.key;
    this.family_name = this.base.read(this.path+"/family_name");
    this.county = this.base.read(this.path+"/county");
    this.city = this.base.read(this.path+"/city");
    this.keywords = this.base.read(this.path+"/keywords");
    this.statement = this.base.read(this.path+"/statement");
    this.images = this.base.read(this.path+"/images");
    this.files = this.base.list(this.path+"/files");
    this.isMobile = this.base.isMobile;
		this.user = this.base.user;

    
  }
//

  getUrl(i) {
    let path = i.path+"/"+i.name;
    if (!window.thisHost.imagePaths.includes(path)) {
      window.thisHost.imagePaths.push(path);
    }
    return i.id;
  }

  getUrlsFromImagePaths() {
      while (window.thisHost.imagePaths.length>0) {
        let ref = this.base.storage.ref(window.thisHost.imagePaths.pop());
        ref.getDownloadURL().then( this.getUrlToId ).catch( this.base.catchError );
      }
  }

  getUrlToId(url) {
    let id = window.thisHost.base.getUrlId(url);
    if (document.getElementById(id)) {
      document.getElementById(id).setAttribute('src', url);
    }
  }

  update(attrib) {
    this.base.update(this.path+"/"+attrib, this[attrib])
  }

  destroy() {
    this.base.destroy("hosts/"+this.key+"/");
  }

  upload() {
    if (this.path) {
      this.base.upload(this.path);
      this.images = this.base.read(this.path+"/images");
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostPage');
    this.getUrlsFromImagePaths();
  }

}
