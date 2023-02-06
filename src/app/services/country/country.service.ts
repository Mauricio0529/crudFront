/*
ESTOS VAN A CONSUMIR EL REST DEL BACKEND DE JAVA
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  // colocamos la url del spring boot cuando se ejecuta
  private API_SERVER = "http://localhost:8080/country/getAll";

  constructor(private httpClient: HttpClient) { }

  // obtenermos todos los paises
  public getAllCountry(): Observable<any> {
    // en el java se ejecuta el GetMaping
    return this.httpClient.get(this.API_SERVER);
  }
}