import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-genero',
  templateUrl: './chart-genero.component.html',
  styleUrls: ['./chart-genero.component.css']
})
export class ChartGeneroComponent implements OnInit {

  @Input() desactivado:boolean = false;

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

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() { }

  ngOnInit(): void {
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  ngOnDestroy(){
   

    this.doughnutChartOptions = {
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
      animation: {
        animateScale: false,
        animateRotate: true,
        duration: 500,
        easing: 'linear'
      }
      
    }
    this.chart?.update();
  }

}
