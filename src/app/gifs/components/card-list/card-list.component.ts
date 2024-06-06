import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';
@Component({
  // componente hijo
  selector: 'gifs-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
//componente hijo con el input debe estar definido para aceptar la propiedad gifs como entrada
@Input()
public gifs : Gif[] = [];

}
