import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FirebaseService} from '../../services/firebase.service';
import * as XLSX from 'xlsx';
/* import $ from "jquery"; */
import ApexCharts from 'apexcharts';


@Component({
  selector: 'app-chart-personas',
  templateUrl: './chart-personas.component.html',
  styleUrls: ['./chart-personas.component.css']
})
export class ChartPersonasComponent implements OnInit {

  @Input() desactivado:boolean = false;
  dathax:any;
  pet: number = 0;
  pead: number = 0;
  pebd:number = 0;
  carton:number = 0;
  latas:number = 0;
  excellPersonas = true;
  options:any = {}

  enero = {
    nombre: 'Enero',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  febrero = {
    nombre: 'Febrero',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  marzo = {
    nombre: 'Marzo',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  abril = {
    nombre: 'Abril',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  mayo = {
    nombre: 'Mayo',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  junio = {
    nombre: 'Junio',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  julio = {
    nombre: 'Julio',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  agosto = {
    nombre: 'Agosto',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  septiembre = {
    nombre: 'Septiembre',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  octubre = {
    nombre: 'Octubre',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  noviembre = {
    nombre: 'Noviembre',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  diciembre = {
    nombre: 'Diciembre',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }


  @ViewChild(ApexCharts) chart?: ApexCharts;

  constructor(private firebaseSer: FirebaseService) { }

  async ngOnInit() {    
    await this.obtenerRutasCompletadas();
    
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

 
  async ngOnDestroy(){

    this.options = {
      chart: {
          height: 280,
          type: 'donut',
          foreColor: '#4e4e4e',
      },
      dataLabels: {
          enabled: true,
          style:{
            colors: ["#000000", "#000000", "#000000", "#000000", "#000000"],
            fontSize: '15px',
            fontFamily: 'Helvetica',
            fontWeight:'0px'
          },
          textAnchor: 'start' 
      },
      series: [Math.round(((this.pet/1000) + Number.EPSILON)*100)/100, Math.round(((this.pead/1000) + Number.EPSILON)*100)/100, Math.round(((this.pebd/1000) + Number.EPSILON)*100)/100, Math.round(((this.carton/1000) + Number.EPSILON)*100)/100, Math.round(((this.latas/1000) + Number.EPSILON)*100)/100],
      colors: ["#FFEA00", "#FDDA0D", "#DFFF00", "#0096FF", "#888888"],
      labels: ["Botellas PET", "Envases PEAD", "Envases PEBD", "Cartón y Papel", "Latas de aluminio"],
      legend: {
        customLegendItems:["Botellas PET", "Envases PEAD", "Envases PEBD", "Cartón y Papel", "Latas de aluminio"],
        
        formatter: function(abc:any, opts:any) {
            return abc + " - " + opts.w.globals.series[opts.seriesIndex] + " Tons"
        }
      },
      responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  height: 330
              },
              legend: {
                  position: 'bottom'
              }
          }
      }]
  
    }
   

    await this.chart?.destroy();

    this.chart = new ApexCharts(
      document.querySelector("#chart5"),
      this.options
    );
    await this.chart?.render();

  }


  async obtenerRutasCompletadas()
  {
   await this.firebaseSer.getRutasCompletadas().then(
     data =>
      {
        this.dathax = data;
        let largo = Object.keys(this.dathax).length;
        let date = new Date().getFullYear();
         for (let i = 1; i < largo; i++) 
         {

          if(date == this.dathax[i].timestamp.slice(0,4) )
          {
          try {
            
            this.pet +=  parseFloat(this.dathax[i].kilosreciclaje1);
            this.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.latas += parseFloat(this.dathax[i].kilosreciclaje5);
            
            
            //enero
            if(this.dathax[i].timestamp.slice(5,7) == '01')
            {
              this.enero.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.enero.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.enero.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.enero.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.enero.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }

            //febrero
            if(this.dathax[i].timestamp.slice(5,7) == '02')
            {
              this.febrero.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.febrero.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.febrero.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.febrero.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.febrero.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }

            //marzo
            if(this.dathax[i].timestamp.slice(5,7) == '03')
            {
              this.marzo.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.marzo.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.marzo.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.marzo.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.marzo.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }

            //abril
            if(this.dathax[i].timestamp.slice(5,7) == '04')
            {
              this.abril.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.abril.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.abril.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.abril.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.abril.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }

            //mayo
            if(this.dathax[i].timestamp.slice(5,7) == '05')
            {
              this.mayo.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.mayo.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.mayo.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.mayo.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.mayo.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }

            //junio
            if(this.dathax[i].timestamp.slice(5,7) == '06')
            {
              this.junio.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.junio.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.junio.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.junio.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.junio.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }

            //julio
            if(this.dathax[i].timestamp.slice(5,7) == '07')
            {
              this.julio.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.julio.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.julio.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.julio.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.julio.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }

            //agosto
            if(this.dathax[i].timestamp.slice(5,7) == '08')
            {
              this.agosto.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.agosto.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.agosto.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.agosto.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.agosto.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }

            //septiembre
            if(this.dathax[i].timestamp.slice(5,7) == '09')
            {
              this.septiembre.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.septiembre.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.septiembre.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.septiembre.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.septiembre.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }

            //octubre
            if(this.dathax[i].timestamp.slice(5,7) == '10')
            {
              this.octubre.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.octubre.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.octubre.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.octubre.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.octubre.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }

            //noviembre
            if(this.dathax[i].timestamp.slice(5,7) == '11')
            {
              this.noviembre.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.noviembre.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.noviembre.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.noviembre.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.noviembre.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }

            //diciembre
            if(this.dathax[i].timestamp.slice(5,7) == '12')
            {
              this.diciembre.pet += parseFloat(this.dathax[i].kilosreciclaje1);
              this.diciembre.pead += parseFloat(this.dathax[i].kilosreciclaje2);
              this.diciembre.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
              this.diciembre.carton += parseFloat(this.dathax[i].kilosreciclaje4);
              this.diciembre.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);
            }
          } catch (error) {
            
          }

         
          }

        }

        this.redondeo();
        
        
      }
    )

    this.ngOnDestroy();
    

  }

  redondeo(){
    //enero
    this.enero.pet = Math.round(((this.enero.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.enero.pead = Math.round(((this.enero.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.enero.pebd = Math.round(((this.enero.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.enero.carton = Math.round(((this.enero.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.enero.aluminio = Math.round(((this.enero.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.enero.total = (this.enero.pet + this.enero.pead +  this.enero.pebd + this.enero.carton + this.enero.aluminio);
    this.enero.total = Math.round((this.enero.total + Number.EPSILON) * 1000) / 1000;

    //febrero
    this.febrero.pet = Math.round((this.febrero.pet + Number.EPSILON) * 1000) / 1000;
    this.febrero.pead = Math.round((this.febrero.pead + Number.EPSILON) * 1000) / 1000;
    this.febrero.pebd = Math.round((this.febrero.pebd + Number.EPSILON) * 1000) / 1000;
    this.febrero.carton = Math.round((this.febrero.carton + Number.EPSILON) * 1000) / 1000;
    this.febrero.aluminio = Math.round((this.febrero.aluminio + Number.EPSILON) * 1000) / 1000;

    this.febrero.total = (this.febrero.pet + this.febrero.pead +  this.febrero.pebd + this.febrero.carton + this.febrero.aluminio);
    this.febrero.total = Math.round((this.febrero.total + Number.EPSILON) * 1000) / 1000;

    //marzo
    this.marzo.pet = Math.round(((this.marzo.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.marzo.pead = Math.round(((this.marzo.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.marzo.pebd = Math.round(((this.marzo.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.marzo.carton = Math.round(((this.marzo.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.marzo.aluminio = Math.round(((this.marzo.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.marzo.total = (this.marzo.pet + this.marzo.pead +  this.marzo.pebd + this.marzo.carton + this.marzo.aluminio);
    this.marzo.total = Math.round((this.marzo.total + Number.EPSILON) * 1000) / 1000;
    
    //abril
    this.abril.pet = Math.round((this.abril.pet + Number.EPSILON) * 1000) / 1000;
    this.abril.pead = Math.round((this.abril.pead + Number.EPSILON) * 1000) / 1000;
    this.abril.pebd = Math.round((this.abril.pebd + Number.EPSILON) * 1000) / 1000;
    this.abril.carton = Math.round((this.abril.carton + Number.EPSILON) * 1000) / 1000;
    this.abril.aluminio = Math.round((this.abril.aluminio + Number.EPSILON) * 1000) / 1000;

    this.abril.total = (this.abril.pet + this.abril.pead +  this.abril.pebd + this.abril.carton + this.abril.aluminio);
    this.abril.total = Math.round((this.abril.total + Number.EPSILON) * 1000) / 1000;

    //mayo
    this.mayo.pet = Math.round((this.mayo.pet + Number.EPSILON) * 1000) / 1000;
    this.mayo.pead = Math.round((this.mayo.pead + Number.EPSILON) * 1000) / 1000;
    this.mayo.pebd = Math.round((this.mayo.pebd + Number.EPSILON) * 1000) / 1000;
    this.mayo.carton = Math.round((this.mayo.carton + Number.EPSILON) * 1000) / 1000;
    this.mayo.aluminio = Math.round((this.mayo.aluminio + Number.EPSILON) * 1000) / 1000;

    this.mayo.total = (this.mayo.pet + this.mayo.pead +  this.mayo.pebd + this.mayo.carton + this.mayo.aluminio);
    this.mayo.total = Math.round((this.mayo.total + Number.EPSILON) * 1000) / 1000;

    //junio
    this.junio.pet = Math.round((this.junio.pet + Number.EPSILON) * 1000) / 1000;
    this.junio.pead = Math.round((this.junio.pead + Number.EPSILON) * 1000) / 1000;
    this.junio.pebd = Math.round((this.junio.pebd + Number.EPSILON) * 1000) / 1000;
    this.junio.carton = Math.round((this.junio.carton + Number.EPSILON) * 1000) / 1000;
    this.junio.aluminio = Math.round((this.junio.aluminio + Number.EPSILON) * 1000) / 1000;

    this.junio.total = (this.junio.pet + this.junio.pead +  this.junio.pebd + this.junio.carton + this.junio.aluminio);
    this.junio.total = Math.round((this.junio.total + Number.EPSILON) * 1000) / 1000;

    //julio
    this.julio.pet = Math.round((this.julio.pet + Number.EPSILON) * 1000) / 1000;
    this.julio.pead = Math.round((this.julio.pead + Number.EPSILON) * 1000) / 1000;
    this.julio.pebd = Math.round((this.julio.pebd + Number.EPSILON) * 1000) / 1000;
    this.julio.carton = Math.round((this.julio.carton + Number.EPSILON) * 1000) / 1000;
    this.julio.aluminio = Math.round((this.julio.aluminio + Number.EPSILON) * 1000) / 1000;

    this.julio.total = (this.julio.pet + this.julio.pead +  this.julio.pebd + this.julio.carton + this.julio.aluminio);
    this.julio.total = Math.round((this.julio.total + Number.EPSILON) * 1000) / 1000;

    //agosto
    this.agosto.pet = Math.round((this.agosto.pet + Number.EPSILON) * 1000) / 1000;
    this.agosto.pead = Math.round((this.agosto.pead + Number.EPSILON) * 1000) / 1000;
    this.agosto.pebd = Math.round((this.agosto.pebd + Number.EPSILON) * 1000) / 1000;
    this.agosto.carton = Math.round((this.agosto.carton + Number.EPSILON) * 1000) / 1000;
    this.agosto.aluminio = Math.round((this.agosto.aluminio + Number.EPSILON) * 1000) / 1000;

    this.agosto.total = (this.agosto.pet + this.agosto.pead +  this.agosto.pebd + this.agosto.carton + this.agosto.aluminio);
    this.agosto.total = Math.round((this.agosto.total/ + Number.EPSILON) * 1000) / 1000;

    //septiembre
    this.septiembre.pet = Math.round((this.septiembre.pet + Number.EPSILON) * 1000) / 1000;
    this.septiembre.pead = Math.round((this.septiembre.pead + Number.EPSILON) * 1000) / 1000;
    this.septiembre.pebd = Math.round((this.septiembre.pebd + Number.EPSILON) * 1000) / 1000;
    this.septiembre.carton = Math.round((this.septiembre.carton + Number.EPSILON) * 1000) / 1000;
    this.septiembre.aluminio = Math.round((this.septiembre.aluminio + Number.EPSILON) * 1000) / 1000;

    this.septiembre.total = (this.septiembre.pet + this.septiembre.pead +  this.septiembre.pebd + this.septiembre.carton + this.septiembre.aluminio);
    this.septiembre.total = Math.round((this.septiembre.total + Number.EPSILON) * 1000) / 1000;

    //octubre
    this.octubre.pet = Math.round((this.octubre.pet + Number.EPSILON) * 1000) / 1000;
    this.octubre.pead = Math.round((this.octubre.pead + Number.EPSILON) * 1000) / 1000;
    this.octubre.pebd = Math.round((this.octubre.pebd + Number.EPSILON) * 1000) / 1000;
    this.octubre.carton = Math.round((this.octubre.carton + Number.EPSILON) * 1000) / 1000;
    this.octubre.aluminio = Math.round((this.octubre.aluminio + Number.EPSILON) * 1000) / 1000;

    this.octubre.total = (this.octubre.pet + this.octubre.pead +  this.octubre.pebd + this.octubre.carton + this.octubre.aluminio);
    this.octubre.total = Math.round((this.octubre.total + Number.EPSILON) * 1000) / 1000;

    //noviembre
    this.noviembre.pet = Math.round((this.noviembre.pet + Number.EPSILON) * 1000) / 1000;
    this.noviembre.pead = Math.round((this.noviembre.pead + Number.EPSILON) * 1000) / 1000;
    this.noviembre.pebd = Math.round((this.noviembre.pebd + Number.EPSILON) * 1000) / 1000;
    this.noviembre.carton = Math.round((this.noviembre.carton + Number.EPSILON) * 1000) / 1000;
    this.noviembre.aluminio = Math.round((this.noviembre.aluminio + Number.EPSILON) * 1000) / 1000;

    this.noviembre.total = (this.noviembre.pet + this.noviembre.pead +  this.noviembre.pebd + this.noviembre.carton + this.noviembre.aluminio);
    this.noviembre.total = Math.round((this.noviembre.total + Number.EPSILON) * 1000) / 1000;

    //diciembre
    this.diciembre.pet = Math.round(((this.diciembre.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.diciembre.pead = Math.round(((this.diciembre.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.diciembre.pebd = Math.round(((this.diciembre.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.diciembre.carton = Math.round(((this.diciembre.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.diciembre.aluminio = Math.round(((this.diciembre.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.diciembre.total = (this.diciembre.pet + this.diciembre.pead +  this.diciembre.pebd + this.diciembre.carton + this.diciembre.aluminio);
    this.diciembre.total = Math.round((this.diciembre.total + Number.EPSILON) * 1000) / 1000;
    
  }

  generateExcelTipoReciclaje()
  {
    console.log('hello');
    //le pasamos la id de la tabla al excel guy, imma right?
    let element = document.getElementById('tipoMaterial-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    //yenereit workbuk an ad de workshit (worksheet)

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

    //guardamos el archivo
    XLSX.writeFile(wb, 'ReporteTipoMaterialReciclado.xlsx');
  }

}
