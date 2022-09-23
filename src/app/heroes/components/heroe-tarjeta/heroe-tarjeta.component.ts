import { Component, Input } from '@angular/core';
import { Heroes } from 'src/app/interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [
    `.card{
      margin-top: 20px;
    }`
  ]
})
export class HeroeTarjetaComponent{


  @Input() heroe!: Heroes

 

}
