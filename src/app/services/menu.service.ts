import { Injectable } from '@angular/core';
import { Dish } from '../models/Dish';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private platos:Dish[];
  
  constructor() { 
    this.platos=[]
  }

  getPlatos(){
    return this.platos;
  }

  agregarPlato(plato: Dish){
    this.platos.push(plato);
  }

}
