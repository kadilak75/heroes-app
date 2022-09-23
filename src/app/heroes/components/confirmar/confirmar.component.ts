import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroes } from 'src/app/interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: ['./confirmar.component.css']
})
export class ConfirmarComponent implements OnInit {

  //inicializamos el dialogRef que va tener control del Pop Up
  //Injectamos la data que va a provenir desde el compinente agregar
  constructor(public dialogRef: MatDialogRef <ConfirmarComponent>,
            @Inject(MAT_DIALOG_DATA) public data: Heroes) { }

  ngOnInit(): void {
  }

  //ambos metodos cierran el pop Up pero el metodo borrar el recibir el parametro true
  // lo vamos a configurar en el componente agregar para que ejecute una accion
  borrar(){
    this.dialogRef.close(true)
  }
  cerrar(){
    this.dialogRef.close()
  }

}
