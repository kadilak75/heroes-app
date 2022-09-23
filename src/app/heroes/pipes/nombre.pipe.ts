import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from '../../interfaces/heroes.interface';

@Pipe({
  name: 'nombre'
})
export class NombrePipe implements PipeTransform {

  transform(heroe: Heroes): string {
    if(heroe.id){
      const heroName: string = heroe.superhero
      return heroName
    }else{
      return 'Nuevo Heroe'
    }
    

  }

}
