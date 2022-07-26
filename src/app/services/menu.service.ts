import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dish } from '../models/Dish';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  platos:Dish[];
  plato:Dish;
  private actualizarPedidoSubject=new Subject<Dish>();
  actualizarPedidoObservable=this.actualizarPedidoSubject.asObservable();

  actualizarPedido(plato:Dish){
    this.plato=plato;
    this.actualizarPedidoSubject.next(plato);
  }

  constructor() { 
    this.platos=[];
    this.plato={id:1,title:'',image:'',description:'',price:0,preparationMinutes:0,healthScore:0,vegan:true};
  }

  getPlatos():Dish[]{
    return this.platos;
  }

  agregarPlato(plato: Dish):Dish[]{
    this.platos.push(plato);
    this.actualizarPedido(plato);
    //localStorage.setItem("platos",JSON.stringify(this.platos));
    return this.platos;
  }

}
