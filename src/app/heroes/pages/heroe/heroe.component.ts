import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from 'src/app/interfaces/heroes.interface';


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  .altura{
    min-height: 700px;
    width: 100%
  }
  img{
    height:100%;
    width: 100%;
  }
  `
  ]
})
export class HeroeComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private heroesService: HeroesService ) { }

  hero!: Heroes
  hayError: boolean = false                

  ngOnInit(): void {
    
    
    this.activatedRoute.params
    .pipe(
      switchMap( (resp) =>
       this.heroesService.getLoneHero(resp['id'])
    )
     )
     .subscribe( (heroe) =>{
      this.hayError= false;
      this.hero = heroe
      console.log(heroe)
      console.log(this.hayError)
    },(err)=>{
      this.hayError = true;
      console.log(err)
      console.log(this.hayError)
    })
  }

}
