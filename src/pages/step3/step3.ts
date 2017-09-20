import { Component } from '@angular/core'; 
import { App ,NavController ,NavParams, ToastController} from 'ionic-angular';
import { RegistrationSuccess } from '../registrationSuccess/registrationSuccess';
import {Http, Headers, URLSearchParams } from "@angular/http";

declare var cordova: any;

@Component({
  selector: 'page-step3',
  templateUrl: 'step3.html'
})
export class RgStep3 {
	public user;

	constructor(public navCtrl: NavController,params: NavParams, public toastCtrl: ToastController,private app: App, public http : Http) {
		this.http = http;
		this.user  = params.get('user');
		console.dir(this.user);
	}
  
	private presentToast(text) {
	  let toast = this.toastCtrl.create({
	    message: text,
	    duration: 3000,
	    position: 'top'
	  });
	  toast.present();
	}
	 
	doRegistration(){
		if(this.user){
			let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
		    
		    let urlSearchParams = new URLSearchParams();
		    urlSearchParams.append('Email', this.user.Email);
		    urlSearchParams.append('PhoneNumber', this.user.PhoneNumber);
		    urlSearchParams.append('Role', this.user.role);
		    urlSearchParams.append('UserDetails.FirstName', this.user.UserDetails.FirstName);
		    urlSearchParams.append('UserDetails.LastName', this.user.UserDetails.LastName);
		    urlSearchParams.append('UserDetails.DateOfBirth', this.user.UserDetails.DateOfBirth);
		    urlSearchParams.append('UserDetails.TimeOfBirth', this.user.UserDetails.TimeOfBirth);
		    urlSearchParams.append('UserDetails.PlaceOfBirth', this.user.UserDetails.PlaceOfBirth);
		    urlSearchParams.append('UserDetails.Latitude', this.user.UserDetails.Latitude);
		    urlSearchParams.append('UserDetails.Longitude', this.user.UserDetails.Longitude);
		    urlSearchParams.append('UserDetails.DayLightSavings', this.user.UserDetails.DayLightSavings);
		    urlSearchParams.append('UserDetails.TimeZone', this.user.UserDetails.TimeZone);
		    urlSearchParams.append('UserDetails.UTC', this.user.UserDetails.UTC);
		    urlSearchParams.append('UserDetails.Gender', this.user.UserDetails.Gender);
		    let body = urlSearchParams.toString()

	      	this.http.post('http://dariservices.azurewebsites.net/api/Account/Register',body,{headers : headers} )
	      		.map(res => res.json())
			    	.subscribe(data => {
								this.navCtrl.push(RegistrationSuccess);
							}, error => {
								this.presentToast(JSON.parse(error._body).Message);
						});
	      	
	      	
		}
		 
	}

	public Edit(){
	      	this.navCtrl.parent.select(0);
	}
}