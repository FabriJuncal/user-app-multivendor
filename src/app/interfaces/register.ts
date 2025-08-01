/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Grocery Delivery App Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2024-present initappz.
*/
export interface register {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  mobile: string;
  fcm_token: string;
  type: string;
  lat: string;
  lng: string;
  cover: string;
  status: number;
  others: string;
  date: string;
  stripe_key: string;
  country_code: string;
  check: boolean;
  referral_code?: string;
}
