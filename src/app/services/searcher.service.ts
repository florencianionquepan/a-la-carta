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
  constructor(private http:HttpClient) { }

  public verPlatos(text:string):any{
    return this.http.get<any>(`${this.api}&query=${text}`)
    .pipe(
      map(data=>data.results)
    )
  }

}
