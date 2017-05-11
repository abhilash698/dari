import { Component } from '@angular/core';
import { NavController,PopoverController  } from 'ionic-angular';
import { Services } from '../services/services';
import { PopOverPage } from '../popover/popover';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
   constructor(public navCtrl: NavController,public popoverCtrl: PopoverController) {
   }
   
   GotoServices(){
      this.navCtrl.push(Services);
   }

   presentPopover(ev) {
     let popover = this.popoverCtrl.create(PopOverPage);
     popover.present({
       ev: ev
     });
   }
}
