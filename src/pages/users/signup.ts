import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";

declare let window: any;
declare let cordova: any;

@Component({
        selector: 'page-users',
        templateUrl: 'signup.html',
})

export class Signup {

	type: any;
	email: any="davemakena@gmail.com";
	password: any="entering";

	constructor(
		public nav: NavController, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
	) {
		window.this = this;
	}

	updateType(str) {
		this.type = str;
	}

	signup() {
		let email = this.email;
		let password = this.password;
		let type = this.type;
		this.createUser(email, password, type)
	}
	
	createUser(email, password, type) {
		this.type = type;
		this.base.auth.createUserWithEmailAndPassword(email, password)
		.then( this.createUserObjAndVerifyEmail )
		.catch( this.createUserError );
	}

	createUserObjAndVerifyEmail(user) {
		user.sendEmailVerification();
		let type = window.this.type;
		window.this.base.database.ref("users/"+user.uid).set({type: type});
	}

	createUserError(error) {
		alert(error.code+" "+error.message);
	}

}
