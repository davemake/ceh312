// imports

  import { BrowserModule } from '@angular/platform-browser';
  import { ErrorHandler, NgModule } from '@angular/core';
  import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

  import { MyApp } from './app.component';

  import { UserPage } from '../pages/user/user';
  import { TasksPage } from '../pages/tasks/tasks';
  import { HostsPage } from '../pages/hosts/hosts';
  import { DevelopersPage } from '../pages/developers/developers';
  import { Base } from "../providers/base";

  // http://ionicframework.com/docs/native/image-picker/
  // $ cordova plugin add --save https://github.com/Telerik-Verified-Plugins/ImagePicker
  // $ sudo npm install --save @ionic-native/image-picker
  // import { ImagePicker } from '@ionic-native/image-picker';
  // constructor(private imagePicker: ImagePicker) { }
  // if error: 
  // has no exported member 'IonicNativePlugin'.
  // then: 
  // $ sudo npm uninstall --save @ionic-native/core
  // $ sudo npm install --save @ionic-native/core@latest
  // https://github.com/Telerik-Verified-Plugins/ImagePicker
  import { ImagePicker } from '@ionic-native/image-picker';

  // http://ionicframework.com/docs/native/file/
  // $ cordova plugin add --save cordova-plugin-file
  // $ sudo npm install --save @ionic-native/file
  // import { File } from '@ionic-native/file';
  // constructor(private file: File) { } ...
  // this.file.checkDir(this.file.dataDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesnt exist'));
  import { File } from '@ionic-native/file';

  import { AngularFireModule } from 'angularfire2'
  import { StatusBar } from '@ionic-native/status-bar';
  import { SplashScreen } from '@ionic-native/splash-screen';
  
  // sudo npm install firebase angularfire2 --save
  // sudo npm install @ionic-native/text-to-speech --save
  // import { TextToSpeech } from '@ionic-native/text-to-speech';

// end imports

const fbconfig = {
        apiKey: "AIzaSyAKeCpT2Ray8mH5kCZ1-07KXR-cZnHhs6g",
        authDomain: "ceeh-d3596.firebaseapp.com",
        databaseURL: "https://ceeh-d3596.firebaseio.com",
        projectId: "ceeh-d3596",
        storageBucket: "ceeh-d3596.appspot.com",
        messagingSenderId: "970239756505"
};

@NgModule({
  declarations: [
    MyApp,
    UserPage,
    TasksPage,
    HostsPage,
    DevelopersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(fbconfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserPage,
    TasksPage,
    HostsPage,
    DevelopersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Base,
    ImagePicker,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
