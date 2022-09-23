import { Component, Input, OnInit } from '@angular/core';
import { Heroes } from 'src/app/interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [`.card div{
    margin-top: 20px
  }`
  ]
})


export class ListadoComponent implements OnInit {
 
 heroes!: Heroes[]; 

  constructor(private heroesService: HeroesService)
              { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(resp =>this.heroes= resp)

  }

}
