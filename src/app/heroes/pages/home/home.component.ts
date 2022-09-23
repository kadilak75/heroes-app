import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interfaces/user.interface';
import { LoginComponent } from 'src/app/auth/pages/login/login.component';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`

  .container{
    margin: 10px;
  }

  `]
})
export class HomeComponent implements OnInit {

  constructor( private router: Router,
               private authService: AuthService ) { }

              public user: User = this.authService.getUser

  ngOnInit(): void {
  }

  
  logout(){
    this.router.navigate(['./auth'])
  }




}
