import { Component } from '@angular/core';
import { NativeStorage } from 'ionic-native';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class Checkout {
	public CheckOut;
	constructor(public navCtrl: NavController,params: NavParams) {
		NativeStorage.getItem('CheckOut')
			  .then(
			    data => {
						this.CheckOut = JSON.parse(data);
						console.dir(this.CheckOut); 
			    },
			    error => {
						console.log('error occured');
					}
			  );
	}

	deleteCart(item){
		var index = this.CheckOut.indexOf(item);
		if(index > -1){
			this.CheckOut.splice(index,1);
			NativeStorage.setItem('CheckOut',JSON.stringify(this.CheckOut));
		}
	}

}
