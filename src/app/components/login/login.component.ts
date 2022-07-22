import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private authService:AuthService, private formBuilder: FormBuilder, private ruta:Router) {
    this.form=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(4)]]
    })
   }

   get Email(){
    return this.form.get('email');
  }

  get Password(){
    return this.form.get('password');
  }

  ngOnInit(): void {
  }

  //no permitir que se pueda presionar el boton mientras hace la peticion
  public login(event:Event){
    event.preventDefault;
    if(this.form.valid){
      this.authService.login(this.form.value).subscribe({
        next:data=>{
        //console.log(data);
        this.ruta.navigate(['/home']);
      },error:(error:HttpErrorResponse)=>{
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...El usuario y/o contraseña no son correctos',
          text: 'No se puede acceder al sitio'
        })
      }
    })
    } else{
      this.form.markAllAsTouched();
    }
    
  }

}
