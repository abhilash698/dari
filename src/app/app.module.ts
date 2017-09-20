import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegistrationPage } from '../pages/registration/registration';
import { RgStep1 } from '../pages/step1/step1';
import { RgStep2 } from '../pages/step2/step2';
import { RgStep3 } from '../pages/step3/step3';
import { UserPage } from '../pages/user/user';
import { ScrollableTabs } from '../components/scrollable-tabs/scrollable-tabs';
import { Services } from '../pages/services/services';
import { Kpreports } from '../pages/kpreports/kpreports';
import { Sublist } from '../pages/sublist/sublist';
import { OF1 } from '../pages/OF1/OF1';
import { OF2 } from '../pages/OF2/OF2';
import { OF3 } from '../pages/OF3/OF3';
import { OF4 } from '../pages/OF4/OF4';
import { OF5 } from '../pages/OF5/OF5';
import { Checkout } from '../pages/checkout/checkout';
import { ModalAutocompleteItems } from  '../pages/modal-autocomplete-items/modal-autocomplete-items';
import { PopOverPage } from '../pages/popover/popover';
import { Profile } from '../pages/profile/profile';
import { ForgotPassword } from '../pages/forgot-password/forgot-password';
import { DataService } from '../providers/data-service';
import { RegistrationSuccess } from '../pages/registrationSuccess/registrationSuccess';
import { Camera } from '@ionic-native/camera';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegistrationPage,
    RgStep1,
    RgStep2,
    RgStep3,
    UserPage,
    ScrollableTabs,
    Kpreports,
    Sublist,
    Services,
    OF1,OF2,OF3,OF4,OF5,
    Checkout,
    ModalAutocompleteItems,
    PopOverPage,
    Profile,
    RegistrationSuccess,
    ForgotPassword
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegistrationPage,
    RgStep1,
    RgStep2,
    RgStep3,
    UserPage,
    Kpreports,
    Sublist,
    Services,
    OF1,OF2,OF3,OF4,OF5,
    Checkout,
    ModalAutocompleteItems,
    PopOverPage,
    Profile,
    RegistrationSuccess,
    ForgotPassword
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Camera]
})
export class AppModule {}
