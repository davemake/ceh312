import { Component } from '@angular/core';
import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';

/* 
  import { ModalController, IonicPage, NavController, NavParams } from 'ionic-angular';
  import { ChooseImagePage } from '../choose-image/choose-image';
  ...
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modal: ModalController
    ...
  // Place this in your .ts and call in your .html
  present() {
    this.modal.create(ChooseImagePage, {
      page: page,
      item: item,
      path: path,
      attrib: attrib
    }).present();
  }
*/

@IonicPage()
@Component({
  selector: 'page-choose-image',
  templateUrl: 'choose-image.html',
})
export class ChooseImagePage {

  obj: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modal: ModalController
  ) {
    this.obj = {
      page: this.navParams.get('page'),
      item: this.navParams.get('item'),
      path: this.navParams.get('path'),
      attrib: this.navParams.get('attrib')
    }
  }


  chooseImage(name) {
    alert(name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseImagePage');
  }

}
