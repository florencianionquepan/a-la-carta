import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dish } from '../models/Dish';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  platos:Dish[];
  plato:Dish;
  platoVer:Dish;
  private actualizarPedidoSubject=new Subject<Dish[]>();
  actualizarPedidoObservable=this.actualizarPedidoSubject.asObservable();


  actualizarPedido(platos:Dish[]){
    this.actualizarPedidoSubject.next(platos);
    this.guardarStorage(platos);
  }

  constructor() { 
    this.platos=[];
    this.plato={id:1,title:'',image:'',vegan:false,price:0,preparationMinutes:0,healthScore:0};
    this.platoVer={id:1,title:'',image:'',vegan:false,price:0,preparationMinutes:0,healthScore:0};
  }

  getPlatos():Dish[]{
    this.platos=this.obtenerStorage();
    return this.platos;
  }

  agregarPlato(plato: Dish):Dish[]{
    this.platos.push(plato);
    //console.log(this.platos);
    this.actualizarPedido(this.platos);
    return this.platos;
  }

  eliminarPlato(id:number):void{
    this.platos=this.platos.filter((item)=>item.id!==id);
    this.actualizarPedido(this.platos);
  }

  guardarStorage(platos:Dish[]){
    localStorage.setItem("platos",JSON.stringify(platos));
  }

  obtenerStorage():Dish[]{
    //esta condicion siempre me devuelve true...
    if(localStorage.getItem("platos")!==null){
      return JSON.parse(localStorage.getItem("platos")!,(key: string, value: string | number | boolean) => {
        if (key == 'id' || key == 'price' || key == 'preparationMinutes' || key == 'healthScore') {
          return value as number;
        } else if (key == 'title' || key == 'image' || key == 'description') {
          return value as string;
        } else if (key == 'vegan') {
          return value as boolean;
        }else{
          return value as string;
        }
      });
    }else{
      return [];
    }
  }

  public getPlato(idP:number):Dish{
    this.platoVer=this.platos.find(element=>element.id==idP) || this.platoVer
    return this.platoVer;
  }

  public precioTotal():number{
    let suma=0;
    this.platos.forEach((plato)=>{
      suma+=plato.price;
    })
    return suma;
  }

  public tiempoTotal():number{
    let tiempo=0;
    this.platos.forEach((plato)=>{
      tiempo+=plato.preparationMinutes;
    })
    return tiempo;
  }

  public HSTotal():number{
    let HS=0;
    this.platos.forEach((plato)=>{
      HS+=plato.healthScore;
    })
    return HS;
  }

}
