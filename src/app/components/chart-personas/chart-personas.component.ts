import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FirebaseService} from '../../services/firebase.service';


@Component({
  selector: 'app-chart-personas',
  templateUrl: './chart-personas.component.html',
  styleUrls: ['./chart-personas.component.css']
})
export class ChartPersonasComponent implements OnInit {

  @Input() desactivado:boolean = false;
  dathax:any;
  pet: number = 0;
  pead: number = 0;
  pebd:number = 0;
  carton:number = 0;
  latas:number = 0;
  pe:any;
  arr= [this.pet, this.pead,this.pebd, this.carton, this.latas]
  


   // Doughnut
   public doughnutChartLabels: string[] = ["Botellas PET", "Envases PEAD", "Envases PEBD", "Cartón y Papel", "Latas de aluminio"];
   public doughnutChartData: number[] = [this.pet, this.pead, this.pebd, this.carton, this.latas];
   public doughnutChartColors: any[] = [{ backgroundColor: ["#7934f3", "#f43643", "#04b962", "#0a151f", "#ff8800"] ,
                                               borderWidth: [1, 1, 1, 1, 1]}];
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

  async ngOnInit() {
    console.log('nGPet22: ' + this.pet)
    await this.obtenerRutasCompletadas();
    console.log('nGPet: ' + this.pet)
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  ngOnDestroy(){
   
    this.doughnutChartData = [this.pet, this.pead, this.pebd, this.carton, this.latas];
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


  async obtenerRutasCompletadas()
  {
   await this.firebaseSer.getRutasCompletadas().then(
     data =>
      {
        this.dathax = data;
        console.log(data);
        let largo = Object.keys(this.dathax).length;
        console.log('Largo:' + largo);
         for (let i = 1; i < largo; i++) {
          
          this.pet +=  parseFloat(this.dathax[i].kilosreciclaje1);
          this.pead += parseFloat(this.dathax[i].kilosreciclaje2);
          this.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
          this.carton += parseFloat(this.dathax[i].kilosreciclaje4);
          this.latas += parseFloat(this.dathax[i].kilosreciclaje5);
          
          //console.log(this.info[i]);
          // let total = this.pet + this.pead + this.pebd + this.carton + this.latas;
          //console.log(PET,PEAD,PEBD,carton,latas);
          
          //console.log(total);
          console.log('i:' + i);
         
          console.log('PET:' +this.pet + 'PEAD: ' + this.pead + 'PEBD: ' +this.pebd + 'Carton: ' + this.carton + 'Latas:' + this.latas)
       

        }

        console.log('peti' + this.pet)
        
      }
    )

    console.log('peti1' + this.pet);
    this.pet = Number(this.pet);
    this.pe = this.pet;
    

  }

}
