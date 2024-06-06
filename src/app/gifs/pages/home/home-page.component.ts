import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';
//componente padre
@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html',

})
export class HomePageComponent {
  constructor(private gifsService : GifsService) {
  }

  get gifsLista() : Gif[]{
    return this.gifsService.gifList;
  }
}
// gifsLista": Es la expresión que se evalúa en el contexto del componente padre y cuyo valor se pasa al componente hijo::
// <gifs-card-list [gifs]="gifsLista"></gifs-card-list>

