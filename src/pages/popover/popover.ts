import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Profile } from '../profile/profile';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html'
})
export class PopOverPage {
   constructor(public navCtrl: NavController) {
   }
   

   profilePage(){
   		this.navCtrl.push(Profile);
   }
   
}
