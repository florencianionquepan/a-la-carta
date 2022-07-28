import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public platosPedidos:Dish[];
  public totalPrice:string='0';
  public timePreparation:string='0';
  public healthScore:string='0';

  constructor(private menuSvc:MenuService) { 
    this.platosPedidos=this.menuSvc.getPlatos();
  }

  ngOnInit(): void {
    this.hacerCalculos();
    this.menuSvc.actualizarPedidoObservable.subscribe(platos=>{
      this.platosPedidos=platos;
      this.hacerCalculos();
    })
  }

  private hacerCalculos():void{
    this.totalPrice=this.calcularPrecio().toFixed(2);
    this.timePreparation=this.calcularTiempo().toFixed(2);
    this.healthScore=this.calcularHS().toFixed(2);
  }


  private calcularPrecio():number{
    let suma=0;
    this.platosPedidos.forEach((plato)=>{
      suma+=plato.price;
    })
    return suma;
  }

  private calcularTiempo():number{
    let tiempoTot=0;
    this.platosPedidos.forEach((plato)=>{
      tiempoTot+=plato.preparationMinutes;
    })
    return tiempoTot/this.platosPedidos.length;
  }

  private calcularHS():number{
    let healthS=0;
    this.platosPedidos.forEach((plato)=>{
      healthS+=plato.healthScore;
    })
    return healthS/this.platosPedidos.length;
  }

}
