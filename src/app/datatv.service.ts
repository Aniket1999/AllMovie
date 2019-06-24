import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TvService {
  API_KEY = '53866849ce70a0bde309f7d38aae7142';
  constructor(private httpClient: HttpClient) { }
  public getData(value){
    return this.httpClient.get(`https://api.themoviedb.org/3/tv/${value}?api_key=${this.API_KEY}`);
  }
  
}