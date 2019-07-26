import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  url: string
  constructor(private http:HttpClient) {
    this.url = 'https://www.viajanet.com.br/resources/api/Autocomplete/'
  }

  search_word(term) {
    return this.http.get(this.url + term + '/').pipe(
      map(res => {
        var data = res
        let locations: string[] = [];
        var places = Object.keys(data).map(it => data[it]);

        places[0].forEach((element, index) => {
          locations[index] = element.Name;
        });

        return locations;
      })
    )
  }

}