/*
ESTOS VAN A CONSUMIR EL REST DEL BACKEND DE JAVA
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})

export class StateService {
  private API_SERVER = "http://localhost:8080/state/";

  constructor(  private httpClient: HttpClient ) { }

  // obtener todos los estados de un pais
  // se obtiene el nombre del pais no el id, esto se hace en el backend de java en el service
  public getAllStateByCountry(idCountry): Observable<any>{
    return this.httpClient.get(this.API_SERVER+idCountry);
  }

}
