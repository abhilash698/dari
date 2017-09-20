import { NavController,ViewController,App } from 'ionic-angular';
import { Component } from '@angular/core';
import { Profile } from '../profile/profile';
import { Checkout } from '../checkout/checkout';
import { HomePage } from '../home/home';
import {NativeStorage } from 'ionic-native';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopOverPage {
   constructor(public navCtrl: NavController,public viewCtrl: ViewController,public app : App) {
   }
  
   profilePage(){
      this.viewCtrl.dismiss().then(() => {
        this.app.getRootNav().push(Profile);
      });
   }

   cartPage(){
      this.viewCtrl.dismiss().then(() => {
        this.app.getRootNav().push(Checkout);
      });
   }

   logout(){
     NativeStorage.clear();
     this.navCtrl.push(HomePage);
   }
   
}
