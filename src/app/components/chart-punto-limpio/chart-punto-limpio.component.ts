import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
//import { parse } from 'querystring';
import { parseJsonText } from 'typescript';
import {FirebaseService} from '../../services/firebase.service';


@Component({
  selector: 'app-chart-punto-limpio',
  templateUrl: './chart-punto-limpio.component.html',
  styleUrls: ['./chart-punto-limpio.component.css']
})
export class ChartPuntoLimpioComponent implements OnInit {

  @Input() desactivado:boolean = true;
  info: any;


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
  public barChartLabels: string[] = ['Blumar', 'Orizon', 'Huachipato'];
  public barChartType: ChartType  = 'bar';
  public barChartLegend = true;
  
  public barChartData: any[] = [
    { barPercentage: .5, data: [13, 20, 4], label: 'Plasticos' },
    { barPercentage: .5, data: [31, 30, 6], label: 'Cartón y Papel' },
    { barPercentage: .5, data: [18, 15, 3], label: 'Latas de aluminio' }
  ];
  
  public barChartColors: Array<any> = [
    
    {
      backgroundColor: "#04b962"
    },
    {
      backgroundColor: "#14b6ff"
    },
    {
      backgroundColor: "#7934f3"
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

        //let largo = Object.keys(this.info).length;
        let informacion = JSON.stringify(this.info);
        //console.log(informacion);
        /* for (let i = 1; i < largo; i++) {
          let element = this.info[i];
          console.log(element);
        } */
        
      });
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
