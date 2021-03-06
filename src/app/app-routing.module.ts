import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InformacionComponent } from './pages/informacion/informacion.component';
import { PoliticasComponent } from './pages/politicas/politicas.component';
import { AdministracionComponent } from './pages/administracion/administracion.component';
import { LoginComponent } from './pages/login/login.component';
import { WatcherGuard } from './watcher.guard';
import { SellprodComponent } from './pages/sellprod/sellprod.component';
import { ProductosComponent } from './pages/productos/productos.component';

const routes: Routes = [
  {
    path: 'nosotros',
    component: NosotrosComponent
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio'
  },
  {
    path: 'informacion',
    component: InformacionComponent

  },
  {
    path: 'politicas',
    component: PoliticasComponent

  },
  {
    path: 'administracion',
    component: AdministracionComponent,
    canActivate: [WatcherGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'ventas-productos',
    component: SellprodComponent,
    canActivate: [WatcherGuard]
  },
  {
    path: 'productos',
    component: ProductosComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
