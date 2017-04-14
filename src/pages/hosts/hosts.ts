import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";
import { Host } from './host'

declare let window: any;
declare let cordova: any;

@Component({
        selector: 'page-hosts',
        templateUrl: 'hosts.html'
})

export class Hosts {
	
	host: any;
	image: any;
	hosts: any;
	images: any;

	constructor(
		public nav: NavController, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
	) {
		this.images = this.base.images;
		this.hosts = this.base.hosts;
	}



	hostPage(key) {
		this.nav.push(Host, {key: key});
	}

	create() {
		this.host = this.base.create("hosts", "host");
		if (this.host) {
			this.nav.push(Host);
		}
	}

	index() {
		this.host
	}

	upload() {
		let images = this.base.uploadImages();
	}

	showImage(i) {
		return this.base.showImage(i);
	}

	read(key) {
		this.host = this.base.read('hosts', key);
	}

	update(key) {
	}

	destroyImage(i) {
		this.base.destroyStorage('images', i);
	}

	search() {
	}


}
