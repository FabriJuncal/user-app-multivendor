/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Grocery Delivery App Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2024-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.page.html',
  styleUrls: ['./select-country.page.scss'],
})
export class SelectCountryPage implements OnInit {
  ccCode: any = this.util.default_country_code;
  countries: any[] = [];
  dummy: any[] = [];
  cc: any;

  dummyLoad: any[] = [];
  constructor(
    private modalCtrl: ModalController,
    public util: UtilService
  ) {
    this.dummyLoad = Array(10);
    setTimeout(() => {
      this.dummyLoad = [];
      this.dummy = this.util.countrys;
      this.countries = this.dummy;
      console.log(this.dummy);
    }, 500);

  }

  ngOnInit() {
  }

  close() {
    this.modalCtrl.dismiss();
  }

  onSearchChange(events: any) {
    console.log(events);
    if (events.value != '') {
      this.countries = this.dummy.filter((item) => {
        return item.country_name.toLowerCase().indexOf(events.detail.value.toLowerCase()) > -1;
      });
    } else {
      this.countries = [];
    }
  }

  okay() {
    console.log(this.ccCode);
    this.modalCtrl.dismiss(this.ccCode, 'selected');
  }
}
