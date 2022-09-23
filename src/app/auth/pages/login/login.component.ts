import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';
import { User } from '../../interfaces/user.interface';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {






  constructor(private router: Router,
              private authService : AuthService) { }

  ngOnInit(): void {
  }

  login(){

    this.authService.login()
   
    .subscribe(resp =>{
      console.log(resp)
      this.router.navigate(['heroes/listado'])
    })


    //this.router.navigate(['./heroes/listado'])

  }

  loginSinAuth(){
    this.router.navigate(['./heroes/listado'])
  }
}
