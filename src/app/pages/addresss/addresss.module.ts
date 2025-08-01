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

import { AddresssPageRoutingModule } from './addresss-routing.module';

import { AddresssPage } from './addresss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddresssPageRoutingModule
  ],
  declarations: [AddresssPage]
})
export class AddresssPageModule { }
