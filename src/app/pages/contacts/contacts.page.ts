/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Grocery Delivery App Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2024-present initappz.
*/
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UtilService } from 'src/app/services/util.service';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
declare var google: any;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  map: any;
  circle: any;
  latOri: any;
  longOri: any;

  contact = {
    name: '',
    email: '',
    message: '',
    status: '0',
    date: moment().format('YYYY-MM-DD')
  };

  constructor(
    private navCtrl: NavController,
    public util: UtilService,
    public api: ApiService,
  ) {
    console.log('address-->>', this.util.general);
    if (this.util.general && this.util.general.address) {
      const geocoder = new google.maps.Geocoder;
      geocoder.geocode({
        address: this.util.general.address + ' ' + this.util.general.city + ' ' +
          this.util.general.state + ' ' + this.util.general.country + ' ' + this.util.general.zip
      }, (results: any, status: any) => {
        console.log(results, status);
        if (status == 'OK' && results && results.length) {
          this.latOri = results[0].geometry.location.lat();
          this.longOri = results[0].geometry.location.lng();
          this.loadMap(this.latOri, this.longOri);
        }
      });
    }

  }

  ngOnInit() {

  }

  back() {
    this.navCtrl.back();
  }

  loadMap(lat: any, lng: any) {
    const latLng = new google.maps.LatLng(lat, lng);
    const mapOptions = {
      center: latLng,
      zoom: 12,
      scaleControl: false,
      streetViewControl: false,
      zoomControl: false,
      overviewMapControl: false,
      mapTypeControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    const marker = new google.maps.Marker({
      map: this.map,
      position: latLng
    });
    const sunCircle = {
      strokeColor: '#49befc',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#49befc',
      fillOpacity: 0.35,
      map: this.map,
      center: latLng,
    };
    this.circle = new google.maps.Circle(sunCircle);
    this.circle.bindTo('center', marker, 'position');

  }

  submit() {
    console.log('contact', this.contact);
    if (this.contact.name == '' || this.contact.email == '' || this.contact.message == '') {
      this.util.errorToast(this.util.translate('All Fields are required'));
      return false;
    }
    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(this.contact.email)) {
      this.util.errorToast(this.util.translate('Please enter valid email'));
      return false;
    }

    this.util.show();
    this.api.post_public('v1/contacts/create', this.contact).then((data: any) => {
      this.util.hide();
      if (data && data.status && data.status == 200 && data.data) {
        const param = {
          id: data.data.id,
          mediaURL: this.api.mediaURL,
          subject: this.util.translate('New Mail Request Received'),
          thank_you_text: this.util.translate('You have received new mail'),
          header_text: this.util.translate('New Contact Details'),
          email: this.util.general.email,
          from_mail: this.contact.email,
          from_username: this.contact.name,
          from_message: this.contact.message,
          to_respond: this.util.translate('We have received your request, we will respond on your issue soon')
        };
        console.log(param);
        this.api.post_public('v1/sendMailToAdmin', param).then((data: any) => {
          console.log(data);
        }, error => {
          console.log(error);
        });
        this.contact.email = '';
        this.contact.name = '';
        this.contact.message = '';
        if (data && data.status == 200) {
          this.util.showToast(this.util.translate('Message sent successfully'), 'success', 'bottom');
        } else {
          this.util.apiErrorHandler(data);
        }
      }

    }, error => {
      console.log(error);
      this.util.hide();
      this.util.apiErrorHandler(error);
    });
  }
}
