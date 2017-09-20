import { Component, OnInit  } from '@angular/core';
import { NavController, ModalController , Tabs,NavParams} from 'ionic-angular';
import {LocationService} from '../../providers/location-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { ModalAutocompleteItems } from '../modal-autocomplete-items/modal-autocomplete-items';

declare var google:any;
declare var cordova: any;
@Component({
  selector: 'page-step2',
  templateUrl: 'step2.html',
  providers: [LocationService]
})
export class RgStep2 {
	public user;
	secondForm: FormGroup;
	public submitAttempt = false;

  	address:any = {
        place: '',
        set: false,
    };
    placesService:any;
    placedetails: any;
    timezoneDetails: any;

	constructor(public navCtrl: NavController,params: NavParams,public formBuilder: FormBuilder,public modalCtrl: ModalController, public locationService: LocationService ) {

		this.user  = params.get('user');
		this.secondForm = formBuilder.group({
	        dob: ['', Validators.required ],
	        dot: ['', Validators.required ],
	        birthplace: [''],
	        lat: [''],
	        long: [''],
	        gmt: [''],
	        tz: [''],
	        dst: [''],
	        gender: ['', Validators.required ]
	    });

	}

	
	public NextStep(){
		  if(this.secondForm.valid){
	      	this.navCtrl.parent.select(2);
	      	this.user.firstForm = true;
	      	this.submitAttempt = false;
		  }
		  else{
		  	this.submitAttempt = true;
		  }
	}

   
	 
	// Always get the accurate path to your apps folder
	public pathForImage(img) {
	  if (img === null) {
	    return 'assets/img/img-icon.png';
	  } else {
	    return cordova.file.dataDirectory + img;
	  }
	}

	  ngOnInit() {
       
    }

    showModal() {
        // reset 
        this.reset();
        // show modal|
        let modal = this.modalCtrl.create(ModalAutocompleteItems);
        modal.onDidDismiss(data => {
            if(data){
                this.getPlaceDetail(data.place_id);
            }                
        })
        modal.present();
    }

    private reset() {
        this.user.UserDetails.birthplace = '';
        this.user.UserDetails.Latitude = '';
				this.user.UserDetails.Longitude = '';
				this.user.UserDetails.UTC = '';
				this.user.UserDetails.TimeZone = '';
				this.user.UserDetails.DayLightSavings = '';
    }

    private getPlaceDetail(place_id:string):void {
        var self = this;
        var request = {
            placeId: place_id
        };
        this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
        this.placesService.getDetails(request, callback);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                
                self.user.UserDetails.PlaceOfBirth = place.formatted_address;
                self.user.UserDetails.Latitude = place.geometry.location.lat();
                self.user.UserDetails.Longitude = place.geometry.location.lng();
                self.user.UserDetails.UTC = self.getUTC(place.utc_offset); 

                var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+self.user.UserDetails.Latitude+","+self.user.UserDetails.Longitude+"&timestamp="+(Math.round((new Date().getTime()) / 1000)).toString() + "&sensor=false&key=AIzaSyBwxsqCA99NcALYYloU0NN0DnYC0y35SpM";

                self.locationService.load(url)
								.then(loc => {
									if(loc){
										self.user.UserDetails.TimeZone = loc['timeZoneId'];
										self.user.UserDetails.DayLightSavings = loc['dstOffset'];
									}
									 
								});
						}else{
									console.log('page > getPlaceDetail > status > ', status);
							}
        }
    }

    private getUTC(utc){
    	var n = utc/60;
    	var int = Math.floor(n);
    	var dec = n % 1;
    	
    	return 'UTC + '+int+":"+(dec*60);

    }
	
}
