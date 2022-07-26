import { ThisReceiver } from '@angular/compiler';
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

  constructor(private menuSvc:MenuService) { 
    this.platosPedidos=[];
    if(localStorage.getItem("platos")!==null){
      this.platosPedidos=JSON.parse(localStorage.getItem("platos")!,(key: string, value: string | number | boolean) => {
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
    }
  }

  ngOnInit(): void {
    this.menuSvc.actualizarPedidoObservable.subscribe(plato=>{
      this.platosPedidos.push(plato);
      localStorage.setItem("platos",JSON.stringify(this.platosPedidos));
    })
  }


}
