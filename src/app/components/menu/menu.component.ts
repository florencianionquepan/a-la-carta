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
  public totalPrice:string='';
  public timePreparation:string='';
  public healthScore:string='';

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
    this.totalPrice=this.menuSvc.precioTotal().toFixed(2);
    this.timePreparation=this.calcularTiempo().toFixed(2);
    this.healthScore=this.calcularHS().toFixed(2);
  }

  private calcularTiempo():number{
    let tiempoTotal=this.menuSvc.tiempoTotal();
    return tiempoTotal/this.platosPedidos.length;
  }

  private calcularHS():number{
    let healthS=this.menuSvc.HSTotal();
    return healthS/this.platosPedidos.length;
  }

}
