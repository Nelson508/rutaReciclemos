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
import { ChartPuntoLimpioComponent } from './chart-punto-limpio/chart-punto-limpio.component';
import { InformacionesComponent } from './informaciones/informaciones.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { TarjetasPreciosComponent } from './tarjetas-precios/tarjetas-precios.component';
import { VentasComponent } from './ventas/ventas.component';
import { ContadorComponent } from './contador/contador.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { FormularioClientesComponent } from './formulario-clientes/formulario-clientes.component';
import { TransaccionComponent } from './transaccion/transaccion.component';
//import QuillModule from 'quill';




@NgModule({
  declarations: [
    MenuAdminComponent,
    ChartComunaComponent,
    ChartEdadComponent,
    ChartGeneroComponent,
    ChartVentasComponent,
    ChartPersonasComponent,
    ResumenComponent,
    ChartPuntoLimpioComponent,
    InformacionesComponent,
    TarjetasPreciosComponent,
    VentasComponent,
    ContadorComponent,
    MaterialesComponent,
    FormularioClientesComponent,
    TransaccionComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    QuillModule.forRoot(),
  ],
  exports: [
    MenuAdminComponent,
    TarjetasPreciosComponent,
    VentasComponent,
    FormularioClientesComponent,
    MaterialesComponent,
    TransaccionComponent,
    ContadorComponent
  ]
})
export class ComponentsModule { }
