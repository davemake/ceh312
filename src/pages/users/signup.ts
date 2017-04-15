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
	status: any="Welcome!"

	constructor(
		public nav: NavController, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
	) {
		window.this = this;
		this.checkUser();
	}

	checkUser() {
		window.this.user = window.this.base.user;
		if (window.this.user && window.this.user.emailVerified) {
			window.this.status = "Thank you!";
		} else if (window.this.user && window.this.user.emailVerified) {
			window.this.status = "Please verify your email by checking your email from firebase and clicking the verify link"
		}
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
		this.status = "Creating User..."
		this.type = type;
		this.base.auth.createUserWithEmailAndPassword(email, password)
		.then( this.createUserObjAndVerifyEmail )
		.catch( this.createUserError );
	}

	createUserObjAndVerifyEmail(user) {
		user.sendEmailVerification();
		window.this.user = user;
		let type = window.this.type;
		window.this.base.database.ref("users/"+user.uid).set({type: type});
		window.this.checkUser();
	}

	createUserError(error) {
		console.log(error.code, error.message);
		window.this.status = error.message;
	}

}
