import { Pipe, PipeTransform } from '@angular/core';
import {Heroe} from '../interfaces/heroes.interfaces';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
  ruta:string= 'assets/heroes/'

  transform(heroe:Heroe ):string { 
    
    return this.ruta+heroe.id+".jpg";
  }

}
