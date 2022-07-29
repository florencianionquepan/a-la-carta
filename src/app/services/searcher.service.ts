import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearcherService {
  private api=environment.apiUrlCompleta;
  private apiById=environment.apiBase;

  constructor(private http:HttpClient) { }

  public verPlatos(text:string):Observable<any>{
    return this.http.get<any>(`${this.api}&query=${text}`)
    .pipe(
      map(data=>data.results)
    )
  }

  public obtenerDetalles(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiById}/${id}/information?includeNutritition=false&apiKey=69522f583e88451b9475f39a11274b6a`)
  }

}
