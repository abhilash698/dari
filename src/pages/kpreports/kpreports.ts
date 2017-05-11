import { Component } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import { Sublist } from '../sublist/sublist';

@Component({
  selector: 'page-kpreports',
  templateUrl: 'kpreports.html'
})
export class Kpreports {
  
  public items;

  constructor(public navCtrl: NavController,params : NavParams) {
     
    if(params.data.id == 1){
      this.items = [
        { id: '1' , name: 'Birth Time Rectification', serviceId : '1' , redirect : 'sublist',
          sublist: [
              { id: '1' , name: 'Correct time of birth', subServiceId : '1' , redirect : 'form' ,form: 'OF1'},
              { id: '2' , name: 'Correct Birth star', subServiceId : '1' , redirect : 'form' ,form: 'OF2'},
              { id: '3' , name: 'Correct date of birth', subServiceId : '1' , redirect : 'form' ,form: 'OF3'},
              { id: '4' , name: 'Correct month of birth', subServiceId : '1' , redirect : 'form' ,form: 'OF4'},
              { id: '5' , name: 'Correct birth year', subServiceId : '1' , redirect : 'form' ,form: 'OF5'},
            ]
        },
        { id: '2' , name: 'Business', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Independent Business', subServiceId : '2' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Partnership business', subServiceId : '2' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Business Expansion', subServiceId : '2' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'Loan for business', subServiceId : '2' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'Business break up or loss', subServiceId : '2' , redirect : 'form' ,form: 'OF3'}
          ]
        },
        { id: '3' , name: 'Children', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Time of Pregnancy', subServiceId : '3' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Time of child birth', subServiceId : '3' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Sex of child', subServiceId : '3' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'Childless', subServiceId : '3' , redirect : 'form' ,form: 'OF3'}          
          ]
        },
        { id: '4' , name: 'Abortion', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Sterile of wife/husband', subServiceId : '4' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Twin child', subServiceId : '4' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Adoption of child', subServiceId : '4' , redirect : 'form' ,form: 'OF3' }
          ]
        },
        { id: '5' , name: 'Death', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Death of person', subServiceId : '5' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Father death', subServiceId : '5' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Mother death', subServiceId : '5' , redirect : 'form' ,form: 'OF3' }
          ]
        },
        { id: '6' , name: 'Disease', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Disease time', subServiceId : '6' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Disease curing time', subServiceId : '6' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Defect in body', subServiceId : '6' , redirect : 'form' ,form: 'OF3' }
          ]
        },
        { id: '7' , name: 'Education', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Primary Education', subServiceId : '7' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Collage Education', subServiceId : '7' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Post‐Graduation', subServiceId : '7' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'Research Education (M.Phil & Ph.D)', subServiceId : '7' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'School or College admission', subServiceId : '7' , redirect : 'form' ,form: 'OF3'},
            { id: '6' , name: 'Success and failures in Education', subServiceId : '7' , redirect : 'form' ,form: 'OF3'},
            { id: '7' , name: 'Subject specialization', subServiceId : '7' , redirect : 'form' ,form: 'OF3'},
            { id: '8' , name: 'Obstacles in Education', subServiceId : '7' , redirect : 'form' ,form: 'OF3'},
            { id: '9' , name: 'Scholarship for studies', subServiceId : '7' , redirect : 'form' ,form: 'OF3'},
            { id: '10' , name: 'Studies in foreign country', subServiceId : '7' , redirect : 'form' ,form: 'OF3'}
          ]
        },
        { id: '8' , name: 'Finance', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Accumulation of wealth', subServiceId : '8' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Personal Loan', subServiceId : '8' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Mortgage Loan', subServiceId : '8' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'Bank Loan', subServiceId : '8' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'Repayment of loan', subServiceId : '8' , redirect : 'form' ,form: 'OF3'}
          ]
        },
        { id: '9' , name: 'Foreign Travel', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Education – foreign travel', subServiceId : '9' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Job‐ foreign travel', subServiceId : '9' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Business – foreign travel', subServiceId : '9' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'Tour – foreign travel', subServiceId : '9' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'Union with children – foreign travel', subServiceId : '9' , redirect : 'form' ,form: 'OF3'}
          ]
        },
        { id: '10' , name: 'Purchace of flat,house,Plot', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Purchase of house/Flat/Plot', subServiceId : '10' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Construction of new house', subServiceId : '10' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Dispose of house/Flat/Plot', subServiceId : '10' , redirect : 'form' ,form: 'OF3' }
          ]
        },
        { id: '11' , name: 'Job', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Time of Job ‐ Government‐Private', subServiceId : '11' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Promotion', subServiceId : '11' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Transfer', subServiceId : '11' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'Change of Job/New Job', subServiceId : '11' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'Suspension', subServiceId : '11' , redirect : 'form' ,form: 'OF3'},
            { id: '6' , name: 'Reinstatement in service', subServiceId : '11' , redirect : 'form' ,form: 'OF3'},
            { id: '7' , name: 'Retirement', subServiceId : '11' , redirect : 'form' ,form: 'OF3'},
            { id: '8' , name: 'Pension', subServiceId : '11' , redirect : 'form' ,form: 'OF3'},
            { id: '9' , name: 'ACB Raids', subServiceId : '11' , redirect : 'form' ,form: 'OF3'}
          ]
        },
        { id: '12' , name: 'Longevity', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Longevity of Child', subServiceId : '12' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Longevity of Father', subServiceId : '12' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Longevity of Mother', subServiceId : '12' , redirect : 'form' ,form: 'OF3' } 
          ]
        },
        { id: '13' , name: 'Marriage', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Time of Marriage', subServiceId : '13' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Love Marriage', subServiceId : '13' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Wife and Husband‐ Unity', subServiceId : '13' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'Wife and Husband‐Separation', subServiceId : '13' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'Wife and Husband‐Divorce', subServiceId : '13' , redirect : 'form' ,form: 'OF3'},
            { id: '6' , name: 'Wife and Husband‐Re‐Union', subServiceId : '13' , redirect : 'form' ,form: 'OF3'},
            { id: '7' , name: 'Second Marriage', subServiceId : '13' , redirect : 'form' ,form: 'OF3'}
          ]
        },
        { id: '14' , name: 'Speculation', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Cinema‐Hero/Heroin/Villain/Comedian/Produ', subServiceId : '14' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Music', subServiceId : '14' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Lottery', subServiceId : '14' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'Play cards', subServiceId : '14' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'Races', subServiceId : '14' , redirect : 'form' ,form: 'OF3'},
            { id: '6' , name: 'Cricket', subServiceId : '14' , redirect : 'form' ,form: 'OF3'},
            { id: '7' , name: 'Share market', subServiceId : '14' , redirect : 'form' ,form: 'OF3'} 
          ]
        },
        { id: '15' , name: 'House Tenant', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Tenant to new or old house', subServiceId : '15' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Tenant vacate of house', subServiceId : '15' , redirect : 'form' ,form: 'OF3' } 
          ]
        },
        { id: '16' , name: 'Vehicle', serviceId : '1' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Purchase of house/Flat/Plot', subServiceId : '16' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Construction of new house', subServiceId : '16' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Dispose of house/Flat/Plot', subServiceId : '16' , redirect : 'form' ,form: 'OF3' } 
          ]
        }
      ];
    }
    else if(params.data.id == 2){
      this.items = [
        { id: '17' , name: 'Building Construction and Gruhapravesh', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To Lay the foundation stone for a building', subServiceId : '17' , redirect : 'form' ,form: 'OF5' },
            { id: '2' , name: 'To Lay the foundation stone for a building', subServiceId : '17' , redirect : 'form' ,form: 'OF5' },
            { id: '3' , name: 'To Lay the foundation stone for a building', subServiceId : '17' , redirect : 'form' ,form: 'OF5' },
            { id: '4' , name: 'To Lay the foundation stone for a building', subServiceId : '17' , redirect : 'form' ,form: 'OF5'},
            { id: '5' , name: 'Entering a new house that faces East', subServiceId : '17' , redirect : 'form' ,form: 'OF5'},
            { id: '6' , name: 'Entering a new house that faces North', subServiceId : '17' , redirect : 'form' ,form: 'OF5'},
            { id: '7' , name: 'Entering a new house that faces South', subServiceId : '17' , redirect : 'form' ,form: 'OF5'},
            { id: '8' , name: 'Entering a new house that faces West', subServiceId : '17' , redirect : 'form' ,form: 'OF5'},
            { id: '9' , name: 'Starting repairs for Remodeling of the old Builing', subServiceId : '17' , redirect : 'form' ,form: 'OF5'},
            { id: '10' , name: 'Entering a remodeling house that faces East', subServiceId : '17' , redirect : 'form' ,form: 'OF5'},
            { id: '11' , name: 'Entering a remodeling house that faces North', subServiceId : '17' , redirect : 'form' ,form: 'OF5'},
            { id: '12' , name: 'Entering a remodeling house that faces South', subServiceId : '17' , redirect : 'form' ,form: 'OF5'},
            { id: '13' , name: 'Entering a remodeling house that faces East', subServiceId : '17' , redirect : 'form' ,form: 'OF5'} 
          ]
        },
        { id: '18' , name: 'Business Starting', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To start a small scale business', subServiceId : '18' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To start a large scale business', subServiceId : '18' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'To open a shop', subServiceId : '18' , redirect : 'form' ,form: 'OF3' } 
          ]
        },
        { id: '19' , name: 'Education', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Akshararambha ceremony', subServiceId : '19' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To admit in educational institution', subServiceId : '19' , redirect : 'form' ,form: 'OF3' } 
          ]
        },
        { id: '20' , name: 'Election', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To file nomination paper', subServiceId : '20' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To take an oath', subServiceId : '20' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'To take charge', subServiceId : '20' , redirect : 'form' ,form: 'OF3' } 
          ]
        },
        { id: '21' , name: 'Filing court case', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To file a law‐suit', subServiceId : '21' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To come to a compromise', subServiceId : '21' , redirect : 'form' ,form: 'OF3' } 
          ]
        },
        { id: '22' , name: 'Film Industry', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To start film production', subServiceId : '22' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To release a film', subServiceId : '22' , redirect : 'form' ,form: 'OF3' } 
          ]
        },
        { id: '23' , name: 'Industry Starting', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To lay the foundation stone', subServiceId : '23' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To start an industrial establishment', subServiceId : '23' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'To start installation of machine', subServiceId : '23' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'To start the machine', subServiceId : '23' , redirect : 'form' ,form: 'OF3'}
          ]
        },
        { id: '24' , name: 'Job', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To join a job', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To resign the Job', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'To call on a senior official', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'To take a new charge', subServiceId : '17' , redirect : 'form' ,form: 'OF3'}
          ]
        },
        { id: '25' , name: 'Journey', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Short Journey towards East', subServiceId : '25' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Short Journey towards South', subServiceId : '25' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Short Journey towards West', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'Short Journey towards North', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'Long Journey towards East', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '6' , name: 'Long Journey towards South', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '7' , name: 'Long Journey towards West', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '8' , name: 'Long Journey towards North', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '9' , name: 'Overseas trip towards East', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '10' , name: 'Overseas trip towards West', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '11' , name: 'Overseas trip towards North', subServiceId : '17' , redirect : 'form' ,form: 'OF3'} 
          ]
        },
        { id: '26' , name: 'Marriage', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Engagement', subServiceId : '17' , redirect : 'form' ,form: 'OF4' },
            { id: '2' , name: 'Invitations', subServiceId : '17' , redirect : 'form' ,form: 'OF4' },
            { id: '3' , name: 'Wedding', subServiceId : '17' , redirect : 'form' ,form: 'OF4' },
            { id: '4' , name: 'Nisheka (First Sexual Union)', subServiceId : '17' , redirect : 'form' ,form: 'OF4'} 
          ]
        },
        { id: '27' , name: 'Medical', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To start treatment', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To undergo surgery', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'To come back from hospital', subServiceId : '17' , redirect : 'form' ,form: 'OF3' } 
          ]
        },
        { id: '28' , name: 'Miscellaneous', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To fill in an application', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To adopt a child', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'To divide property', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'To employ a person', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'To start book of accounts', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '6' , name: 'To sow the seed', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '7' , name: 'To reap the crop', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '8' , name: 'To worship the well & water', subServiceId : '17' , redirect : 'form' ,form: 'OF3'} 
          ]
        },
        { id: '29' , name: 'Money', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To lend money', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To deposit money in the bank', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'To give loan', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'To take loan', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'To repay loan', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '6' , name: 'To recover due money', subServiceId : '17' , redirect : 'form' ,form: 'OF3'} 
          ]
        },
        { id: '30' , name: 'New born child', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Name Ceremony', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'Annaprashan ‐ To feed baby', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'Chyrakaran(mundan) ‐ To takeoff hair', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'Karnavedha ‐ To prick into ear', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'Yagyopavit ‐ To wear sacred thread', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '6' , name: 'Best time for child birth', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '7' , name: 'Cradling (Dola‐arohana)', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '8' , name: 'First time taking baby out from home', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '9' , name: 'First time making baby sit on land', subServiceId : '17' , redirect : 'form' ,form: 'OF3'} 
          ]
        },
        { id: '31' , name: 'Property Buying and Selling', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To purchase a property', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To sell a property', subServiceId : '17' , redirect : 'form' ,form: 'OF3' } 
          ]
        },
        { id: '32' , name: 'Speculation', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To buy shares', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To sell shares', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'To buy lottery', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'To play cards', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '5' , name: 'To bet in horse raiding', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '6' , name: 'To purchase commodities', subServiceId : '17' , redirect : 'form' ,form: 'OF3'},
            { id: '7' , name: 'To sell commodities', subServiceId : '17' , redirect : 'form' ,form: 'OF3'} 
          ]
        },
        { id: '33' , name: 'Temple construction Muhurthas', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'Construction of the temple', subServiceId : '17' , redirect : 'form' ,form: 'OF5' },
            { id: '2' , name: 'Construction of the idol', subServiceId : '17' , redirect : 'form' ,form: 'OF5' },
            { id: '3' , name: 'Construction of the god', subServiceId : '17' , redirect : 'form' ,form: 'OF5' },
            { id: '4' , name: 'Construction of the goddess', subServiceId : '17' , redirect : 'form' ,form: 'OF5'},
            { id: '5' , name: 'Construction of idole in house', subServiceId : '17' , redirect : 'form' ,form: 'OF5'} 
          ]
        },
        { id: '34' , name: 'Vehicle buying, selling and start', serviceId : '2' , redirect : 'sublist',
          sublist: [
            { id: '1' , name: 'To purchase a new vehicle', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '2' , name: 'To purchase an old vehicle', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '3' , name: 'To sell a vehicle', subServiceId : '17' , redirect : 'form' ,form: 'OF3' },
            { id: '4' , name: 'To ride the vehicle for the first time', subServiceId : '17' , redirect : 'form' ,form: 'OF3'}
          ]
        }
      ];
    }
    else if(params.data.id == 3){
      this.items = [
        {id: '35' , name: 'Vedic Matchmaking Report', serviceId : '3' , redirect : 'form', form: 'OF3'},
        {id: '36' , name: 'KP Matchmaking Report', serviceId : '2' , redirect : 'form', form: 'OF3'}
      ];
    }
    

  }

  itemSelected(item) {
    console.log("Selected Item", item);
    if(item.redirect == 'form'){
      // this.navCtrl.push(item.form);
    }
    else{
      this.navCtrl.push(Sublist, item);
    }
    
  }

}
