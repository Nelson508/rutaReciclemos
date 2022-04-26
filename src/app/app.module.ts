import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './pages/footer/footer.component';
import { MenuComponent } from './pages/menu/menu.component';
import {APP_BASE_HREF} from '@angular/common';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NosotrosComponent,
    InicioComponent,
    InformacionComponent,
    PoliticasComponent,
    FooterComponent,
    MenuComponent,
    AdministracionComponent,
    LoginComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule

    
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
