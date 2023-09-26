
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { environment } from 'src/environments/environment';



const NUMBER_REGEX = /^[*0-9]*$/;
const NAME_REGEX = /^[a-zA-Z ]*$/;
const whitespace_regex = /^([a-zA-Z0-9_\-\.]+)/;
// const not_allow_num = /^[0-9]*[a-zA-Z_]+[a-zA-Z0-9_]*$/;

export interface DialogData {
  totalPayment: number;
  cmp_name: string;
}

export interface SelectBox {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  form: FormGroup;
  cardForm: FormGroup;
  cards: any;
  cmpPayment = false;
  cmpPaymentAddCard = false;
  addCardClick = false;
  loading = false;
  addCardUrl: any = true;
  paymentStatus: any;
  env = environment;
  visaCard: boolean = false;
  masterCard: boolean = false;
  amexCard: boolean = false;
  months: SelectBox[] = [
    { value: 1, viewValue: 'JAN' },
    { value: 2, viewValue: 'FEB' },
    { value: 3, viewValue: 'MAR' },
    { value: 4, viewValue: 'APR' },
    { value: 5, viewValue: 'MAY' },
    { value: 6, viewValue: 'JUN' },
    { value: 7, viewValue: 'JUL' },
    { value: 8, viewValue: 'AUG' },
    { value: 9, viewValue: 'SEP' },
    { value: 10, viewValue: 'OCT' },
    { value: 11, viewValue: 'NOV' },
    { value: 12, viewValue: 'DEC' },
  ];

  years: SelectBox[] = [
    // {value: 2019, viewValue: ''},
    // {value: 2020, viewValue: ''},
    // {value: 2021, viewValue: ''},
    // {value: 2022, viewValue: ''},
    { value: 2023, viewValue: '' },
    { value: 2024, viewValue: '' },
    { value: 2025, viewValue: '' },
    { value: 2026, viewValue: '' },
    { value: 2027, viewValue: '' },
    { value: 2028, viewValue: '' },
    { value: 2029, viewValue: '' },
    { value: 2030, viewValue: '' },
    { value: 2031, viewValue: '' },
    { value: 2032, viewValue: '' },
    { value: 2033, viewValue: '' },
    { value: 2034, viewValue: '' },
    { value: 2035, viewValue: '' },
    { value: 2036, viewValue: '' },
    { value: 2037, viewValue: '' },
    { value: 2038, viewValue: '' },
    { value: 2039, viewValue: '' },
    { value: 2040, viewValue: '' },
  ];
  cart: any;
  userPLan: any;
  cardValue: any;
  isCardValid: boolean = false;
  sameError: boolean = false;
  loading2: boolean = false;
  selectedCard:any;

  @HostListener('window:focus', ['$event'])
  onFocus(event: FocusEvent): void {
    if (this.addCardClick) {
      this.getCards();
    }
  }
  constructor(
    public dialogRef: MatDialogRef<CardDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _aps: ApiService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.form = this.createForm();
    this.cardForm = this.defaultCardForm();
    if (!data) {
      this.cmpPaymentAddCard = true
    }
  }
  createForm(): FormGroup {
    return this._fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern(NAME_REGEX), Validators.minLength(3), Validators.pattern(whitespace_regex)])],
      cardNumber: ['', Validators.compose([Validators.required])],
      month: ['', Validators.required],
      year: ['', Validators.required],
      cvc: ['', Validators.compose([Validators.required, Validators.pattern(NUMBER_REGEX), Validators.pattern(whitespace_regex), Validators.minLength(3), Validators.maxLength(4)])],
      billingAddress: ['', Validators.compose([Validators.required])],
      plan_id: [+localStorage.getItem('plan_id')],
    });
  }
  defaultCardForm(): FormGroup {
    return this._fb.group({
      defaultCard: ['', Validators.required],
      plan_id: [+localStorage.getItem('plan_id')]
    });
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  submitPayment(): void {
    const card = {};
    if (!this.form.get('cardNumber').value.match(/\*/g)) {
      card['card'] = {};
      card['card']['expiry'] = this.form.get('month').value + '/' + this.form.get('year').value;
      card['card']['cvv'] = this.form.get('cvc').value;
      card['card']['name'] = this.form.get('cvc').value;
      card['card']['number'] = this.form.get('cardNumber').value.replaceAll(/\s/g, '');
    } else {
      card['card_id'] = this.cards.filter(crd => {
        if (crd.card_last4 === this.form.get('cardNumber').value) {
          return crd.card_id;
        }
      })[0].card_id;
    }
    this.loading2 = true;
    // this._aps.userPost('mapCard', card).subscribe(m => {
    //   this.loading2 = false;
    //   if (!m['error']) {
    //     this.cmpPaymentAddCard = false;
    //     this._aps.obNotify({ status: 'success', message: m['message'], start: true, code: 200 });
    //     this.cards = m['response'];
    //     this.form.reset();
    //     if (!this.data) {
    //       this.dialogRef.close(m['response']);
    //     }
    //   } else {
    //     this._aps.obNotify({ status: 'error', message: m['message'], start: true, code: 200 });
    //   }
    // });
    /* this.dialogRef.close(card);*/
  }

  getCards(): void {
    // this._aps.userGet('getCards').subscribe(success => {
    //   if (success && !success['error']) {
    //     this.cards = success['response'];
    //     if (!this.cards.length) {
    //       this.cmpPaymentAddCard = true;
    //     }
    //   }
    // });
  }
  ngOnInit() {
    // console.log(this.data);

    this.getCards();
    this.cmpPayment = true;
    // this._aps.cart$.subscribe(m => {
    //   if (m) {
    //     this.cart = m;
    //   }
    // });
  }
  paymentForCampaign(val) {
    console.log("Hello from payment for campaign ");
    
    // this._aps.userPost('checkOut', { cmp_id: this.data['cmp_id'], cnt_ids: this.data['cnt_ids'], card_id: val }).subscribe(success => {
    //   if (success && !success['error']) {
    //     this.paymentStatus = {
    //       status: true,
    //       msg: 'Thank you for the purchase',
    //       msg_sub: 'You have made payment of $' + this.cart.total + ', your campaign is live',
    //       dashboard: 'Visit dashboard to view campaign',
    //       button: 'Dashboard',
    //       receipt: success.response.receipt_url
    //     };
    //     this._aps.userPost('updatePageStage', { page_stage: 9, cnt_ids: this.data['cnt_ids'], cmp_id: localStorage.getItem('cmp_id'), asset_flag: true }).subscribe(success1 => {
    //       if (success1 && !success1['error']) {
    //         this._aps.obNotify({ status: 'success', message: 'Campaign live', start: true, code: '200' });
    //       } else {
    //         this._aps.obNotify({ status: 'error', message: success1['message'], start: true, code: success['code'] });
    //         setTimeout(() => {
    //           window.location.reload();

    //         }, 2000);
    //       }
    //     });
    //   } else {
    //     this.paymentStatus = {
    //       status: false,
    //       msg: 'Payment failed!',
    //       msg_sub: 'Due to some technical issue, payment of  $' + this.cart.total + ' is failed',
    //       dashboard: 'Please retry',
    //       button: 'Pay Now'
    //     };
    //     setTimeout(() => {
    //       window.location.reload();

    //     }, 2000);
    //   }
    // });
  }
  paymentForPlan(card) {
    this.loading = true;
    const params = {
      card_id: this.cardForm.get('defaultCard').value,
      p_id : this.userPLan.pending_tasks ? this.userPLan.pending_tasks.p_id : this.data.p_id
    };
    // this._aps.userPost('updateSubscriptionWithCard', params).subscribe(success => {
    //   this.loading = false;
    //   if (success && !success['error']) {
    //     localStorage.setItem('plan_id', success['plan_id'].toString());
    //     this.dialogRef.close(success['response']);
    //     this._aps.obNotify({ status: 'success', message: success['message'] ? success['message'] : 'Plan Subscribed', start: true, code: Number(success['code']) });
    //     this.getUser();
    //   this.userPLan.pending_tasks ? '' :  setTimeout(() => {
    //     this.data == 'Plan Payment' 
    //     }, 1000);
    //   } else {
    //     this._aps.obNotify({ status: 'error', message: success['message'] ? success['message'] : 'Unable to payment', start: true, code: +success['code'] });
    //     this.data !== 'Plan Payment' ? this.dialogRef.close(success) : '';
    //   }
    // });
  }


  selectCard(e:any){
    // console.log(e);
    this.selectedCard = e;
  }

  // Function to get the Plan info of the user (by Pankaj Phour) on March 15 2023 
  getUser() {
    console.log("HEllo from get user");
    
    const arr = ['all', 'pre', 'post', 'instream'];
    // this._aps.userGet('getUser').subscribe(success => {
    //   if (success && !success['error']) {
    //     localStorage.setItem('comp_country', JSON.stringify(success['response'].comp_country));
    //     this._aps.obUser({
    //       name: success['response'].comp_name,
    //       email: success['response'].email,
    //       contact: success['response'].comp_contact,
    //       avatar: success['response'].avatar
    //     });
    //     if (success['response'] && success['response'].plan) {
    //       success['response'].plan.p_custom_survey_questions.map((m, i) => {
    //         m['key'] = arr[i];
    //         return m;
    //       });
    //     }
    //   }
    // });
  }

  makePayment(card_id): void {
    if (card_id && !this.loading) {
      this.loading = true;
      this.data['pay_for'] === 'assets' ? this.paymentForCampaign(card_id) : this.paymentForPlan(card_id);
    } else {
      this.dialogRef.close({ card_id });
    }
  }

  addCard() {
    const win = window.open(this.addCardUrl, 'popup', 'width=700,height=700,left=20%,top=150');
    this.addCardClick = true;
  }
  requestAddCard(): void {
    this.loading = true;
    console.log("Hello from request add card");
    
    // this._aps.userGet('sendPaymentMethodRequest').subscribe((success) => {
    //   if (success && !success['error']) {
    //     this.loading = false;
    //     this.addCardUrl = success['response'].url;
    //     /* if (this.cards.length > 0) {
    //        this.addCard();
    //      }*/
    //     this.addCard();
    //   } else if (success && success['error']) {
    //     this.loading = false;
    //     this._aps.obNotify({ status: 'success', message: success['message'] ? success['message'] : 'Unable to send card add link.', start: true, code: Number(success['code']) });
    //   }
    // });
  }


  //  ******************************************* Function for detecting the card type (By Pankaj Phour) on january 18 2023 *******************************************
  cardDetect(e: any) {
    // console.log(e);

    this.cardValue = e.target.value.trim();
    // console.log(this.cardValue);
    this.cardValue = this.cardValue.replaceAll(/\s/g, '')
    // *********************** Calling the card validator function ans assigning the value to a boolean key for checking if the card is valid or not ( By Pankaj Phour ) on january 18 2023 ***********************
    this.isCardValid = this.luhnAlgo(this.cardValue);
    // console.log(this.cardValue);

    // **********************************  Code block for checking if the card is visa card or not ( By Pankaj Phour) on january 18 2023 **********************************
    if (this.cardValue.length === 16 && this.cardValue[0] == '4') {
      this.visaCard = true;
      this.masterCard = false;
      this.amexCard = false;
    }

    // **********************************  Code block for checking if the card is master card or not ( By Pankaj Phour) on january 18 2023 **********************************
    else if (this.cardValue.length === 16 && this.cardValue[0] == '5') {
      this.masterCard = true;
      this.visaCard = false;
      this.amexCard = false;
    }

    // **********************************  Code block for checking if the card is AMEX card or not ( By Pankaj Phour) on january 18 2023 **********************************
    else if (this.cardValue.length === 15 && this.cardValue[0] == '3' && (this.cardValue[1] == '4' || this.cardValue[1] == '7')) {
      this.amexCard = true;
      this.visaCard = false;
      this.masterCard = false;
    }

    // ********************************  This code block executes if the card entered is none from this.visaCard,master or amex ( By Pankaj Phour ) on january 18 2023 ********************************
    else {
      this.visaCard = false;
      this.masterCard = false;
      this.amexCard = false;
    }
  }


  //  *********************************** Function for checking  the card number entered by the user ( By Pankaj Phour) on january 18 2023 ***********************************
  cardNumberValue(e: any) {
    // Checking if the key entered is backspace 
    if (e.keyCode === 8) {
      // DO nothing 
    }
    else {
      // ******************************  Checking if the key entered is a number or not and also checking the length of the card number ( By Pankaj Phour) on jamuary 18 2023 ******************************
      if (((e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 8) && (this.cardValue ? this.cardValue.length < 19 : true)) {
      }
      // Code block hits when the key entered is not a number and not the backspace or the length of the card is longer than 19 characters ( By Pankaj Phour) on january 18 2023 
      else {
        e.preventDefault()
      }
    }
  }


  // ******************************  Function for checking the validation for card number (By Ashwani kumar(Backend developer) and Pankaj Phour) on january 18 2023 ******************************
  luhnAlgo(cardNo: any) {
    let nDigits = cardNo.length;
    let nSum = 0;
    let isSecond = false;
    for (let i = nDigits - 1; i >= 0; i--) {
      let d: any = cardNo[i]
      if (isSecond == true)
        d = d * 2;
      nSum += Math.floor(d / 10);
      nSum += d % 10;
      isSecond = !isSecond;
    }
    return (nSum % 10 == 0);
  }


  // ******************************  Function for checking the name of the user on the card  (By Pankaj Phour) on january 18 2023 ******************************
  userName(e: any) {
    const value = e.target.value;
    if (value.length > 1 && value == this.form.get('billingAddress').value) {
      // console.log("Same as address");
      this.sameError = true
    }
    else {
      this.sameError = false
    }
  }

  // ******************************  Function for checking the name of the user on the card  (By Pankaj Phour) on january 18 2023 ******************************
  address(e: any) {
    const value = e.target.value;
    // console.log(value)
    if (value.length > 1 && value == this.form.get('name').value) {
      // console.log("Same as name");
      this.sameError = true;
    }
    else {
      this.sameError = false;
    }
  }


  // ****************************** Function for removing card from the card list ( By Pankaj Phour) on january 18 2023 ******************************
  removeCard(card: any, index: any) {
    console.log(card,index);
    // this._aps.userDelete(`deleteCard?card_id=${card.card_id}`).subscribe((data: any) => {
    //   if (data.error) {
    //     this._aps.obNotify({
    //       status: 'error',
    //       message: data.message,
    //       code: 200,
    //       start: true
    //     })
    //   }
    //   else {
    //     if (data.response.length > 0) {
    //       this.cards = data.response;
    //     }
    //     else {
    //       this.cards.splice(index, 1)
    //     }
    //     this._aps.obNotify({
    //       status: 'success',
    //       code: 200,
    //       message: data.message,
    //       start: true
    //     });

    //   }
    // })
  }
}

