import { Component } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { IonicPage, Platform, Nav, NavParams } from 'ionic-angular';

import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup

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
  files: FirebaseListObservable<any>;
  images: any=[];
  loadUrlLaterItems: any=[];
  imagesList: FirebaseListObservable<any>;
  imagesUrls: any={};
  imagesUrlsWatch: any;
  county: any;
  city: any;
  keywords: any;
  statement: any;
  edits: any=[];
  key: any;
  path: any;
  imagePaths: any=[];
  pageIsLoaded: any;
  imagesWatch: any;
  imagesNotReady: any;
  url: any;
	pdf: any;
  testUrl: any;
// 

// constructor
  // https://www.npmjs.com/package/cordova-pdf-generator
  // $ cordova plugin add cordova-pdf-generator
  constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base
  ) {
    window.thisHost = this;
    this.pdf = window.pdf;
    this.key = this.params.get('key');
    this.path = "hosts/"+this.key;
    this.family_name = this.base.read(this.path+"/family_name");
    this.county = this.base.read(this.path+"/county");
    this.city = this.base.read(this.path+"/city");
    this.keywords = this.base.read(this.path+"/keywords");
    this.statement = this.base.read(this.path+"/statement");

    this.imagesList = this.storageList(this.path+"/images");
    this.imagesList.subscribe( (images)=>{
      let urls = window.thisHost.imagesUrls;
      for (let i in images) {
        window.thisHost.images[i] = images[i];
      }
    });
    setInterval( ()=>{
      this.loadUrlLaterProcess();
    }, 1000)

    this.isMobile = this.base.isMobile;
		this.user = this.base.user;
    
  }
//

	print() {
		if (this.pdf) {
      let html = "<div style='height:100%;background-color:yellow'><h1><center><img src='";
      html += this.testUrl;
      html += "'></img></center></h1></div>";
			html += "<div style='height:100%'><h1><center>Hello World2</center></h1></div>";
			html += "<div style='height:100%'><h1><center>Hello World3</center></h1></div>";
			this.pdf.htmlToPDF({
				data: html,
				documentSize: "A",
				landscape: "portrait",
				type: "base64"
			});
		} else {
      alert("Pdf works in android or ios");
    }
	}

	test() {
		this.platform.ready().then( ()=> {
			this.print()
		});
	}

  storageList(path) {
    return <FirebaseListObservable<any>> this.base.list(path).map( (items) => {
      return items.map( (item) => {
        let ref = window.thisHost.base.storage.ref(item.path+"/"+item.name);
        let ref2 = ref.getDownloadURL();
        ref2.then( (url) => {
          let id = window.thisHost.base.getUrlId(url);
          window.thisHost.imagesUrls[id] = url;
          window.thisHost.testUrl = url;
        }).catch( console.log );
        return item;
      });
    });
  }

  loadUrl( item ) {
    let url = this.imagesUrls[item.id];
    if ( url ) {
      return url;
    } else {
      this.loadUrlLater( item );
      return null;
    }
  }

  loadUrlLater( item ) {
    if ( !this.loadUrlLaterItems.includes( item ) ) {
      this.loadUrlLaterItems.push(item);
    }
  }

  loadUrlLaterProcess() {
    if ( this.loadUrlLaterItems.length ) {
      for ( let i in this.loadUrlLaterItems ) {
        let item = this.loadUrlLaterItems[i];
        let ref = window.thisHost.base.storage.ref(item.path+"/"+item.name);
        ref.getDownloadURL().then( this.loadUrlLaterProcessUrl ).catch( console.log );
      }
    }
  }

  loadUrlLaterProcessUrl(url) {
    let id = window.thisHost.base.getUrlId(url);
    window.thisHost.loadUrlLaterUpdateAttrib(id, url);
    window.thisHost.loadUrlLaterRemoveItem(id);
  }

  loadUrlLaterRemoveItem(id) {
    for ( let i in window.thisHost.loadUrlLaterItems ) {
      let item = this.loadUrlLaterItems[i];
      if ( item.id==id ) {
        if ( window.thisHost.loadUrlLaterItems.length==1 ) {
          window.thisHost.loadUrlLaterItems = [];
        } else {
          window.thisHost.loadUrlLaterItems.splice(i, i);
        }
      }
      console.log("load", item.path+"/"+item.name);
    }
  }

  loadUrlLaterUpdateAttrib(id, url) {
    window.thisHost.imagesUrls[id] = url;
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
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostPage');
  }

}
