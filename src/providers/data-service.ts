import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {
   
  constructor(public http: Http) {
    this.http = http; 
    
  }


  getData(url) {
      console.dir(NativeStorage.getItem('token'));
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      headers.append('Authorization', 'Bearer ');
      var options = new RequestOptions({headers: headers});
      
	    return this.http.get(url,options).map(res => res.json());
    }

}
