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

	role: any;
	signed: any;
	verified: any;
	profiled: any;

	passAuth: any;
	userAuth: any;
	user: any;

	host: any;
	student: any;
	volunteer: any;

	users: FirebaseListObservable<any>;
	hosts: FirebaseListObservable<any>;
	students: FirebaseListObservable<any>;
	volunteers: FirebaseListObservable<any>;
	owners: FirebaseListObservable<any>;
	agents: FirebaseListObservable<any>;
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
		this.students = this.afd.list("/students");
		this.volunteers = this.afd.list("/volunteers");
		this.files = this.afd.list("/files");
		this.images = this.afd.list("/images");
		this.auth.onAuthStateChanged( this.userChanged );
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
						let data = window.thisBase.userAuth.uid
						window.thisBase.database.ref(path).set(data).then( ()=>{
							let path = "users/"+window.thisBase.userAuth.uid;
							window.thisBase.database.ref(path).on("value", (data)=> {
								window.thisBase.user = data.val();
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
						window.thisBase[role] = window.thisBase[role] = window.thisBase.database.ref(path).set({created: (new Date).getTime()});
					});
				});
			});
		}).catch( this.catchError );
	}

	userSignin(email, password) {
		this.auth.signInWithEmailAndPassword(email, password).catch( this.catchError );
	}

	userSignout() {
		this.auth.signOut().then( ()=>{
			console.log("signed out");
			window.thisBase.user = null;
			window.thisBase.userAuth = null;
		}).catch( this.catchError );
	}

	userDestroy() {
		let user = this.user;
		if (user) {
			this.role = user.role;
			this.passAuth.delete().then( ()=>{
				let id = window.thisBase.userAuth.uid;
				let role = window.thisBase.role;
				switch (role) {
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
				window.thisBase.users.remove(id);
			}).catch( this.catchError );
		}
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
		alert(error.message);
		console.log(error.code, error.message);
		window.thisBase.status = error.message;
	}


}
