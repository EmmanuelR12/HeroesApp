import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs';
import {ConfirmarComponent} from '../../components/confirmar/confirmar.component';
import {Heroe, Publisher} from '../../interfaces/heroes.interfaces';
import {HeroesService} from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  publisher =[
    {
      id:'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];
  heroe: Heroe={
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher:Publisher.DCComics,
    alt_img:''
  }

  constructor(private heroService: HeroesService, 
	private activatedRoute:ActivatedRoute,
	private router: Router,
	private snackBar: MatSnackBar,
	private dialog:MatDialog
	     ) { }

  ngOnInit(): void {

    if(!this.router.url.includes('editar')){
     return 
    }    
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.heroService.getHeroePorId(id))
    )
    .subscribe(hero => this.heroe = hero);
  }
  guardar(){
    if(this.heroe.superhero.trim().length === 0){
      return
    } 

    if(this.heroe.id){
      this.heroService.editarHeroe(this.heroe)
      .subscribe(resp => this.mostrarSnackbar('Registro actualizado'))
    }else{
      this.heroService.agregarHeroe(this.heroe)
      .subscribe(resp =>{
	this.router.navigate(['/heroes/editar',resp.id])
	this.mostrarSnackbar('Registro Creado')
      })
    }

  }
  borrarHeroe(){
    const dialog= this.dialog.open(ConfirmarComponent,{
      width: '250px',
      data:this.heroe
    }); 
    
    dialog.afterClosed().subscribe(
      (result) =>{
	if(result){
	  this.heroService.deleteHero(this.heroe.id!)
	  .subscribe(resp =>
		     this.router.navigate(['/heroes'])
		    );
	}
      }
    )
  }

  mostrarSnackbar(mensaje:string):void{
    this.snackBar.open(mensaje,'Ok!',{
      duration:2500
    })
  }
}
