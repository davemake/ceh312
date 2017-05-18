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
  images: any=[];

  urlToSrcLaterUrls: any=[];
  urlToSrcLaterWatch: any;

  idToUrlSrc: any={};
  idToUrlSrcWatch: any;

  family_name: any;
  county: any;
  city: any;

  image_self: any;
  image_home: any;
  image_room: any;

  keywords: any;
  statement: any;
  key: any;
  path: any;
	pdf: any;
  testUrl: any;

  currentMode: any;
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
    this.image_home = this.base.read(this.path+"/image_home");
    this.image_room = this.base.read(this.path+"/image_room");

    this.mobile = this.base.mobile;
		this.user = this.base.user;
    
  }
//

  setMode(mode:any=null) {
    this.currentMode = mode;
  }

  mode(mode) {
    return this.currentMode==mode;
  }

  noMode() {
    if ( this.currentMode ) {
      return null;
    } else {
      return true;
    }
  }

  yesMode() {
    return !this.noMode();
  }

  selectImage() {
    let attrib = arguments[0];
    let modal = this.modal.create(ImagesPage, {
      path: this.path,
      attrib: attrib,
      idsNot: this.getUrlIds()
    });
    modal.onDidDismiss(data => {
      if (data) {
        this.update(attrib, null, data.url);
      }
    });
    modal.present();
  }

  getUrlIds() {
    let items = [];
    if ( this.image_self ) items.push( this.urlToId( this.image_self ) );
    if ( this.image_home ) items.push( this.urlToId( this.image_home ) );
    if ( this.image_room ) items.push( this.urlToId( this.image_room ) );
    return items;
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

  urlToId( url ) {
    return this.base.urlToId( url );
  }

  urlToSrc( url ) {
    if ( url ) {
      let id = this.urlToId(url);
      let src = this.idToUrlSrc[id];
      if ( src ) {
        return src;
      } else {
        return this.urlToSrcLater( url );
      }
    }
  }

  urlToSrcLater( url ) {
    let urls = this.urlToSrcLaterUrls;
    if ( url && !urls.includes( url ) ) {
      urls.push(url);
      this.urlToSrcLaterProcess();
    }
    return null;
  }

  urlToSrcLaterProcess() {
    console.log("urlToSrcLaterProcess()")
    if ( !this.urlToSrcLaterWatch ) {
      this.urlToSrcLaterProcessUrls();
    }
  }

  urlToSrcLaterProcessUrls() {
    console.log("urlToSrcLaterProcessUrls()");
    this.urlToSrcLaterWatch = setInterval( ()=>{
      console.log("LOOPING START", );
      let urls = this.urlToSrcLaterUrls;
      if ( urls.length ) {
        for ( let i in urls ) {
          let url = urls[i];
          let ref = this.base.storage.ref(url);
          let src = ref.getDownloadURL();
          src.then( this.urlToSrcLaterProcessUrl ).catch( console.log );
        }
      } else {
        console.log("LOOPING STOP");
        clearInterval( this.urlToSrcLaterWatch );
        this.urlToSrcLaterWatch = null;
      }
    }, 1000)
  }

  urlToSrcLaterProcessUrl(url) {
    console.log("urlToSrcLaterProcessUrl(", url, ")");
    let id = window.thisHost.base.urlToId(url);
    window.thisHost.urlToSrcLaterUpdateAttrib(id, url);
    window.thisHost.urlToSrcLaterRemoveUrl(url);
  }

  urlToSrcLaterRemoveUrl(url) {
    console.log("urlToSrcLaterRemoveUrl(", url, ")")
    let urlRef = url.split("?")[0];
    let urls = window.thisHost.urlToSrcLaterUrls;
    for ( let i in urls ) {
      if ( this.urlToId(urls[i])==this.urlToId(url) ) {
        if ( urls.length==1 ) {
          window.thisHost.urlToSrcLaterUrls = [];
        } else {
          window.thisHost.urlToSrcLaterUrls.splice(i, i);
        }
      }
    }
  }

  urlToSrcLaterUpdateAttrib(id, url) {
    console.log("urlToSrcLaterUpdateAttrib(", id, ", ", url, ")");
    window.thisHost.idToUrlSrc[id] = url;
    if (document.getElementById(id)) {
      console.log("if (document.getElementById(", id, "))");
      document.getElementById(id).setAttribute('src', url);
    }
  }

  update(attrib, processing:string=null, value:any=undefined) {
    // update( 'name', 'titleize', 'dave') //=> this.name == "Dave"
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
    this.setMode();
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
