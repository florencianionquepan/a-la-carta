import { Component, OnInit } from '@angular/core';
import { debounce, filter, interval, map, Subject } from 'rxjs';
import { SearcherService } from 'src/app/services/searcher.service';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {
  public resultadoLista: Array<any>=[]

  public search=new Subject<any>();
  constructor(private searcherService:SearcherService) {
    const busqueda=this.search.pipe(
      map((event:any)=>event.target.value),
      filter(text => text.length > 2),
      debounce(()=>interval(500)),
    ).subscribe({
      next:(text)=>{
        this.obtener(text);
      }
    })
  }

  ngOnInit(): void {
  }

  public obtener(text:string):void{
    this.searcherService.verPlatos(text).subscribe({
      next:(data:any)=>{
        this.resultadoLista=data;
        //console.log(this.resultadoLista);
      }
    })
  }

}
