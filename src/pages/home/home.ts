import { Component } from '@angular/core';
import { Facebook,GooglePlus,NativeStorage } from 'ionic-native'; 
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationPage } from '../registration/registration';
import { UserPage } from '../user/user';
import { ForgotPassword } from '../forgot-password/forgot-password';
import {Http, Headers, URLSearchParams,RequestOptions } from "@angular/http";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   FB_APP_ID: number = 603484359856560;
   loginCred = {login: '' ,password: ''};
   loginForm : FormGroup;
   submitAttempt = false; 

   constructor(public navCtrl: NavController,public formBuilder: FormBuilder,public http: Http) {
   		Facebook.browserInit(this.FB_APP_ID, "v2.8");
			 this.http = http;
   		this.loginForm = formBuilder.group({
	        login: ['',[Validators.maxLength(30),Validators.required] ],
	        password: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(4)] ]	        
	    });
   }

   GotoRegistration(){
      this.navCtrl.push(RegistrationPage);
   }

   GotoForgot(){
      this.navCtrl.push(ForgotPassword);
   }

	 sendToken(token,type){
				let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
				let urlSearchParams = new URLSearchParams();
				urlSearchParams.append('access_token', token);
				let body = urlSearchParams.toString()
				let url = '';
					if(type == 'fb'){
						url = 'http://dariservices.azurewebsites.net/api/FbLogin';
					}
					else{
						url = 'http://dariservices.azurewebsites.net/googlelogin';
					}
					this.http.post(url,body,{headers : headers} )
						.map(res => res.json())
						.subscribe(data => {
							
								let headers = new Headers();
								headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
								headers.append('Authorization', 'Bearer ' + data.access_token);
								var options = new RequestOptions({headers: headers});

								NativeStorage.setItem('token',
								{
									access_token: data.access_token
								});
								
								this.http.get('http://dariservices.azurewebsites.net/api/Account/Profile',options).map(res => res.json())
								.subscribe(userData => {
										console.dir(userData);
										var userDetails = {
											UserId:userData.UserId,
											FirstName: userData.FirstName,
											LastName: userData.LastName,
											Gender: userData.Gender,
											Email: userData.Email,
											DateOfBirth: userData.DateOfBirth,
											TimeOfBirth: userData.TimeOfBirth,
											PlaceOfBirth: userData.PlaceOfBirth,
											Latitude: userData.Latitude,
											Longitude : userData.Longitude,
											TimeZone: userData.TimeZone,
											UTC: userData.UTC,
											DayLightSavings: userData.DayLightSavings,
											ProfileImage: userData.ProfileImage,
											BillingAddress : {},
											ShippingAddress : {}
										};
										if(userData.BillingAddress){
											userDetails.BillingAddress = userData.BillingAddress;
										}
										else{
											userDetails.BillingAddress = {
												AddressId : '',
												AddressType : '',
												HouseNumber : '',
												Street : '',
												City : '',
												State : '',
												Country : '',
												Pincode : '',
												Latitude : '',
												Longitude : '',
											}
										}
										if(userData.ShippingAddress){
											userDetails.ShippingAddress = userData.ShippingAddress;
										}
										else{
											userDetails.ShippingAddress = {
												AddressId : '',
												AddressType : '',
												HouseNumber : '',
												Street : '',
												City : '',
												State : '',
												Country : '',
												Pincode : '',
												Latitude : '',
												Longitude : '',
											}
										}
										NativeStorage.setItem('user',userDetails).then(() => {
												this.navCtrl.setRoot(UserPage);
										}, function (error) {
												console.log(error);
										});
								}, error => {
									this.submitAttempt = true;
								});
						
					}, error => {
					this.submitAttempt = true;
				});
	 }

   doFbLogin(){
		 let env = this;
		 let permissions = new Array<string>();
		 permissions = ["public_profile","email"];
		  Facebook.login(permissions)
			.then(function(response){
						env.sendToken(response.authResponse.accessToken,'fb');
			});
		}

	doGoogleLogin(){
		let env = this;
		
		GooglePlus.login({
			'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
			'webClientId': '737041385160-4g61tmsafpjo47q7oka72ehvrbqptal1.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
			'offline': true
		})
		.then(function (user) {
		 
			console.dir(user);
		}, function (error) {
			 
		});
	}

	doEmailLogin(){
		if(this.loginForm.valid){
			this.submitAttempt = false;
			let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
		    
		    let urlSearchParams = new URLSearchParams();
		    urlSearchParams.append('grant_type', 'password');
		    urlSearchParams.append('username', this.loginCred.login);
		    urlSearchParams.append('password', this.loginCred.password);
		    let body = urlSearchParams.toString()

	      	this.http.post('http://dariservices.azurewebsites.net/token',body,{headers : headers} )
	      		.map(res => res.json())
			    .subscribe(data => {
			    	console.dir(data.access_token);

						let headers = new Headers();
						headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
						headers.append('Authorization', 'Bearer ' + data.access_token);
						var options = new RequestOptions({headers: headers});

						NativeStorage.setItem('token',
						{
							access_token: data.access_token
						});
						
						this.http.get('http://dariservices.azurewebsites.net/api/Account/Profile',options).map(res => res.json())
						.subscribe(userData => {
								var userDetails = {
									UserId:userData.UserId,
									FirstName: userData.FirstName,
									LastName: userData.LastName,
									Gender: userData.Gender,
									Email: userData.Email,
									DateOfBirth: userData.DateOfBirth,
									TimeOfBirth: userData.TimeOfBirth,
									PlaceOfBirth: userData.PlaceOfBirth,
									Latitude: userData.Latitude,
									Longitude : userData.Longitude,
									TimeZone: userData.TimeZone,
									UTC: userData.UTC,
									DayLightSavings: userData.DayLightSavings,
									ProfileImage: userData.ProfileImage,
									BillingAddress : {},
									ShippingAddress : {}
								};
								if(userData.BillingAddress){
									userDetails.BillingAddress = userData.BillingAddress;
								}
								else{
									userDetails.BillingAddress = {
										AddressId : '',
										AddressType : '',
										HouseNumber : '',
										Street : '',
										City : '',
										State : '',
										Country : '',
										Pincode : '',
										Latitude : '',
										Longitude : '',
									}
								}
								if(userData.ShippingAddress){
									userDetails.ShippingAddress = userData.ShippingAddress;
								}
								else{
									userDetails.ShippingAddress = {
										AddressId : '',
										AddressType : '',
										HouseNumber : '',
										Street : '',
										City : '',
										State : '',
										Country : '',
										Pincode : '',
										Latitude : '',
										Longitude : '',
									}
								}
								NativeStorage.setItem('user',userDetails).then(() => {
										this.navCtrl.setRoot(UserPage);
								}, function (error) {
										console.log(error);
								});
						}, error => {
							this.submitAttempt = true;
						});
			    	
			    }, error => {
				 	this.submitAttempt = true;
				});
	      	
	        
		}
		else{
		  	this.submitAttempt = true;
		}
	}
   
}

 