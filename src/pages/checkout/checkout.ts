import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class Checkout {
	public userDetails;
	public from;
	constructor(public navCtrl: NavController,params: NavParams) {
		this.from = params.data.from;
		this.userDetails = params.data.data;
		console.dir(params);
	}

}
