import { Component } from '@angular/core';

import { ToastController } from 'ionic-angular';

import { Kpreports } from '../kpreports/kpreports';
 
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

 

  constructor(private toastCtrl: ToastController) {
    this.tabs = [
      { id: '1' , title: "ReportService", root: Kpreports },
      { id: '2' , title: "MuhurtaService", root: Kpreports },
      { id: '3' , title: "MatchMaking", root: Kpreports },
      { id: '4' , title: "LuckyGems", root: Kpreports },
      { id: '5' , title: "LuckyRudraksha", root: Kpreports },
      { id: '6' , title: "LuckyNumbers", root: Kpreports },
      { id: '7' , title: "NammaNakshatras", root: Kpreports }
    ];
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
