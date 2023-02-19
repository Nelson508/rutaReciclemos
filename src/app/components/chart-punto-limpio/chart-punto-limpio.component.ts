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

  @Input() desactivado:boolean = true;
  info: any;

  nombrePuntoFijo: string[] = [];
  plasticos: number[] = [];
  latasAluminio: number[] = [];
  cartonPapel: number[] = [];

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

    this.infoPuntosFijos();
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
        //let largo = Object.keys(this.info).length;
        //let informacion = JSON.stringify(this.info);
        //console.log(this.info);
        for (let i = 0; i < largo; i++) {

         /*  console.log(this.info[i].fijo_punto_plasticos = Math.round(((parseFloat(this.info[i].fijo_punto_plasticos)/1000) + Number.EPSILON) * 100) / 100); */
          this.info[i].fijo_punto_latas = Math.round(((parseFloat(this.info[i].fijo_punto_latas)/1000) + Number.EPSILON) * 100) / 100;
          this.info[i].fijo_punto_carton = Math.round(((parseFloat(this.info[i].fijo_punto_carton)/1000) + Number.EPSILON) * 100) / 100;

          this.excel.push(this.info[i]);
         /*  console.log(this.excel); */
          this.nombrePuntoFijo.push(this.info[i].nombre);
          this.plasticos.push(this.info[i].fijo_punto_plasticos);
          this.latasAluminio.push(this.info[i].fijo_punto_latas);
          this.cartonPapel.push(this.info[i].fijo_punto_carton);

          //Math.round((total + Number.EPSILON) * 100) / 100;

          //console.log(this.info[i]);
        }
       /*  console.log(this.excel); */
        /* console.log(this.nombrePuntoFijo);
        console.log(this.plasticos);
        console.log(this.latasAluminio);
        console.log(this.cartonPapel);
         */
      });
  }

  generateExcel()
  {

    //le pasamos la id de la tabla al excel guy, imma right?
    let element = document.getElementById('puntoLimpio-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);


    //yenereit workbuk an ad de workshit (worksheet)

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

}
