import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AngularFire, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

declare var window: any;
declare let cordova: any;

@Injectable()

export class Base {

	image: any;
	newImage: any={name: ''};

	host: any;
	hostObj: any={
		created: '',
		updated: '',
		who: {
			title: '',
		},
		where: {
			title: '',
		},
		what: {
			title: '',
		},
	};


	afa: any;
	database: any;
	storage: any;
	auth: any;

	snap: any;

	currentUser: any;
	user: any;
	role: any;
	signed: any;
	verified: any;
	profiled: any;

	student: any;
	volunteer: any;

	users: FirebaseListObservable<any>;
	hosts: FirebaseListObservable<any>;
	files: FirebaseListObservable<any>;
	images: FirebaseListObservable<any>;

	constructor(
		public platform: Platform,
		public af: AngularFire,
		public afd: AngularFireDatabase,
	) {
		window.this = this;
		this.afa = this.afd['fbApp'];
		this.auth = this.afa.auth();
		this.database = this.afa.database();
		this.storage = this.afa.storage();
		this.users = this.afd.list("/users");
		this.hosts = this.afd.list("/hosts");
		this.files = this.afd.list("/files");
		this.images = this.afd.list("/images");
		this.auth.onAuthStateChanged( this.userStateChanged );
    }

	userStateChanged(user) {
		if (user) {
			window.this.currentUser = user;
			window.this.signed = (new Date).getTime();
			if (user.emailVerified) {
				window.this.verified = window.this.signed;
			}
		}
	}

	
	signinUser(email, password) {
		this.auth.signInWithEmailAndPassword(email, password).catch( (error)=> {
			// handle errors here.
			alert(error.code+" "+error.message);
		});
	}

	signout() {
		this.auth.signOut().then( ()=> {
			// Sign-out successful.
		}).catch( (error)=> {
			// An error happened.
		});
	}
	
	create(many, one) {
		this[one] = this.hostObj;
		this[one].created = (new Date()).getTime();
		this[one].key = this[many].push(this[one]).key;
		return this[one];
	}

	read(path, key) {
		this.database.ref(path+'/'+key).on('value', this.readSnap, this.readSnapError);
		return this.snap;
	}

	update(path, key, data) {
		debugger;
	}

	readSnap(snapshot) {
		window.this.snap = snapshot.val();
	}

	readSnapError(error) {
		alert(error);
	}

	refDatabase(path, key) {
		return this.database.ref(path+'/'+key);
	}

	refStorage(path, key) {
		return this.storage.ref(path+'/'+key);
	}

	destroyStorage(dir, i) {
		let ref = this.afa.storage().ref(dir+'/'+i.name);
		ref.delete();
		this.destroyData(dir, i);
	}

	destroyData(dir, i) {
		this[dir].remove(i.$key);
	}

	showImage(i) {
		let storageRef = this.storage.ref('images/'+i.name);
		let key = i.$key;
		let name = i.name;
		storageRef.getDownloadURL().then( (url)=> {
			if (document.getElementById(key)) {
				document.getElementById(key).setAttribute('src', url);
			};
		});
		return "\<img id='"+key+"'\>"
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
		let task = storageRef.put(file).then( ()=> {
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


}