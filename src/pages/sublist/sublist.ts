import { Component } from '@angular/core';

import { NavController,NavParams,PopoverController } from 'ionic-angular';
import { OF1 } from '../OF1/OF1';
import { OF2 } from '../OF2/OF2';
import { OF3 } from '../OF3/OF3';
import { OF4 } from '../OF4/OF4';
import { OF5 } from '../OF5/OF5';
import { PopOverPage } from '../popover/popover';

@Component({
  selector: 'page-sublist',
  templateUrl: 'sublist.html'
})
export class Sublist {
  
  public items;
  public title;

  constructor(public navCtrl: NavController,params : NavParams,public popoverCtrl: PopoverController) {
      this.items =  params.data.sublist;
      this.title = params.data.name;
  }

  itemSelected(item) {
    if(item.redirect == 'form'){
      if(item.form == 'Order Form 1'){
        this.navCtrl.push(OF1,item);
      }
      else if(item.form == 'Order Form 2'){
        this.navCtrl.push(OF1,item);
      }
      else if(item.form == 'Order Form 3'){
        this.navCtrl.push(OF1,item);
      }
      else if(item.form == 'Order Form 4'){
        this.navCtrl.push(OF1,item);
      }
      else if(item.form == 'Order Form 5'){
        this.navCtrl.push(OF1,item);
      }

    }    
  }

  presentPopover(ev) {
     let popover = this.popoverCtrl.create(PopOverPage);
     popover.present({
       ev: ev
     });
   }

}
