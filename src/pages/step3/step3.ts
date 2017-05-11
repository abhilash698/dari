import { Component } from '@angular/core'; 
import { App ,NavController ,NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading} from 'ionic-angular';
import { Camera, File, Transfer, FilePath, NativeStorage } from 'ionic-native';
import { UserPage } from '../user/user';

declare var cordova: any;

@Component({
  selector: 'page-step3',
  templateUrl: 'step3.html'
})
export class RgStep3 {
	public user;
	lastImage: string = null;
  	loading: Loading;

	constructor(public navCtrl: NavController,params: NavParams, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController,private app: App) {
		this.user  = params.get('user');
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

	doRegistration(){
		if(this.user){
	
	      	NativeStorage.setItem('user',this.user)
	        .then(() => {
		        let nav = this.app.getRootNav();
				nav.push(UserPage);
	          //this.navCtrl.setRoot(UserPage);
	        }, function (error) {
	          console.log(error);
	        });
		}
		 
	}

	public Edit(){
	      	this.navCtrl.parent.select(0);
	}
}