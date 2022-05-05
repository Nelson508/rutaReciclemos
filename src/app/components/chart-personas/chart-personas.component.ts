import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-chart-personas',
  templateUrl: './chart-personas.component.html',
  styleUrls: ['./chart-personas.component.css']
})
export class ChartPersonasComponent implements OnInit {

  @Input() desactivado:boolean = false;


   // Doughnut
   public doughnutChartLabels: string[] = ["Botellas PET", "Envases PEAD", "Envases PEBD", "Cartón y Papel", "Latas de aluminio"];
   public doughnutChartData: number[] = [13, 30, 11, 20, 50];
   public doughnutChartColors: any[] = [{ backgroundColor: ["#7934f3", "#f43643", "#04b962", "#0a151f", "#ff8800"] ,
                                               borderWidth: [5, 5, 5, 5, 5]}];
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
