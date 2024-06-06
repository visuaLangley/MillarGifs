import { Component, ElementRef, ViewChild , Output} from '@angular/core';
import { GifsService } from '../../services/gifs.service';
// @Output()NO VA ESto
@Component({
  selector: 'gif-search-box',
  template: `

  <h5>Buscar  <i class="bi bi-search"></i> </h5>

  <input type="text"
  class="form-control"
  placeholder="Buscar gifs..."
  (keyup.enter)="searchTag()"
  #txtTagInput
  >
  `
})


export class SearchBoxComponent {
  @ViewChild('txtTagInput')
public tagInput!: ElementRef<HTMLInputElement>;


constructor( private gifsService : GifsService){}


  searchTag( ){
    const newTag = this.tagInput.nativeElement.value
    // console.log({ newTag });
    this.gifsService.searchTag(newTag)
    this.tagInput.nativeElement.value = '';
  }
}
