import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, tap,of} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Auth} from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  constructor(private http:HttpClient) { }

  get auth(){
    return {... this._auth}
  }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      tap(auth => this._auth = auth ),
      tap(auth => localStorage.setItem('token',auth.id))
    )
  }
  
  verificaAutentificacione():Observable<boolean>{
    if(!localStorage.getItem('token')){
      return of(false)
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
    .pipe(
      map(auth => {
	this._auth = auth;
	return true
	
      })
    )
  }

  logout(){
    this._auth = undefined;
  }

}
