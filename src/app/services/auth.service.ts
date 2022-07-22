import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url='http://challenge-react.alkemy.org/';
  token!:string;

  constructor(private httpClient: HttpClient) { 
  }

  public login(usuario:any):Observable<any>{
    return this.httpClient.post<any>(this.url,usuario).pipe(map(data=>{
      localStorage.setItem('token',JSON.stringify(data));
      return data;
    }))
  };

  public logIn():boolean{
    return (localStorage.getItem('token') !==null);
  }


}
