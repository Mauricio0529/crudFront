/*
ESTOS VAN A CONSUMIR EL REST DEL BACKEND DE JAVA
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class PersonService {
  private API_SERVER = "http://localhost:8080/person/";
  
  constructor( private httpClient: HttpClient ) { }

  public getAllPerson(): Observable<any>{
    return this.httpClient.get(this.API_SERVER);
  }

  /*
  infoPerson: any, se obtiene todos los datos del formulario html  */
  public savePerson(person: any): Observable<any>{
    return this.httpClient.post(this.API_SERVER, person);
  }

  // eliminar una persona por medio del id
  public deletePerson(idPerson): Observable<any>{
    // el "delete/"+idPerson eso es del backend
    return this.httpClient.delete(this.API_SERVER+"delete/"+idPerson);
  }
}