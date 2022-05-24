import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComunaComponent } from '../chart-comuna/chart-comuna.component';
import { ChartEdadComponent } from '../chart-edad/chart-edad.component';
import { ChartGeneroComponent } from '../chart-genero/chart-genero.component';
import { ChartPersonasComponent } from '../chart-personas/chart-personas.component';
import { ChartPuntoLimpioComponent } from '../chart-punto-limpio/chart-punto-limpio.component';
import { ChartVentasComponent } from '../chart-ventas/chart-ventas.component';
import { ResumenComponent } from '../resumen/resumen.component';
import {FirebaseService} from '../../services/firebase.service';



@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  @Input() activarReseumen: boolean = true;
  @Input() activarComunas: boolean = false;
  @Input() activarPersonas: boolean = false;
  @Input() activarEdades: boolean = false;
  @Input() activarGeneros: boolean = false;
  @Input() activarPuntosLimpios: boolean = false;
  @Input() activarVentas: boolean = false;
  @Input() activarInformaciones: boolean = false;

  @ViewChild(ResumenComponent) graficoReseumen?: ResumenComponent;
  @ViewChild(ChartComunaComponent) graficoComunas?: ChartComunaComponent;
  @ViewChild(ChartPersonasComponent) graficoPersonas?: ChartPersonasComponent;
  @ViewChild(ChartEdadComponent) graficoEdades?: ChartEdadComponent;
  @ViewChild(ChartGeneroComponent) graficoGeneros?: ChartGeneroComponent;
  @ViewChild(ChartPuntoLimpioComponent) graficoPuntosLimpios?: ChartPuntoLimpioComponent;
  @ViewChild(ChartVentasComponent) graficoVentas?: ChartVentasComponent;

  resumen:any = 'active';
  comunas:any;
  personas:any;
  edades:any;
  generos:any;
  ventas:any;
  puntoLimpio:any;
  informaciones:any;
  oculatrSidebar: boolean= false;

  constructor(private router: Router,
              private firebaseSer: FirebaseService) {}

  ngOnInit(): void {

    if(screen.width < 576){
      this.oculatrSidebar = true;
    }
  }

  async menuClick(aux: number){

    if(aux==1){
      this.activarReseumen = true;
      this.graficoReseumen?.ngOnDestroy();
      this.resumen = 'active';

    }else{
      this.activarReseumen = false;
      this.resumen = '';
    }
 
    if(aux==2){
      this.activarComunas = true;
      this.graficoComunas?.ngOnDestroy();
      this.comunas = 'active';
    }else{
      this.activarComunas = false;
      this.comunas = '';
    }

    if(aux==3){
      this.activarPersonas = true;
      this.graficoPersonas?.ngOnDestroy();
      /* this.graficoPersonas?.apxChart(); */
      this.personas = 'active';
    }else{
      this.activarPersonas = false;
      this.personas = '';
    }

    if(aux==4){
      this.activarEdades = true;
      this.graficoEdades?.ngOnDestroy();
      this.edades = 'active';
    }else{
      this.activarEdades = false;
      this.edades = '';
    }

    if(aux==5){
      this.activarGeneros = true;
      await this.graficoGeneros?.ngOnDestroy();
      this.generos = 'active';
    }else{
      this.activarGeneros = false;
      this.generos = '';
    }

    if(aux==6){
      this.activarPuntosLimpios = true;
      this.graficoPuntosLimpios?.ngOnDestroy();
      this.puntoLimpio = 'active';
    }else{
      this.activarPuntosLimpios = false;
      this.puntoLimpio = '';
    }

    if(aux==7){
      this.activarVentas = true;
      this.graficoVentas?.ngOnDestroy();
      this.ventas = 'active';
    }else{
      this.activarVentas = false;
      this.ventas = '';
    }

    if(aux==8){
      this.activarInformaciones = true;
      //this.graficoVentas?.ngOnDestroy();
      this.informaciones = 'active';
      let valores = await this.firebaseSer.login();
      //let valores = await this.firebaseSer.register();
     // console.log(valores);
    }else{
      this.activarInformaciones = false;
      this.informaciones = '';
    }
  }


  cerrarSesion()
  {
    localStorage.clear();
    this.router.navigate(['/', 'login'])

  }

}
