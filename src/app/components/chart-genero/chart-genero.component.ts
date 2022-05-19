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
  Masculino: number = 0;
  Femenino: number = 0;
  No_especifica: number = 0;

   // Doughnut
   public doughnutChartLabels: string[] = ["Masculino", "Femenino", "No especifica"];
   public doughnutChartData: number[] = [this.Masculino, this.Femenino, this.No_especifica];
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
    this.infoRutasCompletadas();
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  async infoRutasCompletadas(){
    await this.firebaseSer.getRutasCompletadas().then( async data =>
      {
        this.info = data;
        /* console.log(this.info['1'].uid); */
        //var largo =  Object.keys(this.graficoVotacion.opciones).length;
        let largo = Object.keys(this.info).length;
        //console.log(largo);

        for (let i = 1; i < largo; i++) {
          let element = this.info[i].uid;
          let PET = parseFloat(this.info[i].kilosreciclaje1);
          let PEAD = parseFloat(this.info[i].kilosreciclaje2);
          let PEBD = parseFloat(this.info[i].kilosreciclaje3);
          let carton = parseFloat(this.info[i].kilosreciclaje4);
          let latas = parseFloat(this.info[i].kilosreciclaje5);
          let genero = await this.infoGenero(element);
          //console.log(this.info[i]);
          let total = PET + PEAD + PEBD + carton + latas;
          //console.log(PET,PEAD,PEBD,carton,latas);
          //console.log(total);
          if(genero == 'Masculino'){
            this.Masculino += total;
          } else if (genero == 'Femenino') {
            this.Femenino += total;
          } else if(genero == 'No aplica') {
            this.No_especifica += total;
          }

        }

        //console.log(this.Masculino);
        //console.log(this.No_especifica);
      });
  }

  infoGenero(id:any) {
    return this.firebaseSer.getGenero(id);
  }

  
  // async infoGenero(id:any): Promise<any> {
  //   return this.firebaseSer.getGenero(id).then( data =>
  //     {
  //       let genero = data;
  //       console.log(genero);
  //       return data;
        
  //     });
  // }


  ngOnDestroy(){

    this.doughnutChartData = [this.Masculino, this.Femenino, this.No_especifica];

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
