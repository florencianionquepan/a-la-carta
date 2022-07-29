import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dish } from 'src/app/models/Dish';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.css']
})
export class ActionsComponent implements OnInit {
  @Input() plato:Dish;

  constructor(private menuSvc: MenuService, private ruta:Router) {
    this.plato={id:1,title:'',image:'',vegan:false,price:0,preparationMinutes:0,healthScore:0};
  }

  ngOnInit(): void {
  }

  public verDetalles(plato:Dish){
    this.ruta.navigate([`/detail/${plato.id}`]);
  }


  public eliminar(plato:Dish):void{
    Swal.fire({
      title: `Are you sure you want to delete ${plato.title}?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.menuSvc.eliminarPlato(plato.id);
        Swal.fire('Deleted!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('The dish was not deleted', '', 'info')
      }
    })
  }
}
