import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from './services/country/country.service';
import { PersonService } from './services/person/person.service';
import { StateService } from './services/states/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'MAIN';
  personForm: FormGroup; // se configura el tsconfig.json= "strict": false,
  countrys: any; // esta variable la usamos en el html de app.component.html
  states: any;
  persons: any;

  // Declaramos las clases o herramientas que se usan para acceder a sus metodos
  constructor(
    public fb: FormBuilder,
    public countryService: CountryService,
    public personService: PersonService,
    public stateService: StateService
  ){

  }
  
  /*
  * El OnInit solo se ejecuta 1 vez.
  * Vamos a cargar los servicios del backend cuando se ejecute el OnInit.
  */

  ngOnInit(): void { // esta es el start que inicia la pagina
    // todas las variables que tiene person en java
    // creamos el formulario
    this.personForm = this.fb.group({
      idPersona: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
    });;

    // Ahora vamos a empezar a usar los servicios para listar la informacion en el select
    // instaciamos el metodo de obtener todos los paises
    this.countryService.getAllCountry().subscribe(response => {
    // esto es como un response
       this.countrys = response;
    },
      error => { console.error(error) }
    );

    // obtener o listar todas las personas
    this.personService.getAllPerson().subscribe(response => {
      this.persons = response;
    },
      error => { console.error(error) }
    );

    // obtener los estados de un pais
    this.personForm.get('country').valueChanges.subscribe(value => {
      this.stateService.getAllStateByCountry(value.idCountry).subscribe(response => {
        this.states = response;
      },  
        error => { console.error(error) }
      );
    })
  }

  // guardar, registrar o crear una persona
  save(): void {
    this.personService.savePerson(this.personForm.value).subscribe(response => {
      // se registro correctamente
      this.personForm.reset();

      /*
      // DESDE AQUI ESTO NO LO EXPLIQUE BIEN //
      Al momento de editar, el filter nos ayuda a usar el mismo boton de guardar.
      primero vamos a limpiar la lista de persons.
      
      la condicion
      si existe algo response.id eso debe ser diferente a person.id
      la lista va a quedar completamente diferente a la que guardamos como primera vez
      // HASTA AQUI ESTO NO LO EXPLIQUE BIEN//

      // ESTO SI EXPLICA COMO FUNCIONA EL filter
      eliminar los elementos que tengan el mismo id, esto se visualiza en la tabla al momento de modificar
      y deja el id que se modifico (la persona modificada y se borra la antigua)
      */
      this.persons = this.persons.filter(person=> response.id != person.id);
      
      /*
      https://www.youtube.com/watch?v=dsFD3A5ddhA&list=PLI4dAv2GvnrQ-aiqTCi4e_O3kEbEz-4DZ&index=12
      reactividad, para que sea reactiva (tiempo real), ya que postgres no es en tiempo real
      */
      this.persons.push(response);
    },  
      error => { console.error(error) }
    );
  }
  
  // eliminar una persona por id
  deletePersons(person): void {
    this.personService.deletePerson(person.idPersona).subscribe(response => {
      // eliminar la persona, no se para que es el .pop()
      // el .pop() elimina la persona que esta en la tabla, eso es mas que todo para que sea en tiempo real
      console.log(response)
      if(response) this.persons.pop(person)
    },
      error => { console.error(error) }
    );
  }

  // Al momento de dar clic al boton, se llene los campos (inputs) con los datos de la persona
  editPerson(person): void {
    this.personForm.setValue({
        idPersona: person.idPersona,
        nombre: person.nombre,
        apellido: person.apellido,
        edad: person.edad,
        country: person.country,
        state: person.state
    })
  }
   


  // event, obtenemos el pais que se selecciona en el select pais, para obtener los estados
/*  cargarEstadosPorPais(event): void {
    this.stateService.getAllStateByCountry(event.target.value).subscribe(response => {
      this.states = response;
    },  
      error => { console.error(error) }
    );
  }*/
}
// [formGroup] = "personForm" (ngSubmit)="guardar"