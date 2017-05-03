import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';

declare var window: any;
declare var cordova: any;

@Injectable()

export class Base {

// vars
	image: any;
	newImage: any={name: ''};
	
	afa: any;
	database: any;
	storage: any;
	auth: any;

	snapshot: any;

	role: any;
	signed: any;
	verified: any;
	profiled: any;

	passAuth: any;
	userAuth: any;
	user: any;
	isMobile: any;

	host: any;
	student: any;
	volunteer: any;

	users: FirebaseListObservable<any>;
	logs: FirebaseListObservable<any>;
	hosts: FirebaseListObservable<any>;
	students: FirebaseListObservable<any>;
	volunteers: FirebaseListObservable<any>;
	developers: FirebaseListObservable<any>;
	agents: FirebaseListObservable<any>;
	files: FirebaseListObservable<any>;
	images: FirebaseListObservable<any>;
// end vars

// constructor
	constructor(
		public platform: Platform,
		public af: AngularFire,
		public afd: AngularFireDatabase,
		public ionicStorage: Storage
	) {
		window.thisBase = this;
		this.afa = this.afd['fbApp'];
		this.auth = this.afa.auth();
		this.database = this.afa.database();
		this.storage = this.afa.storage();
		this.users = this.afd.list("/users");
		this.logs = this.afd.list("/users");
		this.hosts = this.afd.list("/hosts");
		this.students = this.afd.list("/students");
		this.volunteers = this.afd.list("/volunteers");
		this.developers = this.afd.list("/developers");
		this.files = this.afd.list("/files");
		this.images = this.afd.list("/images");
		this.isMobile = this.isMobileCheck();
		this.auth.onAuthStateChanged( this.userChanged );
    }
// end constructor

	memorizeUser() {
		let storage = this.ionicStorage;
		if (this.user) {
			storage.ready().then(() => {
				storage.set('user', [this.user]).then(() => {
					console.log("memorize user", this.user);
				});
				storage.set('userAuth', [this.userAuth]).then(() => {
					console.log("memorize userAuth", this.userAuth);
				});
			});
		} else {
			storage.ready().then(() => {
				storage.set('user', []).then(() => {
					console.log("forget user");
				});
				storage.set('userAuth', []).then(() => {
					console.log("forget userAuth");
				});
			});
		}
	}

	rememberUser(nav, page) {
		if (!this.user) {
			let user = this.user;
			let storage = this.ionicStorage;
			storage.ready().then(() => {
				if (!this.userAuth) {
					storage.get('userAuth').then((data) => {
						if (data) {
							this.userAuth = data[0];
							console.log("remember userAuth", this.userAuth);
						}
					});
				}
				if (!this.user) {
					storage.get('user').then((data) => {
						if (data) {
							this.user = data[0];
							console.log("remember user", this.user);
						}
					});
				}
			});
			let i = 300;
			let myTimer = setInterval( ()=>{
				console.log(i--);
				if ( i<0 || (user!=this.user && typeof(this.user)==='object') ) {
					console.log(this.user);
					clearInterval(myTimer);
					nav.setRoot(page, {role: this.user.role});
				}
			}, 100);
		}
	}

	uploadFiles(path) {
		let files = event.target['files'];
		for (let i in files) {
			let file = files[i];
			if (typeof(file)=="object") {
				let name = this.randomName(file.name);
				let path_database = this.uploadFile(path, name, file);
				// save name to users/uid/hosts/key/images|files/key=name
				this.afd.list(path_database).push(name);
			};
		};
	}

	uploadFile(path, name, file) {
		let path_storage;
		let path_database;
		let naming = name.split(".");
		let last = naming.length-1;
		let type = naming[last];
		if ("jpg jpeg tiff gif bmp png svg".match(type)) {
			path_storage = path+"/images/"+name;
			path_database = path+"/images";
		} else {
			path_storage = path+"/files/"+name;
			path_database = path+"/files";
		};
		let ref = this.storage.ref(path_storage);
		ref.put(file);
		return path_database;
	}

	log(path, action) {
		let user = this.user;
		if (user) {

		}
		// transfer path
		// transfer mode
		// transfer memo
		// get location
		// get time
	}
	
	userChanged(passAuth) {
		window.thisBase.passAuth = passAuth;
		if (passAuth) {
			let userAuth = window.thisBase.userAuth = JSON.parse(JSON.stringify(passAuth));
			let path = "users/"+window.thisBase.userAuth.uid+"/email";
			let data = window.thisBase.userAuth.email;
		window.thisBase.database.ref(path).set(data).then( ()=>{
			let path = "users/"+window.thisBase.userAuth.uid+"/emailVerified";
			let data = window.thisBase.userAuth.emailVerified;
		window.thisBase.database.ref(path).set(data).then( ()=>{
			let path = "users/"+window.thisBase.userAuth.uid+"/isAnonymous";
			let data = window.thisBase.userAuth.isAnonymous
		window.thisBase.database.ref(path).set(data).then( ()=>{
			let path = "users/"+window.thisBase.userAuth.uid+"/uid";
			let data = window.thisBase.userAuth.uid;
		window.thisBase.database.ref(path).set(data).then( ()=>{
			let path = "users/"+window.thisBase.userAuth.uid;
		window.thisBase.database.ref(path).on("value", (data)=> {
			let user = window.thisBase.user = data.val();
			let path = user.role+"s/"+user.uid;
		window.thisBase.database.ref(path).on("value", (data)=> {
			let obj = data.val();
			let role = window.thisBase.user.role;
			window.thisBase[role]=obj;
		});
		});
		});
		});
		});
		});
		} else {
			window.thisBase.passAuth = null;
			window.thisBase.userAuth = null;
			window.thisBase.user = null;
		}
	}

	userSignup(email, password, role) {
		this.role = role;
		this.auth.createUserWithEmailAndPassword(email, password).then( (auth)=>{
				auth.sendEmailVerification();
				window.thisBase.userAuth = JSON.parse(JSON.stringify(auth));
				let path = "users/"+window.thisBase.userAuth.uid+"/created";
				let data = (new Date).getTime();
		window.thisBase.database.ref(path).set(data).then( ()=>{
				let path = "users/"+window.thisBase.userAuth.uid+"/role";
				let data = window.thisBase.role;
		window.thisBase.database.ref(path).set(data).then( ()=>{
				let path = "users/"+window.thisBase.userAuth.uid;
		window.thisBase.database.ref(path).on("value", (data)=> {
				window.thisBase.user = data.val();
				let role = window.thisBase.role;
				let path = role+"s/"+window.thisBase.userAuth.uid;
		window.thisBase[role] = window.thisBase.database.ref(path).set({created: (new Date).getTime()});
		});
		});
		});
		}).catch( this.catchError );
	}

	userSignin(email, password) {
		this.auth.signInWithEmailAndPassword(email, password).catch( this.catchError );
	}

	userSignout(nav, page) {
		this.auth.signOut().then( ()=>{
			console.log("signed out");
		}).catch( this.catchError );
		this.user = null;
		this.userAuth = null;
		this.memorizeUser();
		nav.setRoot(page);
	}

	userDestroy() {
		let user = this.user;
		if (user) {
			this.role = user.role;
			this.passAuth.delete().then( ()=>{
				let id = window.thisBase.userAuth.uid;
				window.thisBase.users.remove(id);
				switch (window.thisBase.role) {
					case "host":
						setTimeout( ()=>{ 
							window.thisBase.hosts.remove(id);
						}, 100);
						break;
					case "student":
						setTimeout( ()=>{ 
							window.thisBase.students.remove(id);
						}, 100);
						break;
					case "volunteer":
						setTimeout( ()=>{ 
							window.thisBase.volunteers.remove(id);
						}, 100);
						break;
				}
				console.log("user destroyed");
				window.thisBase.user = null;
				window.thisBase.userAuth = null;
			}).catch( this.catchError );
		}
	}
	
	create(path) {
		let objs = this.afd.list(path);
		let obj = {
			created: (new Date).getTime(),
			key: '',
			path: ''
		};
		obj.key = objs.push(obj).key;
		obj.path = path+"/"+obj.key;
    	this.log(obj.path, "create");
		this.database.ref(obj.path).set(obj).catch( this.catchError );
		return obj;
	}
	
	read(path) {
		window.thisBase.snapshot = null;
		window.thisBase.database.ref(path).on('value', (snapshot) => {
			window.thisBase.snapshot = snapshot.val();
		}, window.thisBase.catchError);
		return window.thisBase.snapshot;
	}

	update(path, data) {
		debugger;
	}

	refDatabase(path, key) {
		return this.database.ref(path+'/'+key);
	}

	refStorage(path, key) {
		return this.storage.ref(path+'/'+key);
	}

	destroy(path) {
		this.database.ref(path).delete();
		debugger;
		// check if storage
		// destroy storage
	}

	imageId(i) {
		let storageRef = this.storage.ref('images/'+i.name);
		let key = i.$key;
		//let name = i.name;
		storageRef.getDownloadURL().then( (url)=> {
			if (document.getElementById(key)) {
				document.getElementById(key).setAttribute('src', url);
			};
		});
		return key;
	}	

	randomName(fullname) {
		let name;
		let parts;
		let type;
		let time;
		name = Math.random().toString(36).replace(/[^a-z]+/g, '');
		name = name.substring(0,10);
		if (fullname) {
			parts = fullname.split(".");
			time = new Date().getTime();
			type = parts[parts.length-1].toLowerCase();
			name = time+name+"."+type;
		} else {
			time = new Date().getTime();
			name = time+name;
		}
		return name
	}

	catchError(error) {
		alert(error.message);
		console.log(error.code, error.message);
		window.thisBase.status = error.message;
	}
	
	watchUser(nav, page) {
		let i = 300;
		let user = this.user;
		let myTimer = setInterval( ()=>{
			console.log(i--);
			if ( i<0 || (user!=this.user && typeof(this.user)==='object') ) {
				console.log(this.user);
				clearInterval(myTimer);
				this.memorizeUser();
				nav.setRoot(page, {role: this.user.role});
			}
		}, 100);
	}

	isMobileCheck() {
		if (window.cordova) {
			return true;
		} else {
			return false;
		}
	}

}
