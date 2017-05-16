import { Component } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ModalController, IonicPage, Platform, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup
import { Base } from "../../providers/base";


/* 
  import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
  import { ImagesPage } from '../images/images';
  ...
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modal: ModalController
    ...
  // Place this in your .ts and call in your .html
  present() {
    this.modal.create(ImagesPage, {
      path: path,
      attrib: attrib
    }).present();
  }
*/

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-images',
  templateUrl: 'images.html',
})
export class ImagesPage {

// vars
	user: any;
  mobile: any;
  family_name: FirebaseObjectObservable<any>;
  files: FirebaseListObservable<any>;
  images: any=[];
  imagesList: FirebaseListObservable<any>;
  loadUrlLaterItems: any=[];
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
  image_self: any;
  attrib: any;
// 

// constructor
  // https://www.npmjs.com/package/cordova-pdf-generator
  // $ cordova plugin add cordova-pdf-generator
  constructor(
		public nav: NavController, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
    public modal: ModalController
  ) {
    window.thisImages = this;
    this.path = this.params.get('path');
    this.attrib = this.params.get('attrib');

    this.imagesList = this.storageList(this.path+"/images");
    this.imagesList.subscribe( (images)=>{
      let urls = window.thisImages.imagesUrls;
      for (let i in images) {
        window.thisImages.images[i] = images[i];
      }
    });
    
    setInterval( ()=>{
      this.loadUrlLaterProcess();
    }, 1000)

    this.mobile = this.base.mobile;
		this.user = this.base.user;
    
  }
//

  storageList(path) {
    return <FirebaseListObservable<any>> this.base.list(path).map( (items) => {
      return items.map( (item) => {
        let ref = window.thisImages.base.storage.ref(item.path+"/"+item.name);
        let ref2 = ref.getDownloadURL();
        ref2.then( (url) => {
          let id = window.thisImages.base.getUrlId(url);
          window.thisImages.imagesUrls[id] = url;
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
        let ref = window.thisImages.base.storage.ref(item.path+"/"+item.name);
        ref.getDownloadURL().then( this.loadUrlLaterProcessUrl ).catch( console.log );
      }
    }
  }

  loadUrlLaterProcessUrl(url) {
    let id = window.thisImages.base.getUrlId(url);
    window.thisImages.loadUrlLaterUpdateAttrib(id, url);
    window.thisImages.loadUrlLaterRemoveItem(id);
  }

  loadUrlLaterRemoveItem(id) {
    for ( let i in window.thisImages.loadUrlLaterItems ) {
      let item = this.loadUrlLaterItems[i];
      if ( item.id==id ) {
        if ( window.thisImages.loadUrlLaterItems.length==1 ) {
          window.thisImages.loadUrlLaterItems = [];
        } else {
          window.thisImages.loadUrlLaterItems.splice(i, i);
        }
      }
      console.log("load", item.path+"/"+item.name);
    }
  }

  loadUrlLaterUpdateAttrib(id, url) {
    window.thisImages.imagesUrls[id] = url;
    if (document.getElementById(id)) {
      document.getElementById(id).setAttribute('src', url);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImagesPage');
  }

}
