import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apikey = 'ef19dcdc9cadb0c14549a25f65d5a07a';

  constructor(private http: HttpClient) {
  }

  getUbication() {
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position)
        },
        (error) => {
          observer.next(error)
        }
      )
    }).pipe(
      map((value: any) => {
        return new HttpParams()
          .set('lon', value.coords.longitude)
          .set('lat', value.coords.latitude)
          .set('units', 'imperial')
          .set('appid', this.apikey)
      }),
      switchMap((values) => {
        return this.http.get('http://api.openweathermap.org/data/2.5/weather', { params: values });
      })
    )
  }


  getCityName(city: any) {
    let params = new HttpParams()
      .set('q', city)
      .set('units', 'imperial')
      .set('appid', this.apikey)
    return this.http.get('http://api.openweathermap.org/data/2.5/weather', { params });
  }

  getForecast( ){
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?q=Santiago&appid=ef19dcdc9cadb0c14549a25f65d5a07a');
  }
}
