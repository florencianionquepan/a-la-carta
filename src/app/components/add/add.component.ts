import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/Dish';
import { MenuService } from 'src/app/services/menu.service';
import { SearcherService } from 'src/app/services/searcher.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Input() idPlato: number = 1;
  public platoDetalles: Dish={id:1,title:'',image:'',description:'',price:0,preparationMinutes:0,healthScore:0,vegan:true}
  platosMenu:Dish[]=[];
  private agregado:boolean=false;
  private platosVeganos:number=0;
  public mensaje:string="No pasé por ningún lado...";

  constructor(private searcherSvc: SearcherService, private menuSvc: MenuService) { }

  ngOnInit(): void {
  }

  public obtenerPlato(id: number) {
    this.searcherSvc.verDetalles(id).subscribe({
      next: (data: any) => {
        console.log(data.id);
        this.platoDetalles.id = data.id;
        this.platoDetalles.title = data.title;
        this.platoDetalles.image = data.image;
        this.platoDetalles.description = data.dishTypes;
        this.platoDetalles.price = data.pricePerServing;
        this.platoDetalles.preparationMinutes = data.preparationMinutes;
        this.platoDetalles.healthScore = data.healthScore;
        this.platoDetalles.vegan = data.vegan;
        console.log(this.platoDetalles);
        
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

  public controlarMenu(plato:Dish){
    this.platosVeganos=0;
    this.platosMenu=this.menuSvc.getPlatos();
    if(this.platosMenu.length==2){
      //Contamos platos veganos hsta el momento:
      this.platosMenu.forEach((plato)=>{
        if(plato.vegan){
          this.platosVeganos++;
        }
      })
      if(this.platosVeganos==2){
        //EL PLATO A AÑADIR DEBE SER NO VEGANO
        if(plato.vegan){
          this.agregado=false;
          this.mensaje="The next dish to add to the menu should not be vegan";
        }else{
          this.añadirPlato(this.platoDetalles);
        }
      }else if(this.platosVeganos==1){
        this.añadirPlato(this.platoDetalles);
      }else if(this.platosVeganos==0){
        //EL PLATO A AÑADIR DEBE SER VEGANO
        if(!plato.vegan){
          this.agregado=false;
          this.mensaje="The next dish to add to the menu should be vegan";
        }else{
          this.añadirPlato(this.platoDetalles);
        }
      }
    }else if(this.platosMenu.length==3){
      this.platosMenu.forEach((plato)=>{
        if(plato.vegan){
          this.platosVeganos++;
        }
      })
      if(this.platosVeganos==2){
        //EL PLATO A AÑADIR DEBE SER NO VEGANO
        if(plato.vegan){
          this.agregado=false;
          this.mensaje="The next dish to add to the menu should not be vegan";
        }
      }else if(this.platosVeganos==1){
        //EL PLATO A AÑADIR DEBE SER VEGANO
        if(!plato.vegan){
          this.agregado=false;
          this.mensaje="The next dish to add to the menu should be vegan";
        }else{
          this.añadirPlato(this.platoDetalles);
        }
      }
    }
  }

  public seleccionarPlato(id:number){
    //por defecto this.agregado sera true, y el mensaje ok:
    this.agregado=true;
    this.mensaje="This dish was added to the menu";
    //aca voy a crear el plato con el id recibido & this.platoDetalles tendra todos sus atributos
    this.obtenerPlato(id);
    //obtengo todo el listado de platos del menu para controlar que el plato seleccionado pueda ser añadido
    this.platosMenu=this.menuSvc.getPlatos();
    if(this.platosMenu.length<2){
      this.añadirPlato(this.platoDetalles);
    }else if(this.platosMenu.length==4){
      this.agregado=false;
      this.mensaje="It is not possible add it to the menu. You already order 4 dishes";
    }else if(this.platosMenu.length>=2 && this.platosMenu.length<4){
      this.controlarMenu(this.platoDetalles);
    }
    Swal.fire(this.mensaje);
  }

  public añadirPlato(platoNuevo:Dish){
    this.menuSvc.agregarPlato(platoNuevo);
  }

}
