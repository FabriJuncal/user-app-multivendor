/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Grocery Delivery App Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2024-present initappz.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaypalPayPageRoutingModule } from './paypal-pay-routing.module';

import { PaypalPayPage } from './paypal-pay.page';
import { NgxPayPalModule } from 'ngx-paypal';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaypalPayPageRoutingModule,
    NgxPayPalModule
  ],
  declarations: [PaypalPayPage]
})
export class PaypalPayPageModule { }
