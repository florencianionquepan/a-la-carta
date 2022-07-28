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
    this.platosPedidos=this.menuSvc.getPlatos();
  }

  ngOnInit(): void {
    this.menuSvc.actualizarPedidoObservable.subscribe(platos=>{
      this.platosPedidos=platos;
/*       console.log('ngOnInitMenuComponent');
      console.log(this.platosPedidos); */
    })
  }

}
