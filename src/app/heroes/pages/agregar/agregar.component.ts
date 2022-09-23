import { Component, OnInit } from '@angular/core';
import { Heroes, Publisher } from 'src/app/interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img{
    width: 100%;
    border-radius: 5px
  }`
  ]
})

export class AgregarComponent implements OnInit {

  
  publishers = [ 
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroes = {

  
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics ,
    alt_img: ''
  }

  



  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              ) { }

            

  /* ya que tenemos la funcion de agregar y actualizar en el mismo componente 
   /en este ngOnInit utilizamos el ActivatedRoute para preguntar si estamos tratando con un nuevo
   heroe o estamos recibiendo un heroe ya creado, para esto aprovechamos que los heroes creados ya poseen un 
   ID y que de ser así lo estamos recibiendo en el URL así que con este ID hacemos una petición de busqueda que 
   regresa un heroe. nos suscribimos a esta respuesta y le asignamos el valor a this.heroe
   */           
  ngOnInit():void {

    if(!this.router.url.includes('editar')){
      return
    }

    this.activatedRoute.params
    .pipe(
      switchMap( (resp) =>
        this.heroesService.getLoneHero(resp['id'])
      ),tap( resp => console.log(resp))
    )
    .subscribe(heroe =>{
      this.heroe = heroe
      console.log(this.heroe.id)
    })
  }

  guardar(){

    console.log(this.heroe)

    if(this.heroe.superhero.trim().length===0){
      return
      
    }
    
    if(this.heroe.id){
      this.heroesService.actualizarHeroe(this.heroe).subscribe(resp =>{
        console.log('se ha actualizado' ,resp),
        this.openSnackBar('Se ha Actualizado el Heroe');
      })
    }else{
      
    this.heroesService.agregarHeroe( this.heroe).subscribe(resp =>{
      console.log('se ha agregado',resp);
      this.router.navigate(['heroes/editar',resp.id])
      this.openSnackBar('Se ha Creado el Heroe');
    })
  }
  }

  borrar(){

    const dialog =this.dialog.open(ConfirmarComponent,{
        //ancho del pop Up
        width: '550px',
        //informacion que le vamos a mandar de este componente
        data: {...this.heroe} //mandando una copia identica del componente heroe
      });
         // una vez que se cierre va a recibir un observable que va a ser true o false dependiendo de que boton hayamos presionado
    // true si se ejecuto borrar() undefined si se ejecuto cerrar()
      dialog.afterClosed()
      //switch map recibe un observable y regresa un observable por lo cual siempre tenemos que dar un resultado
      .pipe(
        //switch map permite preguntas ternarias pero no if por alguna razon
        switchMap( (value)=> (value)?this.heroesService.borrarHeroe(this.heroe.id!): of(false)  )   
        //si el observable es true borra el heroe, of(false) simplemente regresa un observable con el valor false

      )
      .subscribe(resp =>{
        this.router.navigate(['/heroes']) 
          
      })
     






    // const dialog =this.dialog.open(ConfirmarComponent,{
    //   //ancho del pop Up
    //   width: '550px',
    //   //informacion que le vamos a mandar de este componente
    //   data: {...this.heroe} //mandando una copia identica del componente heroe
    // });
    // // una vez que se cierre va a recibir un observable que va a ser true o false dependiendo de que boton hayamos presionado
    // // true si se ejecuto borrar() undefined si se ejecuto cerrar()
    // dialog.afterClosed().subscribe(result =>{
    //   console.log(result)
    //   if(result){
    //     this.heroesService.borrarHeroe(this.heroe.id!)
    //       .subscribe( resp =>{
    //       this.openSnackBar('Se ha Eliminado el Heroe');
    //       this.router.navigate(['/heroes']) 
          
    //     })

    //   }
    // })
    

  }

  //pese a que el boton en la documentación es opcional si no se escribe no funciona
  openSnackBar(message: string) {
    // mensaje a mandar/boton para cerrar/ duracion del aviso
    this._snackBar.open(message,'Hecho',{
      duration: 3000
    });
  }
  //muestra un pop Up, este lo tiene que cargar de otro componente en este caso confirmar component 
  // openDialog() {
  //   const dialog =this.dialog.open(ConfirmarComponent,{
  //     //ancho del pop Up
  //     width: '550px',
  //     //informacion que le vamos a mandar de este componente
  //     data: {...this.heroe} //mandando una copia identica del componente heroe
  //   });
  //   // una vez que se cierre va a recibir un observable que va a ser true o false dependiendo de que boton hayamos presionado
  //   // true si se ejecuto borrar() undefined si se ejecuto cerrar()
  //   dialog.afterClosed().subscribe(result =>{
  //     console.log(result)
  //   })

  // }



}
    
  

