
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
class HomeService {
  constructor(private _http: HttpClient) {
    this.init();
  }

  init() {
    console.log('HomeService initialized');
  }

  getDetails() {
    console.log('Get details');
  }
}