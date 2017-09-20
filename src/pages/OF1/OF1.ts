import { Component } from '@angular/core';
import { App ,NavController ,NavParams,PopoverController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeStorage } from 'ionic-native';
import { Checkout } from '../checkout/checkout';
import { PopOverPage } from '../popover/popover';

declare var cordova: any;
@Component({
  selector: 'page-OF1',
  templateUrl: 'OF1.html'
})
export class OF1 {
	public form1 = {};
	public service;
	public checkout;

	checkoutForm: FormGroup;
  	public submitAttempt = false;

	constructor(public navCtrl: NavController,params: NavParams ,public formBuilder: FormBuilder,private app: App,public popoverCtrl: PopoverController ) {
		console.dir(params);
		if(params.data.name){
			this.service = {
				ServiceName : params.data.name,
				sellingprice : params.data.sellingprice,
				specialprice : params.data.specialprice
			}
		}
		else{
			this.service = params.data.ServiceDetails
		}
		  

		 NativeStorage.getItem('user')
			  .then(
			    data => {
			    	this.form1 = data; 
			    },
			    error => console.error(error)
			  );



		this.checkoutForm = formBuilder.group({
	        serviceName: ['',[Validators.maxLength(100),Validators.required] ],
	        FirstName: ['',[Validators.maxLength(30),Validators.required] ],
	        LastName: ['',[Validators.maxLength(30),Validators.required] ],
	        remarks: ['',[Validators.maxLength(300)] ],
	        Gender: ['', Validators.required ],
	        DateOfBirth: ['', Validators.required ],
	        TimeOfBirth: ['', Validators.required ],
	        PlaceOfBirth: ['',Validators.required],
	        PhoneNumber: ['',[Validators.required,Validators.maxLength(10),Validators.minLength(10), Validators.pattern('^(0|[1-9][0-9]*)$')]],
	        ContactName: ['',[Validators.maxLength(30),Validators.required] ],
	        Email: ['',Validators.required],

	    });
	}

	 
	checkOut(){
		  if(this.checkoutForm.valid){
		  	let nav = this.app.getRootNav();
			NativeStorage.getItem('CheckOut')
			  .then(
			    data => {
					console.dir('data');
					 var dataArr = JSON.parse(data);
					 dataArr.push({From: 'of1', Data: this.form1 , service : this.service});
					 console.dir(dataArr);
					 NativeStorage.setItem('CheckOut',JSON.stringify(dataArr));
					 nav.push(Checkout);
			    },
			    error => {
					 var dataArr = [];
					 dataArr.push({From: 'of1', Data: this.form1 , service : this.service});
					 NativeStorage.setItem('CheckOut',JSON.stringify(dataArr));
					 nav.push(Checkout);
				}
			  );
		 
	      	this.submitAttempt = false;
		  }
		  else{
		  	this.submitAttempt = true;
		  }
	}

	presentPopover(ev) {
      let popover = this.popoverCtrl.create(PopOverPage);
      popover.present({
        ev: ev
      });
    }
 
}