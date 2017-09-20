import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'registration-success',
  templateUrl: 'registrationSuccess.html'
})
export class RegistrationSuccess {
    
   constructor(public navCtrl: NavController) {
   		
   }

   goToLogin(){
     this.navCtrl.push(HomePage);
   }
   
}
