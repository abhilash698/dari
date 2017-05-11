import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationPage } from '../registration/registration';
import { UserPage } from '../user/user';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   FB_APP_ID: number = 603484359856560;
   loginCred = {login: '' ,password: ''};
   loginForm : FormGroup;
   submitAttempt = false;

   constructor(public navCtrl: NavController,public formBuilder: FormBuilder) {
   		Facebook.browserInit(this.FB_APP_ID, "v2.8");
   		this.loginForm = formBuilder.group({
	        login: ['',[Validators.maxLength(30),Validators.required] ],
	        password: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(4)] ]	        
	    });
   }

   GotoRegistration(){
      this.navCtrl.push(RegistrationPage);
   }

   doFbLogin(){
	    let permissions = new Array();
	    let nav = this.navCtrl;
	    //the permissions your facebook app needs from the user
	    permissions = ["public_profile"];


	    Facebook.login(permissions)
	    .then((response) => {
	      let userId = response.authResponse.userID;
	      let params = new Array();

	      //Getting name and gender properties
	      Facebook.api("/me?fields=name,gender", params)
	      .then(function(user) {
	        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
	        //now we have the users info, let's save it in the NativeStorage
	        NativeStorage.setItem('user',
	        {
	          name: user.name,
	          gender: user.gender,
	          picture: user.picture
	        })
	        .then(() => {
	          this.navCtrl.setRoot(UserPage);
	        }, function (error) {
	          console.log(error);
	        })
	      })
	    }, function(error){
	      console.log(error);
	    });
	}

	doEmailLogin(){
		if(this.loginForm.valid){
			this.submitAttempt = false;
	      	NativeStorage.setItem('user',
	        {
	          username:'Test',
	          email: 'abhilash.aruva@gmail.com',
	          mobile: '7799637741',
	          dob: '29-05-1991',
	          tob: '12:00',
	          birthplace: 'Hyderabad, Telangana, India',
	          lat: '17.455',
	          long: '78.439',
	          utc: 'UTC + 5:30',
	          tz : 'Asia/Calcutta',
	          dst: '0',
	          wt: '0',
	          address: 'flat 305, lingampally',
	          zip: '500019',
	          city: 'Hyderabad',
	          state: 'Telangana',
	          country: 'India',
	          saddress: 'flat 305, lingampally',
	          szip: '500019',
	          scity: 'Hyderabad',
	          sstate: 'Telangana',
	          scountry: 'India'

	        })
	        .then(() => {
	          this.navCtrl.setRoot(UserPage);
	        }, function (error) {
	          console.log(error);
	        });
		}
		else{
		  	this.submitAttempt = true;
		}
	}
   
}
