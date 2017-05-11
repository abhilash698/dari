import { Component } from '@angular/core';
import { App ,NavController ,NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeStorage } from 'ionic-native';
import { Checkout } from '../checkout/checkout';

declare var cordova: any;
@Component({
  selector: 'page-OF3',
  templateUrl: 'OF3.html'
})
export class OF3 {
	public form1 = {};
	public serviceName;
	checkoutForm: FormGroup; 
  	public submitAttempt = false;

	constructor(public navCtrl: NavController,params: NavParams ,public formBuilder: FormBuilder,private app: App ) {
		 this.serviceName = params.data.name;
		  NativeStorage.getItem('user')
			  .then(
			    data => {
			    	this.form1 = data;
			    },
			    error => console.error(error)
			  );



		this.checkoutForm = formBuilder.group({
	        serviceName: ['',[Validators.maxLength(100),Validators.required] ],
	        username: ['',[Validators.maxLength(30),Validators.required] ],
	        surname: ['',[Validators.maxLength(30),Validators.required] ],
	        lastname: ['',[Validators.maxLength(30),Validators.required] ],
	        remarks: ['',[Validators.maxLength(300)] ],
	        sex: ['', Validators.required ],
	        dob: ['', Validators.required ],
	        dot: ['', Validators.required ],
	        birthplace: ['',Validators.required],
	        lat: ['', Validators.required ],
	        long: ['', Validators.required ],
	        utc: ['', Validators.required ],
	        tz: ['', Validators.required ],
	        dst: ['',Validators.required],
	        wt: ['',Validators.required],
	        mobile: ['',Validators.required],
	        email: ['',Validators.required],

	    });
	}

	 
	checkOut(){
		  if(this.checkoutForm.valid){
	      	let nav = this.app.getRootNav();
			nav.push(Checkout,{from: 'of3', data: this.form1});
	      	this.submitAttempt = false;
		  }
		  else{
		  	this.submitAttempt = true;
		  }
	}
}