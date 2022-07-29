import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerInterceptor } from './services/spinner.interceptor';
import { SearcherComponent } from './components/searcher/searcher.component';
import { NameComponent } from './components/name/name.component';
import { ImageComponent } from './components/image/image.component';
import { DescriptionComponent } from './components/description/description.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddComponent } from './components/add/add.component';
import { HeaderComponent } from './components/header/header.component';
import { ActionsComponent } from './components/actions/actions.component';
import { DishDetailComponent } from './components/dish-detail/dish-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SpinnerComponent,
    SearcherComponent,
    NameComponent,
    ImageComponent,
    DescriptionComponent,
    MenuComponent,
    AddComponent,
    HeaderComponent,
    ActionsComponent,
    DishDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass: SpinnerInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
