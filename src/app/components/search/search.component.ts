import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PlacesService } from '../../services/places.service'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less'],
})
export class SearchComponent implements OnInit {
  searchTerm1: FormControl = new FormControl();
  searchResult1 = [];

  searchTerm2: FormControl = new FormControl();
  searchResult2 = [];

  showItems1: boolean = false;
  showItems2: boolean = false;
  @ViewChild('itemFilterInput1', { static: false }) itemFilterInput1: ElementRef;
  @ViewChild('itemFilterInput2', { static: false }) itemFilterInput2: ElementRef;

  constructor(private placesService: PlacesService) {
    this.searchTerm1.valueChanges
      .subscribe(data => {
        if (data.length >= 3) {
          this.placesService.search_word(data).subscribe(response => {
            this.searchResult1 = response;
          })
        }
      })
    this.searchTerm2.valueChanges
      .subscribe(data => {
        if (data.length >= 3) {
          this.placesService.search_word(data).subscribe(response => {
            this.searchResult2 = response;
          })
        }
      })
  }

  ngOnInit() {

  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  selectItem(item, index) {
    if (index == 1) {
      this.itemFilterInput1.nativeElement.value = item;
      this.showItems1 = false;
    } else {
      this.itemFilterInput2.nativeElement.value = item;
      this.showItems2 = false;
    }
  }

  getof(index) {
    setTimeout(() => {
      if (index == 1) {
        this.showItems1 = false;
      } else {
        this.showItems2 = false;
      }
    }, 100);
  }

}
