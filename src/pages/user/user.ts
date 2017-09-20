import { Component } from '@angular/core';
import { NavController,PopoverController  } from 'ionic-angular';
import { Services } from '../services/services';
import { PopOverPage } from '../popover/popover';
import { NativeStorage } from 'ionic-native';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  public tabs;
   
   constructor(public navCtrl: NavController,public popoverCtrl: PopoverController,public http: Http) {
      this.http = http;
      console.log('worked'); 
      var token;
      NativeStorage.getItem('token')
			  .then(
			    data => {
            let headers = new Headers();
            headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            headers.append('Authorization', 'Bearer ' + data.access_token);
            var options = new RequestOptions({headers: headers});
        
            this.http.get("http://dariservices.azurewebsites.net/api/User/ServiceList",options).map(res => res.json()).subscribe(response => {
              console.dir(response);
              this.tabs = response;  
            });
			    },
			    error => console.error(error)
			  );
       
   }
   
   GotoServices(){
      this.navCtrl.push(Services,{tabs : this.tabs});
   }

   presentPopover(ev) {
     let popover = this.popoverCtrl.create(PopOverPage);
     popover.present({
       ev: ev
     });
   }
}
