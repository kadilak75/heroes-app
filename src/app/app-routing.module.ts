import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/guards/auth.guard';
import { HeroeTarjetaComponent } from './heroes/components/heroe-tarjeta/heroe-tarjeta.component';
import { ErroPageComponent } from './shared/erro-page/erro-page.component';


const routes: Routes = [


  {
    path:'auth',
    loadChildren:() => import('./auth/auth.module').then(m =>m.AuthModule)
  },
  {
    path: 'heroes',
    loadChildren:() => import ("./heroes/heroes.module").then(m => m.HeroesModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'tarjeta',
    component: HeroeTarjetaComponent
  },
  {
    path: '404',
    component: ErroPageComponent
    
  },
  {
    path: '**',
    component: ErroPageComponent
  }

]



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule { }
