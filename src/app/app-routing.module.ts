import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InformacionComponent } from './pages/informacion/informacion.component';

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

  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
