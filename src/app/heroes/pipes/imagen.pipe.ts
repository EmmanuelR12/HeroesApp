import { Pipe, PipeTransform } from '@angular/core';
import {Heroe} from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen',
  pure:false //PIPE INURO ACTUALIZA CON CADA CAMBIO DE ANGULAR gasta mas recursoso y no siempre es lo mejor 
})
export class ImagenPipe implements PipeTransform {
  ruta:string= 'assets/heroes/'

  transform(heroe:Heroe ):string { 
    
    if(!heroe.id && !heroe.alt_img){
      return 'assets/no-image.png'
    }else if(heroe.alt_img){
      return heroe.alt_img
    }else{
    return this.ruta+heroe.id+".jpg";
    }
  }

}
