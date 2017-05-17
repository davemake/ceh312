import { Component } from '@angular/core';
import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { ModalController, IonicPage, Platform, Nav, NavParams } from 'ionic-angular';
import { ImagesPage } from '../images/images';
import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup
import { Base } from "../../providers/base";

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-host',
  templateUrl: 'host.html',
})
export class HostPage {

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
  image_home: any;
  image_room: any;
  imagesTaken: any=[];
// 

// constructor
  // https://www.npmjs.com/package/cordova-pdf-generator
  // $ cordova plugin add cordova-pdf-generator
  constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
    public modal: ModalController
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

    this.image_self = this.base.read(this.path+"/image_self");

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

    this.mobile = this.base.mobile;
		this.user = this.base.user;
    
  }
//

// methods
  getImageIdsInUse() {
    let ids = [];
    this.getImageIdInUse(ids, this.image_self);
    this.getImageIdInUse(ids, this.image_home);
    this.getImageIdInUse(ids, this.image_room);
    return ids;
  }

  getImageIdInUse(items, item) {
    if (item && item.id) {
      items.push(item.id);
    }
  }

  selectImage() {
    let attrib = arguments[0];
    let modal = this.modal.create(ImagesPage, {
      path: this.path,
      attrib: attrib,
      ids: this.getImageIdsInUse()
    });
    modal.onDidDismiss(data => {
      if (data) {
        this.update(attrib, null, data.url);
      }
    });
    modal.present();
  }

	print() {
		this.platform.ready().then( ()=> {
      if (this.pdf) {
        let html = document.getElementById("content_pdf")['innerHTML'];
        this.pdf.htmlToPDF({
          data: html,
          documentSize: "A",
          landscape: "portrait",
          type: "share"
        });
      } else {
        alert("Pdf works in android or ios");
      }
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
        }).catch( console.log );
        return item;
      });
    });
  }

  fileToBase64( file ) {
    let reader = new FileReader();
    reader.readAsDataURL( file );
    reader.onload = ( e )=>{
      return e.target['result'];
    };
  }

  loadBase64( item ) {
    let url = this.imagesUrls[item.id];
    if ( url ) {
      let request = new XMLHttpRequest();
      request.open('get', url, true);
      request.responseType = 'blob';
      request.send();
      request.onload = ()=>{
        return this.fileToBase64( request.response )
      };
    } else {
      return null;
    }
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

  // update( 'name', 'titleize', 'dave') //=> this.name == "Dave"
  update(attrib, processing:string=null, value:any=undefined) {
    if (value!=undefined) {
      this[attrib] = value;
    }
    switch (processing) {
      case "uppercase": this[attrib] = this.toUppercase(this.toTitleize(this[attrib])); break;
      case "titleize": this[attrib] = this.toTitleize(this[attrib]); break;
      case "capitalize": this[attrib] = this.toCapitalize(this[attrib]); break;
      case "camelize": this[attrib] = this.toCamelize(this[attrib]); break;
      case "paragraphs": this[attrib] = this.toParagraphs(this[attrib]); break;
      case "keywords": this[attrib] = this.toKeywords(this[attrib]); break;
    }
    this.base.update(this.path+"/"+attrib, this[attrib])
  }

  toParagraphs(str) {
    return str;
  }

  toKeywords(str) {
    return str;
  }

  toTitleize (str) {
        str = this.toLowercase(str);
        str = this.toMinChars(str);
        str = this.toMinSpace(str);
        str = this.toCapitalize(str);
        return str;
  }

  // replace large words with abbreviations and symbols
  toMinChars(str) {
    // replace " and " with " & "
    str = str.replace(/ and /g,' & ');
    return str;
  }

  // replace multiple spaces with single spaces
  toMinSpace (str) {
    return str.replace(/\s+/g,' ').trim();
  }

  toLowercase (str) {
    return str.toLowerCase()
  }

  toUppercase (str) {
    return str.toUpperCase()
  }

  toCapitalize (str) {
    return str.replace(/\w\S*/g, (txt)=>{
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    })
  }

  toCamelize (str) {
    return this.toCapitalize(this.toLowercase(str)).replace(/ /g,'');
  }

  destroy() {
    this.base.destroy("hosts/"+this.key);
  }

  upload() {
    if (this.path) {
      this.base.upload(this.path);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HostPage');
  }
//

}
