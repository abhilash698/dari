import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-forms',
  templateUrl: 'forms.html'
})
export class Forms {

  items = [
    'Correct time of birth',
    'Correct birth star',
    'Correct date of birth',
    'Correct month of birth',
    'Correct birth year',
  ];

  formSelected(item: string) {
    console.log("Selected Form", item);
  }

  constructor(public navCtrl: NavController) {

  }

}
