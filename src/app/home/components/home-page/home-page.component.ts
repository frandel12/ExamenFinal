import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/shared/components/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private homeService: HomeService) { }
  lat!: number;
  lon!: number;
  weather: any;
  pronostic: any;
  city : any;
  celsius: number = 0;
  fahrenheit: number = 0;



  ngOnInit() {
    this.getLocation();
    this.getPronostic();
  }



  getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        this.homeService.getUbication().subscribe(data => {
          this.weather = data;
        })
      })
    }
  }
  getCity(city: any) {
    this.homeService.getCityName(city)
    .subscribe(data => {
      this.weather = data;

    })
  }

  getPronostic() {
    this.homeService.getForecast()
      .subscribe(
        (data: any) => {
          this.pronostic = data;
        }
      );
  }

  kelvinToCelsius(temp: number): string {
    const celsius = temp - 273.15;
    return `${celsius.toFixed(1)} °C`;

  
  }
  celsiusToFahrenheit(celsius: number) {
    this.fahrenheit = (celsius * 1.8) + 32;
  }

  fahrenheitToCelsius(fahrenheit: number) {
    this.celsius = (fahrenheit - 32) / 1.8;
  }
}