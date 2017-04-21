import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { UserPage } from '../pages/user/user';

import { Hosts } from '../pages/hosts/hosts';
import { Host } from '../pages/hosts/host';

import { Base } from "../providers/base";

// npm install firebase angularfire2 --save
import { AngularFireModule } from 'angularfire2'
// npm install @ionic-native/text-to-speech --save
//import { TextToSpeech } from '@ionic-native/text-to-speech';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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
    Hosts,
    Host
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
    Hosts,
    Host
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Base,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
