import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, Subject, tap } from 'rxjs';
import { Heroes } from '../../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {

  
  termino: string = '';
  heroes!: Heroes[];
  loneHero!: Heroes;
    hayError: boolean = false;

  //servicio
  constructor(private heroesService: HeroesService) {}

  //debouncer
  debouncer: Subject<string> = new Subject();


  
  ngOnInit() {
    //el debouncer recibe un termino y cada 300ms realza lo siguiente:
    this.debouncer.pipe(
      debounceTime(300)
      )
      //recibe un valor de el metodo sugerencias()
    .subscribe( (valor) => {
      
        console.log('debouncer: ' + valor);

      //si el valor esta vacio vacia el arr de heroes y no se muestran sugerencias
        switch (valor){

          case'':
          this.heroes = []
          break;

          // si no esta vacio se hace la busqueda con el termino
         default:
          this.heroesService.getHeroArray(valor).subscribe( resp =>{ 
           (resp.length === 0)
           //si el array respuesta no tiene contenido se muestra el mensaje de no hay heroes
           //y borra el arr de heroes para que no aparezcan resultados anteriores
           ?
           
           (this.hayError = true,
            this.heroes = [])
           
           
           //si el array tiene un heroe se regresa el heroe y se lo asignamos al arr vacio de heroes
           :
           this.heroes = resp;
           console.log(this.heroes); 
           console.log(this.hayError);
            
          },(error)=>{
          console.log(error)
          
        })
      
      }});
  }


  //cuando se intruduce algo en la barra de busqueda se va a mandar el contenido de esta al debouncer
  //se reinicia el mensaje de no hay Heroes
  sugerencias() {
    
    this.hayError = false;
    this.debouncer.next(this.termino);
    
  }

  //al seleccionar una opcion de las sugerencias:
  //se recibe la opcion seleccionada y de esta se recupera el valor que va a ser el objeto heroe
  //este objeto se asigna a una constante y se cambia el valor del termino a el nombre del superheroes
  //para que este se pueda ver en la barra de busqueda como un nombre y no como un OBJECT
  buscar(heroe: MatAutocompleteSelectedEvent) {
    //constante con la que se hace la busqueda
    const hero: Heroes = heroe.option.value
    //se le vuelve a dar el valor del nombre del heroe al termino para que se muestre en la barra de busqueda
    this.termino = hero.superhero
    console.log(heroe);
    //se hace la busqueda con el valor de la constante hero que ahora guarda el objeto heroe que seleccionamos
    this.heroesService
      .getLoneHero(`/${hero.id}`)
      .subscribe((resp) => {
        //este se guarda en otra variable para mostrarla en un div
        this.loneHero = resp;
        
      });
    }
  
}
