import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroes } from 'src/app/interfaces/heroes.interface';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;


  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Heroes[]>{
  const url: string = `${this.baseUrl}`  
  return this.http.get<Heroes[]>(url)
  }

  getLoneHero(id: string): Observable<Heroes>{
    const url: string = `${this.baseUrl}/${id}`  
    return this.http.get<Heroes>(url)
  }

  agregarHeroe(heroe: Heroes): Observable<Heroes> {
    return this.http.post<Heroes>(`${this.baseUrl}`, heroe);
  }

  getHeroArray (termino: string): Observable<Heroes[]> {
    const url: string = `${this.baseUrl}/?q=${termino}&_limit=6`
    return this.http.get<Heroes[]>(url)
  }

  actualizarHeroe(heroe: Heroes): Observable<Heroes>{
    return this.http.put<Heroes>(`${this.baseUrl}/${heroe.id}`, heroe);
  }
  borrarHeroe(id: string): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${id}`)
    
  }
}
