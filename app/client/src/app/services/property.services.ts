/**
 * Created by Anand.PratapSingh on 28-03-2018.
 */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { rateApis } from '../../environments/constants';


@Injectable()
export class PropertyService {


  constructor(private http: HttpClient) { }


  submitRate(body) {
 


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(rateApis.changeRate, body, httpOptions);

  }
  submitRates(body) {

    console.log(body);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(rateApis.changeRate, body, httpOptions);

  }

  changeOwner(body) {

    console.log(body);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(rateApis.changeRate, body, httpOptions);

  }
  getRates() {



    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get(rateApis.getRates + '?startIndex=P1000001&endIndex=P1000101', httpOptions);

  }
}
