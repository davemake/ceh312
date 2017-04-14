import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";

declare let window: any;
declare let cordova: any;

@Component({
        selector: 'page-users',
        templateUrl: 'logout.html',
})

export class Logout {

	constructor(
		public nav: NavController, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
	) {
	}


}
