import { Component } from '@angular/core';
import { App ,NavController, ModalController ,NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NativeStorage } from 'ionic-native';
import {LocationService} from '../../providers/location-service';
import { ModalAutocompleteItems } from '../modal-autocomplete-items/modal-autocomplete-items';
import { Checkout } from '../checkout/checkout';

declare var google:any;
declare var cordova: any;
@Component({
  selector: 'page-OF5',
  templateUrl: 'OF5.html',
  providers: [LocationService]
})
export class OF5 {
	public form1 : any;
	public serviceName;
	checkoutForm: FormGroup;
  	public submitAttempt = false;
  	address:any = {
        place: '',
        set: false,
    };
    placesService:any;
    placedetails: any;
    timezoneDetails: any;

	constructor(public navCtrl: NavController,params: NavParams ,public formBuilder: FormBuilder ,public modalCtrl: ModalController, public locationService: LocationService,private app: App ) {
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
            remarks: ['',[Validators.maxLength(300)] ],
            fromdob: ['', Validators.required ],
            enddob: ['', Validators.required ],
            fromtime: ['', Validators.required ],
            endtime: ['', Validators.required ],
            muhurthaplace: ['', Validators.required ],
            msurname: ['',[Validators.maxLength(30),Validators.required] ],
            mlastname: ['',[Validators.maxLength(30),Validators.required] ],
            mdob: ['', Validators.required ],
            mdot: ['', Validators.required ],
            mbirthplace: ['',Validators.required],
            mlat: ['', Validators.required ],
            mlong: ['', Validators.required ],
            mutc: ['', Validators.required ],
            mtz: ['', Validators.required ],
            mdst: ['',Validators.required],
            mwt: ['',Validators.required],
            fsurname: ['',[Validators.maxLength(30),Validators.required] ],
            flastname: ['',[Validators.maxLength(30),Validators.required] ],
            fdob: ['', Validators.required ],
            fdot: ['', Validators.required ],
            fbirthplace: ['',Validators.required],
            flat: ['', Validators.required ],
            flong: ['', Validators.required ],
            futc: ['', Validators.required ],
            ftz: ['', Validators.required ],
            fdst: ['',Validators.required],
            fwt: ['',Validators.required],
            username: ['',[Validators.maxLength(30),Validators.required] ],
            mobile: ['',Validators.required],
            email: ['',Validators.required],

        });
	}
	 
	checkOut(){
          if(this.checkoutForm.valid){
            let nav = this.app.getRootNav();
            nav.push(Checkout,{from: 'of5', data: this.form1});
            this.submitAttempt = false;
          }
          else{
            this.submitAttempt = true;
          }
    }

	ngOnInit() {
        this.initPlacedetails();
        this.form1 = {};

    }

    showModal(type) {
        // reset 
        this.reset(type);
        // show modal|
        let modal = this.modalCtrl.create(ModalAutocompleteItems);
        modal.onDidDismiss(data => {
            console.log('page > modal dismissed > data > ', data);
            if(data){
            	if(type == 'male'){
            		this.form1.mbirthplace = data.description;
            	}
            	else{
            		this.form1.fbirthplace = data.description;
            	}
            	this.getPlaceDetail(data.place_id,type);
                
            }                
        })
        modal.present();
    }

    private reset(type) {
        this.initPlacedetails();
        if(type == 'male'){
        	this.form1.mbirthplace = '';
        	this.form1.mlat = '';
        	this.form1.mlong = '';
        	this.form1.mTz = '';
        	this.form1.mutc = '';
        	this.form1.mdst = '';
        	this.form1.mwt = '';
        }
        else{
        	this.form1.fbirthplace = '';
        	this.form1.flat = '';
        	this.form1.flong = '';
        	this.form1.ftz = '';
        	this.form1.futc = '';
        	this.form1.fdst = '';
        	this.form1.fwt = '';
        }
        
        this.address.set = false;
    }

    private getPlaceDetail(place_id:string, type: string):void {
        var self = this;
        var request = {
            placeId: place_id
        };
        this.placesService = new google.maps.places.PlacesService(document.createElement('div'));
        this.placesService.getDetails(request, callback);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                // set full address
                if(type == 'male'){
                	self.form1.mbirthplace = place.formatted_address;
	                self.form1.mlat = place.geometry.location.lat();
	                self.form1.mlong = place.geometry.location.lng();
	                self.form1.mutc = self.getUTC(place.utc_offset); 
	                var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+self.form1.mlat+","+self.form1.mlong+"&timestamp="+(Math.round((new Date().getTime()) / 1000)).toString() + "&sensor=false&key=AIzaSyBwxsqCA99NcALYYloU0NN0DnYC0y35SpM";
                }
                else{
                	self.form1.fbirthplace = place.formatted_address;
	                self.form1.flat = place.geometry.location.lat();
	                self.form1.flong = place.geometry.location.lng();
	                self.form1.futc = self.getUTC(place.utc_offset); 
	                var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+self.form1.flat+","+self.form1.flong+"&timestamp="+(Math.round((new Date().getTime()) / 1000)).toString() + "&sensor=false&key=AIzaSyBwxsqCA99NcALYYloU0NN0DnYC0y35SpM";
                }

                

                self.locationService.load(url)
				  .then(data => {
				   	if(type == 'male'){
				   		self.placedetails = data;  
					    self.form1.mtz = self.placedetails.timeZoneId;
					    self.form1.mdst = self.placedetails.dstOffset;
					    self.form1.mwt = self.placedetails.dstOffset;
				   	}
				   	else{
				   		self.placedetails = data;  
					    self.form1.ftz = self.placedetails.timeZoneId;
					    self.form1.fdst = self.placedetails.dstOffset;
					    self.form1.fwt = self.placedetails.dstOffset;
				   	}
				    
				  });

				
                
                // populate
                self.address.set = true;
                console.log('page > getPlaceDetail > details > ', self.placedetails);
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
 
    private initPlacedetails() {
    	this.timezoneDetails = {};
        this.placedetails = {
            address: '',
            lat: '',
            lng: '',
            UTC: '',
            timezone: '',
            DST: ''
        };        
    }  

	 	 
	
	
}