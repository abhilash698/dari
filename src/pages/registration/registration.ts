import { Component,ViewChild } from '@angular/core';

import { NavController, Tabs ,NavParams } from 'ionic-angular';
import { RgStep1 } from '../step1/step1';
import { RgStep2 } from '../step2/step2';
import { RgStep3 } from '../step3/step3';

@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html'
})
export class RegistrationPage {
  public user = {user : { UserDetails : { FirstName : '' , LastName : ''} , userType : { one : false , two : true , three: true} } };

  @ViewChild('RegistrationPage') tabRef: Tabs;
  step1root: any;
  step2root: any;
  step3root: any;

  constructor(public navCtrl: NavController,params : NavParams) {
    params.data = this.user;
    this.step1root = RgStep1;
    this.step2root = RgStep2;
    this.step3root = RgStep3;

  }


}
