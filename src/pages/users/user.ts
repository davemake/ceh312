import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { Base } from "../../providers/base";

declare let window: any;
declare let cordova: any;

@Component({
        selector: 'page-users',
        templateUrl: 'user.html',
})

export class User {
	
	user: any;
	users: any;

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
		public nav: NavController, 
		public params: NavParams,
		public platform: Platform, 
		public base: Base,
	) {
		window.this = this;
		this.user = this.base.user;
		this.signed = this.base.signed;
		this.verified = this.base.verified;
		this.profiled = this.base.profiled;
		if (this.base.user && this.base.role) {
			let role = this.role = this.base.role;
			this[role] = this.base[role] = this.base.read(role+"s", this.user.uid);
		}
    }

	setRole(role) {
		this.role = role;
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

	signup() {
		let email = this.email;
		let password = this.password;
		let role = this.role;
		this.createUser(email, password, role)
	}

	signin() {
		// signin
		let email = this.email;
		let password = this.password;
		this.base.auth.signInWithEmailAndPassword(email, password)
		.then( this.signinSuccess )
		.catch( this.catchError );
		
	}

	signinSuccess(user) {
		window.this.base.database.ref("users/"+user.uid+"/signed").set((new Date).getTime());
		let userObj = window.this.user = window.this.base.database.ref("users/"+user.uid);
		window.this.signed = userObj.signed;
		window.this.verified = userObj.verified;
		window.this.profiled = userObj.profiled;
		let role = window.this.role = window.this.user.role;
		window.this[role] = window.this.base.read(role+"s", user.uid);
	}

	signout() {
		this.base.signout();
	}

	signoutSuccess() {
		window.this.user = null;
		window.this.role = null;
		window.this.signed = null;
		window.this.verified = null;
		window.this.profiled = null;
		window.this.host = null;
		window.this.student = null;
		window.this.volunteer = null;
		window.this.hosts = null;
		window.this.students = null;
		window.this.volunteers = null;
	}

	deleteUser() {
		
	}

	readUser(email, password) {
		// read user
	}

	updateUser(user) {
		// update user
	}
	
	createUser(email, password, role) {
		this.status = "Creating User..."
		this.role;
		this.base.auth.createUserWithEmailAndPassword(email, password)
		.then( this.createUserSuccess )
		.catch( this.catchError );
	}

	createUserSuccess(user) {
		user.sendEmailVerification();
		let role = window.this.role;
		let userObj = {
			uid: user.uid,
			role: role,
			created: (new Date).getTime(),
			signed: (new Date).getTime(),
			verified: null,
			profiled: null,
			updated: (new Date).getTime()
		}
		let obj = {
			uid: user.uid,
			role: role,
			created: (new Date).getTime(),
			updated: (new Date).getTime()
		}
		window.this.base.database.ref("users/"+user.uid).set(userObj);
		window.this.base.database.ref(role+"s/"+user.uid).set(obj);
		window.this.user = window.this.base.user = window.this.base.read("users", user.uid);
		window.this.signed = window.this.base.signed = userObj.signed;
		window.this.verified = window.this.base.verified = userObj.verified;
		window.this.profiled = window.this.base.profiled = userObj.profiled;
		window.this[role] = window.this.base[role] = window.this.base.read(role+"s", user.uid);
	}

	readUserSuccess(user) {
		// load user
	}

	updateUserSuccess() {
		// load new user params
	}

	deleteUserSuccess() {
		// load new user params
	}

	catchError(error) {
		console.log(error.code, error.message);
		window.this.status = error.message;
		alert(error.message);
	}

}
