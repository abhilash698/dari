import { Component } from '@angular/core'; 
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { HomePage } from '../home/home';
import {Http, Headers, URLSearchParams,RequestOptions } from "@angular/http";


@Component({
  selector: 'forgot-password',
  templateUrl: 'forgot-password.html'
})
export class ForgotPassword {
   loginCred = {LoginKey: ''};
   ForgotPassword : FormGroup;
   submitAttempt = false; 
   successForgot = false; 
   spinner = false;
   message = 'Enter Valid Email';

   constructor(public navCtrl: NavController,public formBuilder: FormBuilder,public http: Http) {
		this.http = http;
   		this.ForgotPassword = formBuilder.group({
	        LoginKey: ['',Validators.required ]        
	    });
   }

   GotoLogin(){
      this.navCtrl.push(HomePage);
   }

	doForgotPassword(){
		if(this.ForgotPassword.valid){
			this.submitAttempt = false;
            this.spinner = true;
			let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });
		    
		    let urlSearchParams = new URLSearchParams(); 
		    urlSearchParams.append('LoginKey', this.loginCred.LoginKey); 
		    let body = urlSearchParams.toString()

	      	this.http.post('http://dariservices.azurewebsites.net/api/Account/ForgotPassword',body,{headers : headers} )
	      		.map(res => res.json())
			    .subscribe(data => {
			    	console.dir('success');	
                    this.successForgot = true;	
                    this.spinner = false;	    	
			    }, error => {
                    this.spinner = false; 
                    console.dir(JSON.parse(error._body).Message);
                    this.message = JSON.parse(error._body).Message;
				 	this.submitAttempt = true;
				});
		}
		else{
		  	this.submitAttempt = true;
		}
	}
   
}

 