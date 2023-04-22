import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
//import { parse } from 'querystring';
import { parseJsonText } from 'typescript';
import {FirebaseService} from '../../services/firebase.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-chart-punto-limpio',
  templateUrl: './chart-punto-limpio.component.html',
  styleUrls: ['./chart-punto-limpio.component.css']
})
export class ChartPuntoLimpioComponent implements OnInit {

  dathax:any;
  @Input() desactivado:boolean = true;
  info: any;

  nombrePuntoFijo: string[] = [];
  plasticos: number[] = [];
  latasAluminio: number[] = [];
  cartonPapel: number[] = [];

  sumatariaPlasticos: number = 0;
  sumatariaLatasAluminio: number = 0;
  sumatariaCartonPapel: number = 0;

  puntosLimpios: any = [];
  // {
  //   nombre: 'blumar',
  //   kilosPlastico: 0,
  //   kilosAluminio: 0,
  //   kilosCarton:0,
  // }

  excel: any = [];

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      labels: {
      fontColor: '#585757',  
      boxWidth:40
      }
    },
    scales: {
      xAxes: [{
        
      ticks: {
        beginAtZero:true,
        fontColor: '#585757'
      },
      gridLines: {
        display: true ,
        color: "rgba(0, 0, 0, 0.07)"
      },
      
      }],
      
      yAxes: [{
        ticks: {
          beginAtZero:true,
          fontColor: '#585757'
        },
        gridLines: {
          display: true ,
          color: "rgba(0, 0, 0, 0.07)"
        },
        }]
       
    }
  
  };
  public barChartLabels: string[] = this.nombrePuntoFijo;
  public barChartType: ChartType  = 'bar';
  public barChartLegend = true;
  
  public barChartData: any[] = [
    { barPercentage: .5, data: this.plasticos, label: 'Plasticos' },
    { barPercentage: .5, data: this.cartonPapel, label: 'Cartón y Papel' },
    { barPercentage: .5, data: this.latasAluminio, label: 'Latas de aluminio' }
  ];
  
  public barChartColors: Array<any> = [
    
    {
      backgroundColor: "#FDDA0D"
    },
    {
      backgroundColor: "#0096FF"
    },
    {
      backgroundColor: "#888888"
    }
  ];
  
  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private firebaseSer: FirebaseService) { }

  ngOnInit(): void {

    // this.infoPuntosFijos();
    this.obtenerRutasCompletadas();
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  async infoPuntosFijos(){
    await this.firebaseSer.getPuntosFijos().then( async data =>
      {
        this.info = data;

        let largo = Object.keys(this.info).length;
        for (let i = 0; i < largo; i++) {
          this.info[i].fijo_punto_latas = Math.round(((parseFloat(this.info[i].fijo_punto_latas)/1000) + Number.EPSILON) * 100) / 100;
          this.info[i].fijo_punto_carton = Math.round(((parseFloat(this.info[i].fijo_punto_carton)/1000) + Number.EPSILON) * 100) / 100;

          this.excel.push(this.info[i]);
          this.nombrePuntoFijo.push(this.info[i].nombre);
          this.plasticos.push(this.info[i].fijo_punto_plasticos);
          this.latasAluminio.push(this.info[i].fijo_punto_latas);
          this.cartonPapel.push(this.info[i].fijo_punto_carton);
        }
      });
  }

  generateExcel()
  {
    let element = document.getElementById('puntoLimpio-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Puntos Limpios');
    //guardamos el archivo
    XLSX.writeFile(wb, 'ReportePuntosLimpios.xlsx');
  }

  ngOnDestroy(){
    
    this.barChartOptions = {
     scaleShowVerticalLines: false,
     responsive: true,
     maintainAspectRatio: true,
     legend: {
       display: true,
       labels: {
       fontColor: '#585757',  
       boxWidth:40
       }
     },
     scales: {
       xAxes: [{
         
       ticks: {
         beginAtZero:true,
         fontColor: '#585757'
       },
       gridLines: {
         display: true ,
         color: "rgba(0, 0, 0, 0.07)"
       },
       
       }],
       
       yAxes: [{
         ticks: {
           beginAtZero:true,
           fontColor: '#585757'
         },
         gridLines: {
           display: true ,
           color: "rgba(0, 0, 0, 0.07)"
         },
         }]
        
     },
     animation: {
       animateScale: true,
       animateRotate: false,
       duration: 500,
       easing: 'linear'
     }
   
   };

   this.chart?.update();
 }

 async obtenerRutasCompletadas()
  {
    console.log("la llamo");
   await this.firebaseSer.getRutasCompletadas().then(
     data =>
      {
        this.dathax = data;
        console.log(this.dathax);
        let largo = Object.keys(this.dathax).length;
        console.log("LARGOO",largo );
        let date = new Date().getFullYear();
         for (let i = 1; i < largo; i++) 
         {
           console.log("afuera")
          //validamos si pertenece al año y si es punto limpio
          if(date == this.dathax[i].timestamp.slice(0,4) && this.dathax[i].g == 'punto_limpio_lleno' )
          {
          try {
            let nombrePunto = this.dathax[i].nombre;
            let indexNombreInArray = this.nombrePuntoFijo.indexOf(nombrePunto);
            

            // Es -1 cuando aún no se añade el nombre
            if (indexNombreInArray == -1) {
              console.log("no se añade");
              this.nombrePuntoFijo.push(this.dathax[i].nombre);

              //ASIGNAMOS LOS KILOS A LOS SUBAGRUPÁDORES
              this.plasticos.push(this.dathax[i].kilosreciclaje1);
              this.latasAluminio.push(this.dathax[i].kilosreciclaje2);
              this.cartonPapel.push(this.dathax[i].kilosreciclaje3);
            }else{
              //ya se añadio previamente
              this.plasticos[indexNombreInArray] = this.plasticos[indexNombreInArray] + this.dathax[i].kilosreciclaje1;
              this.latasAluminio[indexNombreInArray] = this.latasAluminio[indexNombreInArray] + this.dathax[i].kilosreciclaje2;
              this.cartonPapel[indexNombreInArray] =this.cartonPapel[indexNombreInArray] + this.dathax[i].kilosreciclaje3;

            }
             
          } catch (error) {
            
          }

         
          }

        }

        
        
        
      }
    )

    this.ngOnDestroy();
    

  }

}
