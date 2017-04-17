import { Component } from '@angular/core';
import { Platform, Nav, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";
import { Host } from '../hosts/host';

declare let window: any;
declare let cordova: any;

@Component({
        selector: 'page-users',
        templateUrl: 'user.html',
})

export class User {
	
	user: any;
	userAuth: any;

	pass: any;
	role: any;
	student: any;
	host: any;
	volunteer: any;
	email: any="davemakena@gmail.com";
	password: any="entering";
	status: any;
	signed: any;
	verified: any;
	profiled: any;
	signinMode: any=(new Date).getTime();
	signupMode: any;

	constructor(
		public nav: Nav, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
	) {
		window.thisUser = this;
		this.user = this.base.user;
    }

	pageHost() {
		this.page(Host);
	}

	page(obj) {
		this.nav.setRoot(obj)
	}

	setMode(mode) {
		this.signinMode = null;
		this.signupMode = null;
		if (mode=="signin") {
			if (!this.signed) {
				this.role = null;
			}
			this.signinMode = (new Date).getTime();
		}
		if (mode=="signup") {
			this.signupMode = (new Date).getTime();
		}
	}

	setRole(role) {
		this.role = role;
	}

	signup() {
		let email = this.email;
		let password = this.password;
		let role = this.role;
		this.user = this.base.userSignup(email, password, role);
	}

	signin() {
		let email = this.email;
		let password = this.password;
		this.base.userSignin(email, password);
		this.nav.setRoot(User);
	}

	signout() {
		this.user = this.base.userSignout();
	}

	destroy() {
		this.user = this.base.destroyUser();
	}
	


}
