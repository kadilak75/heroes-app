import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.interface';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:3000"

  //usuario recuperado del método login()
  private user! : User


  //este método nos permite recuperar el usuario desde un componente sin comprometer la integridad de este
  //ya que lo que se envía es una copia de este objeto no el objeto en sí
  get getUser() :User{
    return {...this.user};
  }

  constructor(private http: HttpClient) { }

 /* se quiere crear un servicio login que haga la petición del usuario
 pero tambiñen se deséa recuperar este valor, para poder observarlo normalmente   tendríamos que hacer
 la subscripción, pero si esta la queremos realizar en el componente que use el servicio podemos
 recuperar el valor del observable utilizando el operador tap() y le asignamos el valor recuperado a 
 una variable local  */
  login(): Observable<User>{
    return this.http.get<User>(`${this.url}/usuarios/1`)
     .pipe(
      tap(resp => this.user = resp),
      tap(auth => localStorage.setItem('token', auth.id))
    );
  }

  verificarAuth(): Observable<boolean>{
    if (!localStorage.getItem('token')){
      return of(false)
    }
    return this.http.get<User>(`${this.url}/usuarios/1`)
    .pipe(
      map(auth =>{return true})
    );
  }
 


}
