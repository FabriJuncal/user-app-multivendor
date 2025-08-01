/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Grocery Delivery App Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2024-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
declare var google: any;

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  lat: any;
  lng: any;
  address: any = '';
  house: any = '';
  landmark: any = '';
  title: any = 'home';
  pincode: any = '';
  id: any;
  from: any;
  constructor(
    public util: UtilService,
    public api: ApiService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((data: any) => {
      console.log(data);
      if (data && data.from) {
        this.from = 'edit';
        const info = JSON.parse(data.data);
        console.log('da==>', info);
        this.address = info.address;
        this.house = info.house;
        this.id = info.id;
        this.landmark = info.landmark;
        this.lat = info.lat;
        this.lng = info.lng;
        this.pincode = info.pincode;
      } else {
        this.from = 'new';
      }
    });
  }

  ngOnInit() {
  }

  addAddress() {
    if (this.address == '' || this.landmark == '' || this.house == '' || this.pincode == '') {

      this.util.errorToast(this.util.translate('All Fields are required'));
      return false;
    }
    if (typeof google == 'object' && typeof google.maps == 'object') {
      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({ address: this.house + ' ' + this.landmark + ' ' + this.address + ' ' + this.pincode }, (results: any, status: any) => {
        console.log(results, status);
        if (status == 'OK' && results && results.length) {
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          console.log('----->', this.lat, this.lng);
          console.log('call api');
          this.util.show();
          const param = {
            uid: localStorage.getItem('uid'),
            address: this.address,
            lat: this.lat,
            lng: this.lng,
            title: this.title,
            house: this.house,
            landmark: this.landmark,
            pincode: this.pincode
          };
          this.api.post_private('v1/address/addNew', param).then((data: any) => {
            this.util.hide();
            if (data && data.status == 200) {
              this.util.publishNewAddress();
              this.util.onBack();
              this.util.showToast('Address added', 'success', 'bottom');
            } else {
              this.util.errorToast(this.util.translate('Something went wrong'));
            }
          }, error => {
            console.log(error);
            this.util.hide();
            this.util.errorToast(this.util.translate('Something went wrong'));
          }).catch(error => {
            console.log(error);
            this.util.hide();
            this.util.errorToast(this.util.translate('Something went wrong'));
          });
        } else {
          this.util.errorToast(this.util.translate('Something went wrong'));
          return false;
        }
      });
    } else {
      this.util.errorToast(this.util.translate('Error while fetching google maps... please check your google maps key'));
      return false;
    }


  }

  updateAddress() {
    if (this.address == '' || this.landmark == '' || this.house == '' || this.pincode == '') {
      this.util.errorToast(this.util.translate('All Fields are required'));
      return false;
    }
    if (typeof google == 'object' && typeof google.maps == 'object') {

      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({ address: this.house + ' ' + this.landmark + ' ' + this.address + ' ' + this.pincode }, (results: any, status: any) => {
        console.log(results, status);
        if (status == 'OK' && results && results.length) {
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          console.log('----->', this.lat, this.lng);
          const param = {
            id: this.id,
            uid: localStorage.getItem('uid'),
            address: this.address,
            lat: this.lat,
            lng: this.lng,
            title: this.title,
            house: this.house,
            landmark: this.landmark,
            pincode: this.pincode
          };
          this.util.show();
          this.api.post_private('v1/address/updateMyAddress', param).then((data: any) => {
            this.util.hide();
            if (data && data.status == 200) {
              this.util.publishNewAddress();
              this.util.onBack();
              this.util.showToast('Address updated', 'success', 'bottom');
            } else {
              this.util.errorToast(this.util.translate('Something went wrong'));
            }
          }, error => {
            console.log(error);
            this.util.hide();
            this.util.errorToast(this.util.translate('Something went wrong'));
          });
        } else {
          this.util.errorToast(this.util.translate('Something went wrong'));
          return false;
        }
      });
    } else {
      this.util.errorToast(this.util.translate('Error while fetching google maps... please check your google maps key'));
      return false;
    }

  }

  back() {
    this.util.onBack();
  }
}
