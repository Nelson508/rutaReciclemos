import { Component,Input, OnInit, ViewChild} from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-comuna',
  templateUrl: './chart-comuna.component.html',
  styleUrls: ['./chart-comuna.component.css']
})
export class ChartComunaComponent implements OnInit {

  @Input() desactivado:boolean = false;
  //@ViewChild(BaseChartDirective)
  

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
    },
    /* transitions: {
      reset: !this.desactivado
    } */
    /* animation: {
      animateScale: true,
      animateRotate: !this.desactivado,
      duration: 1000,
      easing: 'linear',
    },
     */
    
  
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  constructor() { }

  ngOnInit(): void {
    /* if(this.desactivado === true){
      this.chart?.ngOnDestroy();
    } */
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }
  
  ngOnDestroy(){
   /* if(this.desactivado == true){
      this.chart?.update();
      this.pieChartData = [13, 120, 11, 20];
    }else{
      this.chart?.update();
      this.pieChartData = [121, 10, 11, 220];
    } */

    this.pieChartOptions = {
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
