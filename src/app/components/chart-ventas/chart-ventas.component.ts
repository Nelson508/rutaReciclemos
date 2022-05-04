import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-chart-ventas',
  templateUrl: './chart-ventas.component.html',
  styleUrls: ['./chart-ventas.component.css']
})
export class ChartVentasComponent implements OnInit {

  @Input() desactivado:boolean = true;

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
  public barChartLabels: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  public barChartType: ChartType  = 'bar';
  public barChartLegend = true;
  
  public barChartData: any[] = [
    { barPercentage: .5, data: [13, 20, 4, 18, 29, 25, 8], label: 'Google' },
    { barPercentage: .5, data: [31, 30, 6, 6, 21, 4, 11], label: 'Facebook' }
  ];
  
  public barChartColors: Array<any> = [
    
    {
      backgroundColor: "#04b962"
    },
    {
      backgroundColor: "#14b6ff"
    },
  ];
  
  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() { }

  ngOnInit(): void {

    this.ngOnDestroy();
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }
  
  ngOnDestroy(){
    
     this.barChartOptions = {
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
