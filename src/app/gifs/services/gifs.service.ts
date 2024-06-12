import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif } from '../interfaces/gifs.interfaces';
//  Injectable de Angular, que permite que el servicio sea inyectado en otros componentes o servicios.

// Este decorador @Injectable indica que el servicio GifsService es un servicio inyectable y está disponible a nivel global en la aplicación
// providedIn: 'root' asegura que haya una única instancia del servicio en toda la aplicación (singleton).

@Injectable({providedIn: 'root'})
export class GifsService {


  //este gifList almacena o contiene toda la lista de los gifs que mostramos en el momento
  public gifList : Gif[] = [];



   // Propiedad privada para almacenar el historial de etiquetas de búsqueda de GIFs
   // como un arreglo de cadenas.

  private _tagsHistory : string[] = [];
  private apiKey :       string = 'F7DUPpwRqjPpj0U9W9XpnXNc8eQiTxST'
  private serviceUrl :   string = 'http://api.giphy.com/v1/gifs'


  constructor( private http: HttpClient) {
    this.loadLocalStorage();
   }



// Método getter para obtener una copia del historial de etiquetas
  get tagsHistory(){
    return [...this._tagsHistory]
  }



  public organizeHistory( tag : string){

    tag = tag.trim().toLowerCase(); // Elimina espacios innecesarios en blanco y convierte a minúsculas

    if(tag.length === 0) return;

    if ( this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag)
    }

    this._tagsHistory.unshift( tag ); // Agrega el tag al inicio del historial

    if(this._tagsHistory.length > 10){

      this._tagsHistory.pop();

    }
    this.saveLocalStorage();
    // this.loadLocalStorage();


  }

  //eliminar tag
  removeTag(tag : string) : void{
    this._tagsHistory = this._tagsHistory.filter(t => t !== tag);
    this.saveLocalStorage(); // Guarda el estado actualizado en localStorage
  }
  //elimina todos los tags
  // public clearTags(): void {
  //   this._tagsHistory = [];
  //   this.saveLocalStorage(); // Guarda el estado actualizado en localStorage
  // }

  private saveLocalStorage() : void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory))
  }

  private loadLocalStorage() : void {
    if( !localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')! );
    if (this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0]);

  }
  public searchTag( tag : string ) : void {

    this.organizeHistory(tag);
    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', tag)
    // /search?api_key=F7DUPpwRqjPpj0U9W9XpnXNc8eQiTxST&q=fortnite&limit=10
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
    .subscribe( (resp) => {
      this.gifList = resp.data;
      // console.log({gifs: this.gifList})

    })

  }

}
