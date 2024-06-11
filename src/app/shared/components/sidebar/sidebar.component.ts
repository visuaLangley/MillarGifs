import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
//Inyección del servicio con el constructor
  constructor( private gifsService : GifsService){}

//como esta privado creamos un getter para tener acceso a el desde el html sidebar.component
//el getter tags en SidebarComponent permite que la plantilla HTML acceda al historial de etiquetas.
get tags() : string[]{
    return this.gifsService.tagsHistory;
  }


  //cuando el usuario selecciona una etiqueta desde la barra lateral, searchTag se invoca, actualizando tanto el historial como los resultados de la búsqueda.
  public searchTag( tag : string ) : void{
    this.gifsService.searchTag(tag)
  }
//metodo para eliminar tag, que viene tambien de nuestro gifsService
  public removeTag( tag : string) : void {
    this.gifsService.removeTag(tag);
  }
}
