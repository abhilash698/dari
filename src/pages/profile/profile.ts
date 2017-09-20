import { Component, OnInit  } from '@angular/core';
import { NavController, ModalController , Tabs,NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading} from 'ionic-angular';
import {LocationService} from '../../providers/location-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, File, Transfer, FilePath,NativeStorage } from 'ionic-native';
import { ModalAutocompleteItems } from '../modal-autocomplete-items/modal-autocomplete-items';
import { UserPage } from '../user/user';
import {Http, Headers, URLSearchParams,RequestOptions } from "@angular/http";

declare var google:any;
declare var cordova: any;
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [LocationService]
})
export class Profile {
	public user = {
		FirstName : '',
		LastName :'',
		DateOfBirth: '',
		TimeOfBirth: '',
		PlaceOfBirth: '',
		Latitude: '',
		Longitude: '',
		UTC: '',
		TimeZone: '',
		DayLightSavings: '',
		BillingAddress : {},
		ShippingAddress : {}	
	};
	secondForm: FormGroup;
	lastImage: string = null;
  	loading: Loading;
  	public submitAttempt = false;

  	address:any = {
        place: '',
        set: false,
    };
    placesService:any;
    placedetails: any;
    timezoneDetails: any;

	constructor(public navCtrl: NavController,params: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController ,public formBuilder: FormBuilder,public modalCtrl: ModalController, public locationService: LocationService,public http: Http ) {
		this.http = http;
		this.secondForm = formBuilder.group({
					firstName: ['',[Validators.maxLength(30),Validators.required] ],
	        lastName: ['',[Validators.maxLength(30),Validators.required] ],
	        dob: ['', Validators.required ],
	        dot: ['', Validators.required ],
	        birthplace: ['',Validators.required],
	        lat: ['',Validators.required],
	        long: ['',Validators.required],
	        gmt: ['',Validators.required],
	        tz: ['',Validators.required],
	        dst: ['',Validators.required], 
					Bhousenumber: ['',Validators.required],
					Bstreet : ['',Validators.required],
					Bcity: ['',Validators.required],
					Bstate: ['',Validators.required],
					Bcountry: ['',Validators.required],
					Bpincode: ['',Validators.required],
					Shousenumber: ['',Validators.required],
					Sstreet : ['',Validators.required],
					Scity: ['',Validators.required],
					Sstate: ['',Validators.required],
					Scountry: ['',Validators.required],
					Spincode: ['',Validators.required]
	    });

	}
  
	ngOnInit() {
			NativeStorage.getItem('user')
			.then(
				data => {
					console.dir(data);
					this.user = data;
				},
				error => console.error(error)
			);
	}
	 
	public UpdateProfile(){
		  if(this.secondForm.valid){
				 NativeStorage.getItem('token')
					.then(
						data => {
							let headers = new Headers();
							headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
							headers.append('Authorization', 'Bearer ' + data.access_token);
							var options = new RequestOptions({headers: headers});
					
							this.http.post("http://dariservices.azurewebsites.net/api/Account/UpdateProfile",this.user,options).map(res => res.json()).subscribe(response => {
								console.dir(response); 
							});
						},
						error => console.error(error)
					);
		  }
		  else{
		  	 console.log('Not Valid Form');
		  }
	}

	public presentActionSheet() {
	    let actionSheet = this.actionSheetCtrl.create({
	      title: 'Select Image Source',
	      buttons: [
	        {
	          text: 'Load from Library',
	          handler: () => {
	            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
	          }
	        },
	        {
	          text: 'Use Camera',
	          handler: () => {
	            this.takePicture(Camera.PictureSourceType.CAMERA);
	          }
	        },
	        {
	          text: 'Cancel',
	          role: 'cancel'
	        }
	      ]
	    });
	    actionSheet.present();
	}

	public takePicture(sourceType) {
	  // Create options for the Camera Dialog
	  var options = {
	    quality: 100,
	    sourceType: sourceType,
	    saveToPhotoAlbum: false,
	    correctOrientation: true
	  };
	 
	  // Get the data of an image
	  Camera.getPicture(options).then((imagePath) => {
	    // Special handling for Android library
	    if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
	      FilePath.resolveNativePath(imagePath)
	      .then(filePath => {
	        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
	        var correctPath = filePath.substr(0, imagePath.lastIndexOf('/') + 1);
	        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	      });
	    } else {
	      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
	      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
	      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
	    }
	  }, (err) => {
	    this.presentToast('Error while selecting image.');
	  });
	}


	private createFileName() {
	  var d = new Date(),
	  n = d.getTime(),
	  newFileName =  n + ".jpg";
	  return newFileName;
	}
	 
	// Copy the image to a local folder
	private copyFileToLocalDir(namePath, currentName, newFileName) {
	  File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
	    this.lastImage = newFileName;
	  }, error => {
	    this.presentToast('Error while storing file.');
	  });
	}
	 
	private presentToast(text) {
	  let toast = this.toastCtrl.create({
	    message: text,
	    duration: 3000,
	    position: 'top'
	  });
	  toast.present();
	}
	 
	// Always get the accurate path to your apps folder
	public pathForImage(img) {
	  if (img === null) {
	    return 'assets/img/img-icon.png';
	  } else {
	    return cordova.file.dataDirectory + img;
	  }
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
        this.user.PlaceOfBirth = '';
        this.user.Latitude = '';
				this.user.Longitude = '';
				this.user.UTC = '';
				this.user.TimeZone = '';
				this.user.DayLightSavings = '';
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
                
                self.user.PlaceOfBirth = place.formatted_address;
                self.user.Latitude = place.geometry.location.lat();
                self.user.Longitude = place.geometry.location.lng();
                self.user.UTC = self.getUTC(place.utc_offset); 

                var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+self.user.Latitude+","+self.user.Longitude+"&timestamp="+(Math.round((new Date().getTime()) / 1000)).toString() + "&sensor=false&key=AIzaSyBwxsqCA99NcALYYloU0NN0DnYC0y35SpM";

                self.locationService.load(url)
								.then(loc => {
									if(loc){
										self.user.TimeZone = loc['timeZoneId'];
										self.user.DayLightSavings = loc['dstOffset'];
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
