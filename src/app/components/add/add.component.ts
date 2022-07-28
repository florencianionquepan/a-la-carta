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
  public platoDetalles: Dish;
  
  public platosMenu:Dish[];
  public agregado:boolean;
  public platosVeganos:number;
  public mensaje:string;

  constructor(private searcherSvc: SearcherService, private menuSvc: MenuService) { 
    this.platoDetalles={id:1,title:'',image:'',description:'',price:0,preparationMinutes:0,healthScore:0,vegan:true};
    this.platosMenu=[];
    this.agregado=true;
    this.platosVeganos=0;
    this.mensaje='This dish was added to the menu';
  }

  ngOnInit(): void { }

  public obtenerPlato(id: number) {
    this.searcherSvc.obtenerDetalles(id).subscribe({
      next: (data: any) => {
        //console.log(data.id);
        this.platoDetalles.id = data.id;
        this.platoDetalles.title = data.title;
        this.platoDetalles.image = data.image;
        this.platoDetalles.description = data.dishTypes;
        this.platoDetalles.price = data.pricePerServing;
        this.platoDetalles.preparationMinutes = data.preparationMinutes;
        this.platoDetalles.healthScore = data.healthScore;
        this.platoDetalles.vegan = data.vegan;
        //una vez que obtengo plato detalles. llama a seleccionarPlato;
        this.seleccionarPlato(id);
      },
      error:(error:HttpErrorResponse)=>{
        console.log(error.message);
      }
    })
  }

  public seleccionarPlato(id:number){ 
    //obtengo todo el listado de platos del menu para controlar que el plato seleccionado pueda ser añadido
    this.platosMenu=this.menuSvc.getPlatos();
    console.log(this.platosMenu);
    if(this.platosMenu.length<2){
      this.anadirPlato(this.platoDetalles);
    }else if(this.platosMenu.length==4){
      this.agregado=false;
      this.mensaje="It is not possible add it to the menu. You already order 4 dishes";
    }else if(this.platosMenu.length>=2 && this.platosMenu.length<4){
      console.log('tengo entre dos y 4 platos');
      this.controlarMenu(id);
    }
    Swal.fire(this.mensaje);
  }

  public controlarMenu(id:number){
    this.platosVeganos=0;
    if(this.platosMenu.length==2){
      //Contamos platos veganos hsta el momento:
      this.platosMenu.forEach((plato)=>{
        if(plato.vegan){
          this.platosVeganos++;
        }
      })
      console.log(this.platosVeganos);
      if(this.platosVeganos==2){
        //EL PLATO A AÑADIR DEBE SER NO VEGANO
        if(this.platoDetalles.vegan){
          this.agregado=false;
          this.mensaje="The next dish to add to the menu should not be vegan";
        }else{
          this.anadirPlato(this.platoDetalles);
        }
      }else if(this.platosVeganos==1){
        this.anadirPlato(this.platoDetalles);
      }else if(this.platosVeganos==0){
        //EL PLATO A AÑADIR DEBE SER VEGANO
        if(!this.platoDetalles.vegan){
          this.agregado=false;
          this.mensaje="The next dish to add to the menu should be vegan";
        }else{
          this.anadirPlato(this.platoDetalles);
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
        if(this.platoDetalles.vegan){
          this.agregado=false;
          this.mensaje="The next dish to add to the menu should not be vegan";
        }
      }else if(this.platosVeganos==1){
        //EL PLATO A AÑADIR DEBE SER VEGANO
        if(!this.platoDetalles.vegan){
          this.agregado=false;
          this.mensaje="The next dish to add to the menu should be vegan";
        }else{
          this.anadirPlato(this.platoDetalles);
        }
      }
    }
  }

  public anadirPlato(plato:Dish){
    this.menuSvc.agregarPlato(plato);
  }


}
