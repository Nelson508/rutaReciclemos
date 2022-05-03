import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComunaComponent } from '../chart-comuna/chart-comuna.component';
import { ChartEdadComponent } from '../chart-edad/chart-edad.component';
import { ChartGeneroComponent } from '../chart-genero/chart-genero.component';
import { ChartPersonasComponent } from '../chart-personas/chart-personas.component';
import { ChartVentasComponent } from '../chart-ventas/chart-ventas.component';
import { ResumenComponent } from '../resumen/resumen.component';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  @Input() activarReseumen: boolean = true;
  @Input() activarComunas: boolean = false;
  @Input() activarVentas: boolean = false;
  @Input() activarPersonas: boolean = false;
  @Input() activarEdades: boolean = false;
  @Input() activarGeneros: boolean = false;

  @ViewChild(ResumenComponent) graficoReseumen?: ResumenComponent;
  @ViewChild(ChartComunaComponent) graficoComunas?: ChartComunaComponent;
  @ViewChild(ChartVentasComponent) graficoVentas?: ChartVentasComponent;
  @ViewChild(ChartPersonasComponent) graficoPersonas?: ChartPersonasComponent;
  @ViewChild(ChartEdadComponent) graficoEdades?: ChartEdadComponent;
  @ViewChild(ChartGeneroComponent) graficoGeneros?: ChartGeneroComponent;
  


  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  menuClick(aux: number){

    if(aux==1){
      this.activarReseumen = true;
      this.graficoReseumen?.ngOnDestroy();
    }else{
      this.activarReseumen = false;
    }
 
    if(aux==2){
      this.activarComunas = true;
      this.graficoComunas?.ngOnDestroy();
    }else{
      this.activarComunas = false;
    }

    if(aux==3){
      this.activarVentas = true;
      this.graficoVentas?.ngOnDestroy();
    }else{
      this.activarVentas = false;
    }

    if(aux==4){
      this.activarPersonas = true;
      this.graficoPersonas?.ngOnDestroy();
    }else{
      this.activarPersonas = false;
    }

    if(aux==5){
      this.activarEdades = true;
      this.graficoEdades?.ngOnDestroy();
    }else{
      this.activarEdades = false;
    }

    if(aux==6){
      this.activarGeneros = true;
      this.graficoGeneros?.ngOnDestroy();
    }else{
      this.activarGeneros = false;
    }
  }

}
