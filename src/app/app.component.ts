import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen ,NativeStorage} from 'ionic-native';

import { HomePage } from '../pages/home/home';
//import { UserPage } from '../pages/user/user';
//import { Services } from '../pages/services/services';
//import { Checkout } from '../pages/checkout/checkout';
//import { Profile } from '../pages/profile/profile';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      NativeStorage.getItem('user')
      .then( (data) => {
        // user is previously logged and we have his data
        // we will let him access the app
        this.rootPage = HomePage;
        Splashscreen.hide();
      }, (error) => {
        //we don't have the user data so we will ask him to log in
        this.rootPage = HomePage;
        Splashscreen.hide();
      });

      StatusBar.styleDefault();

      //StatusBar.styleDefault();
      //Splashscreen.hide();
    });
  }
}
