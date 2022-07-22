import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { GuardGuard } from './services/guard.guard';

const routes: Routes = [
  {path:'home',component:HomeComponent, canActivate:[GuardGuard]},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
