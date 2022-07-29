import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { MenuService } from 'src/app/services/menu.service';
import { Dish } from 'src/app/models/Dish';

@Component({
  selector: 'app-dish-detail',
  templateUrl: './dish-detail.component.html',
  styleUrls: ['./dish-detail.component.css']
})
export class DishDetailComponent implements OnInit {
  public plato:Dish;
  public porcPrecio:string='';
  public porcTiempo:string='';
  public porcHS:string='';
  
  constructor(private ruta:ActivatedRoute, private location: Location, private menuSvc: MenuService) { 
    this.plato=this.getPlato();
    this.porcPrecio=this.calcPorcPrecio().toFixed();
    this.porcTiempo=this.calcPorcTiempo().toFixed();
    this.porcHS=this.calcPorcHS().toFixed();
  }

  ngOnInit(): void {
  }

  getPlato():Dish{
    const id= this.ruta.snapshot.params['id'];
    return this.menuSvc.getPlato(id);
  }

  goBack(): void {
    this.location.back();
  }

  calcPorcPrecio():number{
    return (this.plato.price/this.menuSvc.precioTotal())*100;
  }

  calcPorcTiempo():number{
    return (this.plato.preparationMinutes/this.menuSvc.tiempoTotal())*100;
  }

  calcPorcHS():number{
    return (this.plato.healthScore/this.menuSvc.HSTotal())*100;
  }

}
