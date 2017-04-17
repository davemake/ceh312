import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var window: any;
declare let cordova: any;

@Injectable()

export class Base {

	image: any;
	newImage: any={name: ''};

	status: any;


	afa: any;
	database: any;
	storage: any;
	auth: any;

	snapshot: any;

	userAuth: any;
	role: any;
	signed: any;
	verified: any;
	profiled: any;

	host: any;
	student: any;
	volunteer: any;

	user: FirebaseObjectObservable<any>;
	users: FirebaseListObservable<any>;
	hosts: FirebaseListObservable<any>;
	files: FirebaseListObservable<any>;
	images: FirebaseListObservable<any>;

	constructor(
		public platform: Platform,
		public af: AngularFire,
		public afd: AngularFireDatabase,
	) {
		window.thisBase = this;
		this.afa = this.afd['fbApp'];
		this.auth = this.afa.auth();
		this.database = this.afa.database();
		this.storage = this.afa.storage();
		this.users = this.afd.list("/users");
		this.hosts = this.afd.list("/hosts");
		this.files = this.afd.list("/files");
		this.images = this.afd.list("/images");
		this.auth.onAuthStateChanged( (user)=> {
			if (user) {
				let userAuth = window.thisBase.userAuth = JSON.parse(JSON.stringify(user));
				let path = "users/"+user.uid;
				window.thisBase.database.ref(path).set(userAuth).then( (data)=> {
					let userAuth = window.thisBase.userAuth
					let path = "users/"+userAuth.uid;
					window.thisBase.database.ref(path).on("value", (data)=> {
						window.thisBase.user = data.val();
					});
				});
			} else {
				window.thisBase.userAuth = null;
				window.thisBase.user = null;
			}
			
		});
    }

	userStateChanged(user) {
		if (user) {
		}
	}

	userSignout() {
		this.auth.signOut()
		.then( console.log("signed out") )
		.catch( this.catchError );
	}
	
	create(many, one) {
		let obj = {
			created: (new Date).getTime(),
			updated: (new Date).getTime()
		}
		this[one] = obj;
		this[one].created = (new Date()).getTime();
		this[one].key = this[many].push(this[one]).key;
		return this[one];
	}

	userSignup(email, password, role) {
		this.status = "Creating User..."
		this.role;
		this.auth.createUserWithEmailAndPassword(email, password)
		.then( this.userSignupSuccess )
		.catch( this.catchError );
	}

	userSignupSuccess(user) {
		user.sendEmailVerification();
		let role = window.thisBase.role;
		window.thisBase[role] = window.thisBase.base[role] = window.thisBase.read(role+"s/"+user.uid);
	}

	userSignin(email, password) {
		this.auth.signInWithEmailAndPassword(email, password).then( (obj)=> {
			return JSON.parse(JSON.stringify(obj));
		}).catch( this.catchError );
	}
	
	read(path) {
		window.thisBase.database.ref(path).on('value', window.thisBase.readSnap, window.thisBase.catchError);
	}

	readSnap(snapshot) {
		window.thisBase.snapshot = snapshot.val();
	}

	update(path, key, data) {
		debugger;
	}

	refDatabase(path, key) {
		return this.database.ref(path+'/'+key);
	}

	refStorage(path, key) {
		return this.storage.ref(path+'/'+key);
	}

	destroy(dir, key) {
		this[dir].remove(key);
	}

	destroyStorage(dir, i) {
		let ref = this.afa.storage().ref(dir+'/'+i.name);
		ref.delete();
		this.destroy(dir, i.$key);
	}

	destroyUser() {
		debugger;
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

	uploadImages() {
		let images = [];
		let files = event.target['files'];
		for (let i in files) {
			let file = files[i];
			if (typeof(file)=="object") {
				images.push(this.uploadFile('images/', file, this.images));
			};
		};
		return images;
	}

	uploadFile(dir, file, arr) {
		let name = this.randomName(file);
		let obj = {name: name};
		let storageRef = this.storage.ref(dir+name);
		storageRef.put(file).then( ()=> {
				arr.push(obj);
		});
		return obj;
	}

	randomName(file) {
		let name;
		let parts;
		let role;
		let time;
		name = Math.random().toString(36).replace(/[^a-z]+/g, '');
		name = name.substring(0,10);
		parts = file.name.split(".");
		time = new Date().getTime();
		role = parts[parts.length-1].toLowerCase();
		name = time+name+"."+role
		return name
	}

	catchError(error) {
		console.log(error.code, error.message);
		window.thisBase.status = error.message;
		alert(error.message);
	}


}