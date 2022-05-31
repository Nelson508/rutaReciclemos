import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';
import { SellprodComponent } from './pages/sellprod/sellprod.component';
import { ProductosComponent } from './pages/productos/productos.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './pages/footer/footer.component';
import { MenuComponent } from './pages/menu/menu.component';
import {APP_BASE_HREF} from '@angular/common';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms'; 
//import { ResumenComponent } from './pages/resumen/resumen.component';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { QuillModule } from 'ngx-quill';

// PAQUETES PARA HACER LA CONSULTACION

import {AngularFireModule} from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {environment} from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import {FirebaseService} from './services/firebase.service'

//encriptar
import * as CryptoJS from 'crypto-js';

// import {GeoJson} from './map';
import * as mapboxgl from 'mapbox-gl'
// import { HttpModule } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import * as XLSX from 'xlsx';


@NgModule({
  declarations: [
    AppComponent,
    NosotrosComponent,
    InicioComponent,
    InformacionComponent,
    ProductosComponent,
    PoliticasComponent,
    FooterComponent,
    MenuComponent,
    AdministracionComponent,
    LoginComponent,/* 
    ResumenComponent, */
    SellprodComponent  
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ChartsModule,
    ComponentsModule,
    PagesModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), /*SE INSTANCIA LA CONEXION*/
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpClientModule,
    QuillModule.forRoot(),
    
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/',
    },
    [FirebaseService]   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
