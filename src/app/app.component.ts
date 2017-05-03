import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
//import { ListPage } from '../pages/list/list';
import { UserPage } from '../pages/user/user';
import { SignoutPage } from '../pages/signout/signout';
import { TasksPage } from '../pages/tasks/tasks';
import { HostsPage } from '../pages/hosts/hosts';
import { DevelopersPage } from '../pages/developers/developers';
import { Base } from '../providers/base';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = UserPage;

  pages: Array<{title: string, component: any}>;

  user: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public base: Base
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Signout', component: UserPage }
    ];
    
  }

  signout() {
    this.base.userSignout(this.nav, UserPage);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
