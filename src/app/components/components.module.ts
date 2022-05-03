import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { ChartComunaComponent } from './chart-comuna/chart-comuna.component';
import { ChartEdadComponent } from './chart-edad/chart-edad.component';
import { ChartGeneroComponent } from './chart-genero/chart-genero.component';
import { ChartVentasComponent } from './chart-ventas/chart-ventas.component';
import { ChartPersonasComponent } from './chart-personas/chart-personas.component';
import { ResumenComponent } from './resumen/resumen.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    MenuAdminComponent,
    ChartComunaComponent,
    ChartEdadComponent,
    ChartGeneroComponent,
    ChartVentasComponent,
    ChartPersonasComponent,
    ResumenComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    MenuAdminComponent,
  ]
})
export class ComponentsModule { }
