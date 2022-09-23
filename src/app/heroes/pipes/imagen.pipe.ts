import { Pipe, PipeTransform } from '@angular/core';
import { Heroes } from 'src/app/interfaces/heroes.interface';

@Pipe({
  name: 'imagen',
  pure: false
  
})
export class ImagenPipe implements PipeTransform {

  transform(heroe: Heroes): string {
    let img: string = ''

      if (!heroe.id || heroe.alt_img! === ''  ){
        img = '/assets/assets/no-image.png'
      
      }else if(heroe.alt_img && heroe.alt_img !==''){
        img = heroe.alt_img!

      }else{
       img = `/assets/assets/heroes/${heroe.id}.jpg`
     }
      return img
   //${ heroe.id }
}
}
