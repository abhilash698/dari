import { Component, OnInit  } from '@angular/core';
import { NavController, ModalController , Tabs,NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading} from 'ionic-angular';
import {LocationService} from '../../providers/location-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, File, Transfer, FilePath } from 'ionic-native';
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

	constructor(public navCtrl: NavController,params: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController ,public formBuilder: FormBuilder,public modalCtrl: ModalController, public locationService: LocationService ) {

		this.user  = params.get('user');
		this.secondForm = formBuilder.group({
	        username: ['',[Validators.maxLength(30),Validators.required] ],
	        dob: ['', Validators.required ],
	        dot: ['', Validators.required ],
	        birthplace: [''],
	        lat: [''],
	        long: [''],
	        gmt: [''],
	        tz: [''],
	        dst: [''],
	        wt: [''],
	        address: ['', Validators.required ],
	        city: ['', Validators.required ],
	        zip: ['', [Validators.maxLength(6),Validators.maxLength(6),Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')] ],
	        state: ['', Validators.required ],
	        country: ['', Validators.required ],
	        mobile: ['', [Validators.maxLength(10),Validators.maxLength(10),Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')] ],
	        saddress: ['', Validators.required ],
	        scity: ['', Validators.required ],
	        szip: ['', [Validators.maxLength(6),Validators.maxLength(6),Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')] ],
	        sstate: ['', Validators.required ],
	        scountry: ['', Validators.required ],
	        smobile: ['', [Validators.maxLength(10),Validators.maxLength(10),Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')] ],
	        shipAddr: ['']
	    });

	}

	

	public toggleAddress(){
		 
		if(this.user.shipAddr){
			this.user.saddress = this.user.address;
			this.user.scity = this.user.city;
			this.user.sstate = this.user.state;
			this.user.scountry = this.user.country;
			this.user.szip = this.user.zip;
			this.user.smobile = this.user.mobile;
		}
		else {
			this.user.saddress = '';
			this.user.scity = '';
			this.user.sstate = '';
			this.user.scountry = '';
			this.user.szip = '';
			this.user.smobile = '';
		}
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

	ngOnInit() {
        this.initPlacedetails();

    }

    showModal() {
        // reset 
        this.reset();
        // show modal|
        let modal = this.modalCtrl.create(ModalAutocompleteItems);
        modal.onDidDismiss(data => {
            console.log('page > modal dismissed > data > ', data);
            if(data){
                this.user.birthplace = data.description;
                // get details
                this.getPlaceDetail(data.place_id);
            }                
        })
        modal.present();
    }

    private reset() {
        this.initPlacedetails();
        this.user.birthplace = '';
        this.address.set = false;
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
                console.log('page > getPlaceDetail > place > ', place);
                // set full address
                self.user.birthplace = place.formatted_address;
                self.user.lat = place.geometry.location.lat();
                self.user.long = place.geometry.location.lng();
                self.user.utc = self.getUTC(place.utc_offset); 

                var url = "https://maps.googleapis.com/maps/api/timezone/json?location="+self.user.lat+","+self.user.long+"&timestamp="+(Math.round((new Date().getTime()) / 1000)).toString() + "&sensor=false&key=AIzaSyBwxsqCA99NcALYYloU0NN0DnYC0y35SpM";

                self.locationService.load(url)
				  .then(data => {
				    self.placedetails = data;  
				    self.user.tz = self.placedetails.timeZoneId;
				    self.user.dst = self.placedetails.dstOffset;
				    self.user.wt = self.placedetails.dstOffset;
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
