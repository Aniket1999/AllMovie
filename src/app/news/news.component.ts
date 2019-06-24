import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { DataService } from '../data.service';
import { TvService } from '../datatv.service';
import { PersonService } from '../person.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  articles; 
  modals;
  value: string;
  datamodal: string;
  mediatype: string;
  media: boolean;
  result=false;

  @ViewChild('movieName',{ read: true, static: false }) movieName: ElementRef;
  constructor(private apiService: ApiService,private dataService: DataService,private tvService: TvService,private prService: PersonService) { }

  ngOnInit() {
}

  getNews(){
    this.result=true;
    // console.log(this.value);
    this.apiService.getNews(this.value).subscribe((data)=>{
       console.log(data);
      this.articles = data['results'];
      this.articles.forEach(function (element){
        // console.log(element.poster_path);
        if(element.poster_path == null && element.profile_path==null){
          element.poster_path = "/assets/noPhotoFound.png"; 
          element.profile_path = "";
        } else if(element.profile_path == null) {
          element.poster_path = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+element.poster_path;
          element.profile_path="";
        } else if(element.poster_path == null) {
          element.profile_path = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+element.profile_path;
          element.poster_path="";
        }
      });
    });
  }

  getData(datamodal,mediatype){
    if(mediatype=='tv')
    {
      this.media=true;
      this.tvService.getData(datamodal).subscribe((data)=>{
        this.modals = data;
        if(this.modals.poster_path == null){
          this.modals.poster_path = "/assets/no-image.png"; 
        } else {
          this.modals.poster_path = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+this.modals.poster_path;
        }
      });
    }
    else if(mediatype=='movie')
    {
      // console.log(datamodal);
      this.media=true;
      this.dataService.getData(datamodal).subscribe((data)=>{
      this.modals = data;
      if(this.modals.poster_path == null){
        this.modals.poster_path = "/assets/no-image.png"; 
      } else {
        this.modals.poster_path = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+this.modals.poster_path;
      }
    });
    }
    else if(mediatype=='person')
    {
      this.media=false;
      this.prService.getData(datamodal).subscribe((data)=>{
      this.modals = data;
      // console.log(this.modals);
      if(this.modals.profile_path == null){
        this.modals.poster_path = "/assets/no-image.png"; 
      } else {
        this.modals.poster_path = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/"+this.modals.profile_path;
      }
    });
    }

  }
}
