import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-chart-genero',
  templateUrl: './chart-genero.component.html',
  styleUrls: ['./chart-genero.component.css']
})
export class ChartGeneroComponent implements OnInit {

  @Input() desactivado:boolean = false;
  info: any;

   // Doughnut
   public doughnutChartLabels: string[] = ["Masculino", "Femenino", "No especifica"];
   public doughnutChartData: number[] = [13, 20, 11];
   public doughnutChartColors: any[] = [{ backgroundColor: ["#7934f3", "#f43643", "#04b962"] ,
                                               borderWidth: [3, 3, 3]}];
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

  constructor(private firebaseSer: FirebaseService) { }

  ngOnInit(): void {
    this.infoGenero();
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  async infoGenero(){
    await this.firebaseSer.getGenero().then( data =>
      {
        this.info = data;
        console.log(this.info);
        //var largo =  Object.keys(this.graficoVotacion.opciones).length;
        let largo = Object.keys(this.info).length;
        console.log(largo);

       /*  for (let index = 0; index < this.info.length; index++) {
          let element = this.info[index];
          console.log(element);
        }
         */

      });
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
