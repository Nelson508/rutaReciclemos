import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-edad',
  templateUrl: './chart-edad.component.html',
  styleUrls: ['./chart-edad.component.css']
})
export class ChartEdadComponent implements OnInit {

  @Input() desactivado:boolean = false;

  // Pie
  public pieChartLabels: string[] = ["Menores de 18", "18 - 26", "27 - 59", "Mayores de 60"];
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
 
    this.pieChartOptions = {
       responsive: true,
       maintainAspectRatio: true,
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
