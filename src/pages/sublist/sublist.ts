import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import { OF1 } from '../OF1/OF1';
import { OF2 } from '../OF2/OF2';
import { OF3 } from '../OF3/OF3';
import { OF4 } from '../OF4/OF4';
import { OF5 } from '../OF5/OF5';

@Component({
  selector: 'page-sublist',
  templateUrl: 'sublist.html'
})
export class Sublist {
  
  public items;

  constructor(public navCtrl: NavController,params : NavParams) {
      this.items =  params.data.sublist;
  }

  itemSelected(item) {
    console.log("Selected Item", item);
    if(item.redirect == 'form'){
      if(item.form == 'OF1'){
        this.navCtrl.push(OF1,item);
      }
      else if(item.form == 'OF2'){
        this.navCtrl.push(OF2,item);
      }
      else if(item.form == 'OF3'){
        this.navCtrl.push(OF3,item);
      }
      else if(item.form == 'OF4'){
        this.navCtrl.push(OF4,item);
      }
      else if(item.form == 'OF5'){
        this.navCtrl.push(OF5,item);
      }

    }    
  }

}
