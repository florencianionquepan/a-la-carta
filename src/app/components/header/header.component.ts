import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authSvc: AuthService, private ruta:Router) { }

  ngOnInit(): void {
  }

  public logOut():void{
    this.authSvc.logOut();
    this.ruta.navigate(['/login']);
  }

}
