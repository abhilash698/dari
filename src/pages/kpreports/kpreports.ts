import { Component } from '@angular/core';

import { NavController,NavParams,App  } from 'ionic-angular';
import { Sublist } from '../sublist/sublist';

@Component({
  selector: 'page-kpreports',
  templateUrl: 'kpreports.html'
})
export class Kpreports {
  
  public items;

  constructor(public navCtrl: NavController,params : NavParams,public app : App) {
    this.items = params.data.sublist;
  }

  itemSelected(item) {
    console.log("Selected Item", item);
    if(item.redirect == 'form'){
      // this.navCtrl.push(item.form);
    }
    else{
      let nav = this.app.getRootNav();
      nav.push(Sublist, item);
    }
    
  }

}
