import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController ,NavParams} from 'ionic-angular';

@Component({
  selector: 'page-step1',
  templateUrl: 'step1.html'
})
export class RgStep1 {
	public user;
	firstForm : FormGroup;
	public submitAttempt = false;

	constructor(public navCtrl: NavController,params: NavParams,public formBuilder: FormBuilder) {
		console.dir(params.get('user'));
		this.user  = params.get('user');
		this.firstForm = formBuilder.group({
	        username: ['',[Validators.maxLength(30),Validators.required] ],
	        email: ['', Validators.required ],
	        mobile: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10), Validators.pattern('^(0|[1-9][0-9]*)$')] ]
	    });
	}

	NextStep(){
		  if(this.firstForm.valid){
	      	this.navCtrl.parent.select(1);
	      	this.submitAttempt = false;
		  }
		  else{
		  	this.submitAttempt = true;
		  }
	}

	makeActive(id){
		this.user.userType.one = true;
		this.user.userType.two = true;
		this.user.userType.three = true;
		if(id == 1){
			this.user.userType.one = false;
		}
		else if(id ==  2){
			this.user.userType.two = false;
		}
		else if(id  == 3){
			this.user.userType.three = false;
		}
		
	}
}