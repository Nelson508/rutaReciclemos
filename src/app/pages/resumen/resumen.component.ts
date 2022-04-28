import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

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
  
  // Pie
  public pieChartLabels: string[] = ["Lable1", "Lable2", "Lable3", "Lable4"];
  public pieChartData: number[] = [13, 120, 11, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartColors: any[] = [{ backgroundColor: ["#04b962", "#ff8800", "#14b6ff", "#94614f"], borderWidth: [0, 0, 0, 0] }];
  public pieChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position :"right",	
      display: true,
         labels: {
         fontColor: '#585757',  
         boxWidth:15
        }
     }
  
  };

  // Doughnut
  public doughnutChartLabels: string[] = ["Lable1", "Lable2", "Lable3", "Lable4"];
  public doughnutChartData: number[] = [13, 120, 11, 20];
  public doughnutChartColors: any[] = [{ backgroundColor: ["#7934f3", "#f43643", "#04b962", "#0a151f"] ,
                                              borderWidth: [0, 0, 0, 0]}];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position :"right",	
      display: true,
         labels: {
         fontColor: '#585757',  
         boxWidth:15
        }
     },
     
  };


  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  constructor() { }

  ngOnInit(): void {
  }

}
