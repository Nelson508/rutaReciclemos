import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FirebaseService} from '../../services/firebase.service';
import * as XLSX from 'xlsx';

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
  excellPersonas = true;

  enero = {
    nombre: 'Enero',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  febrero = {
    nombre: 'Febrero',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  marzo = {
    nombre: 'Marzo',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  abril = {
    nombre: 'Abril',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  mayo = {
    nombre: 'Mayo',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  junio = {
    nombre: 'Junio',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  julio = {
    nombre: 'Julio',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  agosto = {
    nombre: 'Agosto',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  septiembre = {
    nombre: 'Septiembre',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  octubre = {
    nombre: 'Octubre',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  noviembre = {
    nombre: 'Noviembre',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }

  diciembre = {
    nombre: 'Diciembre',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total:0
  }
  

  


   // Doughnut
   public doughnutChartLabels: string[] = ["Botellas PET", "Envases PEAD", "Envases PEBD", "Cartón y Papel", "Latas de aluminio"];
   public doughnutChartData: number[] = [this.pet, this.pead, this.pebd, this.carton, this.latas];
   public doughnutChartColors: any[] = [{ backgroundColor: ["#FFEA00", "#FDDA0D", "#DFFF00", "#0096FF", "#888888"] ,
                                               borderWidth: [0,0,0,0,0]}];
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
    
    await this.obtenerRutasCompletadas();
    
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
        // console.log(data);
        let largo = Object.keys(this.dathax).length;
        // console.log('Largo:' + largo);
        let date = new Date().getFullYear();
         for (let i = 1; i < largo; i++) 
         {

          if(date == this.dathax[i].timestamp.slice(0,4) )
          {
          
          this.pet +=  parseFloat(this.dathax[i].kilosreciclaje1);
          this.pead += parseFloat(this.dathax[i].kilosreciclaje2);
          this.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
          this.carton += parseFloat(this.dathax[i].kilosreciclaje4);
          this.latas += parseFloat(this.dathax[i].kilosreciclaje5);
          
          
          //enero
          if(this.dathax[i].timestamp.slice(5,7) == '01')
          {
            this.enero.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.enero.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.enero.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.enero.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.enero.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.enero.pet = Math.round((this.enero.pet + Number.EPSILON) * 100) / 100;
            this.enero.pead = Math.round((this.enero.pead + Number.EPSILON) * 100) / 100;
            this.enero.pebd = Math.round((this.enero.pebd + Number.EPSILON) * 100) / 100;
            this.enero.carton = Math.round((this.enero.carton + Number.EPSILON) * 100) / 100;
            this.enero.aluminio =  Math.round((this.enero.aluminio + Number.EPSILON) * 100) / 100;

            this.enero.total += (this.enero.pet + this.enero.pead +  this.enero.pebd + this.enero.carton + this.enero.aluminio);
            this.enero.total = Math.round((this.enero.total + Number.EPSILON) * 100) / 100;

          }

          //febrero
          if(this.dathax[i].timestamp.slice(5,7) == '02')
          {
            this.febrero.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.febrero.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.febrero.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.febrero.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.febrero.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.febrero.pet = Math.round((this.febrero.pet + Number.EPSILON) * 100) / 100;
            this.febrero.pead = Math.round((this.febrero.pead + Number.EPSILON) * 100) / 100;
            this.febrero.pebd = Math.round((this.febrero.pebd + Number.EPSILON) * 100) / 100;
            this.febrero.carton = Math.round((this.febrero.carton + Number.EPSILON) * 100) / 100;
            this.febrero.aluminio =  Math.round((this.febrero.aluminio + Number.EPSILON) * 100) / 100;

            this.febrero.total += (this.febrero.pet + this.febrero.pead +  this.febrero.pebd + this.febrero.carton + this.febrero.aluminio);
            this.febrero.total = Math.round((this.febrero.total + Number.EPSILON) * 100) / 100;

          }

          //marzo
          if(this.dathax[i].timestamp.slice(5,7) == '03')
          {
            this.marzo.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.marzo.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.marzo.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.marzo.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.marzo.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.marzo.pet = Math.round((this.marzo.pet + Number.EPSILON) * 100) / 100;
            this.marzo.pead = Math.round((this.marzo.pead + Number.EPSILON) * 100) / 100;
            this.marzo.pebd = Math.round((this.marzo.pebd + Number.EPSILON) * 100) / 100;
            this.marzo.carton = Math.round((this.marzo.carton + Number.EPSILON) * 100) / 100;
            this.marzo.aluminio =  Math.round((this.marzo.aluminio + Number.EPSILON) * 100) / 100;

            this.marzo.total += (this.marzo.pet + this.marzo.pead +  this.marzo.pebd + this.marzo.carton + this.marzo.aluminio);
            this.marzo.total = Math.round((this.marzo.total + Number.EPSILON) * 100) / 100;

          }

          //abril
          if(this.dathax[i].timestamp.slice(5,7) == '04')
          {
            this.abril.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.abril.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.abril.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.abril.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.abril.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.abril.pet = Math.round((this.abril.pet + Number.EPSILON) * 100) / 100;
            this.abril.pead = Math.round((this.abril.pead + Number.EPSILON) * 100) / 100;
            this.abril.pebd = Math.round((this.abril.pebd + Number.EPSILON) * 100) / 100;
            this.abril.carton = Math.round((this.abril.carton + Number.EPSILON) * 100) / 100;
            this.abril.aluminio =  Math.round((this.abril.aluminio + Number.EPSILON) * 100) / 100;

            this.abril.total += (this.abril.pet + this.abril.pead +  this.abril.pebd + this.abril.carton + this.abril.aluminio);
            this.abril.total = Math.round((this.abril.total + Number.EPSILON) * 100) / 100;

          }

          //mayo
          if(this.dathax[i].timestamp.slice(5,7) == '05')
          {
            this.mayo.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.mayo.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.mayo.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.mayo.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.mayo.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.mayo.pet = Math.round((this.mayo.pet + Number.EPSILON) * 100) / 100;
            this.mayo.pead = Math.round((this.mayo.pead + Number.EPSILON) * 100) / 100;
            this.mayo.pebd = Math.round((this.mayo.pebd + Number.EPSILON) * 100) / 100;
            this.mayo.carton = Math.round((this.mayo.carton + Number.EPSILON) * 100) / 100;
            this.mayo.aluminio =  Math.round((this.mayo.aluminio + Number.EPSILON) * 100) / 100;

            this.mayo.total += (this.mayo.pet + this.mayo.pead +  this.mayo.pebd + this.mayo.carton + this.mayo.aluminio);
            this.mayo.total = Math.round((this.mayo.total + Number.EPSILON) * 100) / 100;

          }

          //junio
          if(this.dathax[i].timestamp.slice(5,7) == '06')
          {
            this.junio.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.junio.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.junio.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.junio.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.junio.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.junio.pet = Math.round((this.junio.pet + Number.EPSILON) * 100) / 100;
            this.junio.pead = Math.round((this.junio.pead + Number.EPSILON) * 100) / 100;
            this.junio.pebd = Math.round((this.junio.pebd + Number.EPSILON) * 100) / 100;
            this.junio.carton = Math.round((this.junio.carton + Number.EPSILON) * 100) / 100;
            this.junio.aluminio =  Math.round((this.junio.aluminio + Number.EPSILON) * 100) / 100;

            this.junio.total += (this.junio.pet + this.junio.pead +  this.junio.pebd + this.junio.carton + this.junio.aluminio);
            this.junio.total = Math.round((this.junio.total + Number.EPSILON) * 100) / 100;

          }

          //julio
          if(this.dathax[i].timestamp.slice(5,7) == '07')
          {
            this.julio.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.julio.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.julio.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.julio.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.julio.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.julio.pet = Math.round((this.julio.pet + Number.EPSILON) * 100) / 100;
            this.julio.pead = Math.round((this.julio.pead + Number.EPSILON) * 100) / 100;
            this.julio.pebd = Math.round((this.julio.pebd + Number.EPSILON) * 100) / 100;
            this.julio.carton = Math.round((this.julio.carton + Number.EPSILON) * 100) / 100;
            this.julio.aluminio =  Math.round((this.julio.aluminio + Number.EPSILON) * 100) / 100;

            this.julio.total += (this.julio.pet + this.julio.pead +  this.julio.pebd + this.julio.carton + this.julio.aluminio);
            this.julio.total = Math.round((this.julio.total + Number.EPSILON) * 100) / 100;

          }

          //augusto
          if(this.dathax[i].timestamp.slice(5,7) == '08')
          {
            this.agosto.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.agosto.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.agosto.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.agosto.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.agosto.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.agosto.pet = Math.round((this.agosto.pet + Number.EPSILON) * 100) / 100;
            this.agosto.pead = Math.round((this.agosto.pead + Number.EPSILON) * 100) / 100;
            this.agosto.pebd = Math.round((this.agosto.pebd + Number.EPSILON) * 100) / 100;
            this.agosto.carton = Math.round((this.agosto.carton + Number.EPSILON) * 100) / 100;
            this.agosto.aluminio =  Math.round((this.agosto.aluminio + Number.EPSILON) * 100) / 100;

            this.agosto.total += (this.agosto.pet + this.agosto.pead +  this.agosto.pebd + this.agosto.carton + this.agosto.aluminio);
            this.agosto.total = Math.round((this.agosto.total + Number.EPSILON) * 100) / 100;

          }

          //septiembre
          if(this.dathax[i].timestamp.slice(5,7) == '09')
          {
            this.septiembre.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.septiembre.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.septiembre.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.septiembre.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.septiembre.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.septiembre.pet = Math.round((this.septiembre.pet + Number.EPSILON) * 100) / 100;
            this.septiembre.pead = Math.round((this.septiembre.pead + Number.EPSILON) * 100) / 100;
            this.septiembre.pebd = Math.round((this.septiembre.pebd + Number.EPSILON) * 100) / 100;
            this.septiembre.carton = Math.round((this.septiembre.carton + Number.EPSILON) * 100) / 100;
            this.septiembre.aluminio =  Math.round((this.septiembre.aluminio + Number.EPSILON) * 100) / 100;

            this.septiembre.total += (this.septiembre.pet + this.septiembre.pead +  this.septiembre.pebd + this.septiembre.carton + this.septiembre.aluminio);
            this.septiembre.total = Math.round((this.septiembre.total + Number.EPSILON) * 100) / 100;

          }

          //octubre
          if(this.dathax[i].timestamp.slice(5,7) == '10')
          {
            this.octubre.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.octubre.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.octubre.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.octubre.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.octubre.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.octubre.pet = Math.round((this.octubre.pet + Number.EPSILON) * 100) / 100;
            this.octubre.pead = Math.round((this.octubre.pead + Number.EPSILON) * 100) / 100;
            this.octubre.pebd = Math.round((this.octubre.pebd + Number.EPSILON) * 100) / 100;
            this.octubre.carton = Math.round((this.octubre.carton + Number.EPSILON) * 100) / 100;
            this.octubre.aluminio =  Math.round((this.octubre.aluminio + Number.EPSILON) * 100) / 100;

            this.octubre.total += (this.octubre.pet + this.octubre.pead +  this.octubre.pebd + this.octubre.carton + this.octubre.aluminio);
            this.octubre.total = Math.round((this.octubre.total + Number.EPSILON) * 100) / 100;

          }

          //noviembre sin ti
          if(this.dathax[i].timestamp.slice(5,7) == '11')
          {
            this.noviembre.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.noviembre.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.noviembre.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.noviembre.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.noviembre.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.noviembre.pet = Math.round((this.noviembre.pet + Number.EPSILON) * 100) / 100;
            this.noviembre.pead = Math.round((this.noviembre.pead + Number.EPSILON) * 100) / 100;
            this.noviembre.pebd = Math.round((this.noviembre.pebd + Number.EPSILON) * 100) / 100;
            this.noviembre.carton = Math.round((this.noviembre.carton + Number.EPSILON) * 100) / 100;
            this.noviembre.aluminio =  Math.round((this.noviembre.aluminio + Number.EPSILON) * 100) / 100;

            this.noviembre.total += (this.noviembre.pet + this.noviembre.pead +  this.noviembre.pebd + this.noviembre.carton + this.noviembre.aluminio);
            this.noviembre.total = Math.round((this.noviembre.total + Number.EPSILON) * 100) / 100;

          }

          //diciembre
          if(this.dathax[i].timestamp.slice(5,7) == '12')
          {
            this.diciembre.pet += parseFloat(this.dathax[i].kilosreciclaje1);
            this.diciembre.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.diciembre.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.diciembre.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.diciembre.aluminio += parseFloat(this.dathax[i].kilosreciclaje5);

            this.diciembre.pet = Math.round((this.diciembre.pet + Number.EPSILON) * 100) / 100;
            this.diciembre.pead = Math.round((this.diciembre.pead + Number.EPSILON) * 100) / 100;
            this.diciembre.pebd = Math.round((this.diciembre.pebd + Number.EPSILON) * 100) / 100;
            this.diciembre.carton = Math.round((this.diciembre.carton + Number.EPSILON) * 100) / 100;
            this.diciembre.aluminio =  Math.round((this.diciembre.aluminio + Number.EPSILON) * 100) / 100;

            this.diciembre.total += (this.diciembre.pet + this.diciembre.pead +  this.diciembre.pebd + this.diciembre.carton + this.diciembre.aluminio);
            this.diciembre.total = Math.round((this.diciembre.total + Number.EPSILON) * 100) / 100;

          }

          // let total = this.pet + this.pead + this.pebd + this.carton + this.latas;
          //console.log(PET,PEAD,PEBD,carton,latas);
          
          //console.log(total);
          // console.log('i:' + i);
         
          // console.log('PET:' +this.pet + 'PEAD: ' + this.pead + 'PEBD: ' +this.pebd + 'Carton: ' + this.carton + 'Latas:' + this.latas)
          }

        }

        
        
      }
    )

   
    

  }

  generateExcelTipoReciclaje()
  {
    console.log('hello');
    //le pasamos la id de la tabla al excel guy, imma right?
    let element = document.getElementById('tipoMaterial-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    //yenereit workbuk an ad de workshit (worksheet)

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

    //guardamos el archivo
    XLSX.writeFile(wb, 'ReporteTipoMaterialReciclado.xlsx');
  }

}
