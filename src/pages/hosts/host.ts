import { Component } from '@angular/core';
import { Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";

@Component({
        selector: 'page-hosts',
        templateUrl: 'host.html',
})

export class Host {
	
	key: string;
	host: any;
	image: any;
	hosts: any;
	images: any;

	constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
	) {
		this.images = this.base.images;
		this.hosts = this.base.hosts;
		this.key = this.params.get('key');
		this.host = this.base.read('hosts/'+this.key);
	}


}
