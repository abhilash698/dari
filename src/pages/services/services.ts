import { Component } from '@angular/core';
import { ToastController,NavParams,PopoverController } from 'ionic-angular';
import { Kpreports } from '../kpreports/kpreports';
import { PopOverPage } from '../popover/popover';
import {Http, Headers, RequestOptions } from "@angular/http";
import { OF1 } from '../OF1/OF1';
 
@Component({
  templateUrl: 'services.html',
  selector: 'page-services'
})
export class Services {

  // this tells the tabs component which Pages
  // should be each tab's root Page
  

  selectedTabIndex: number = 1;
  tabsColor: string = "grey-cust";
  tabsMode: string = "md";
  tabsPlacement: string = "top";
  public tabs; 

 

  constructor(private toastCtrl: ToastController,public popoverCtrl: PopoverController, public http: Http,params: NavParams) {
      this.tabs = params.data.tabs;
      this.tabs.forEach(element => {
        if(element.sublist.length){
          element.root = Kpreports;
          element.ServiceDetails = {};
        }
        else{
          element.root = OF1;
          element.ServiceDetails = { ServiceName : element.title , sellingprice : element.sellingprice , specialprice : element.specialprice}; 
        }
        
      });
      console.dir(this.tabs);
  }

  ngOnInit(){
     
  }

  presentPopover(ev) {
     let popover = this.popoverCtrl.create(PopOverPage);
     popover.present({
       ev: ev
     });
   }

  selectTab(index: number) {
    this.selectedTabIndex = index;
  }

  presentChangeOrendationToast() {
    let toast = this.toastCtrl.create({
      message: 'Rotate screen to rerendering.',
      duration: 2000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
}