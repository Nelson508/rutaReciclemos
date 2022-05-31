import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FirebaseService} from '../../services/firebase.service';
import * as XLSX from 'xlsx';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-chart-edad',
  templateUrl: './chart-edad.component.html',
  styleUrls: ['./chart-edad.component.css']
})
export class ChartEdadComponent implements OnInit {

  @Input() desactivado:boolean = false;
  info: any;
  options:any = {}
  excelEdad = true;
  /*
  GRUPO A: ENTRE 6 Y 14
  GRUPO B: ENTRE 15 Y 24
  GRUPO C: ENTRE 25 Y 34
  GRUPO D: ENTRE 35 Y 44
  GRUPO E: ENTRE 45 Y 54
  GRUPO F: ENTRE 55 Y 64
  GRUPO G: ENTRE 65 Y 150
  */

  A = {
    nombre: 'ENTRE 6 Y 14',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  B = {
    nombre: 'ENTRE 15 Y 24',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  C = {
    nombre: 'ENTRE 25 Y 34',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  D = {
    nombre: 'ENTRE 35 Y 44',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  E = {
    nombre: 'ENTRE 45 Y 54',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  F = {
    nombre: 'ENTRE 55 Y 64',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  G = {
    nombre: 'MAYOR A 65',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

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

  @ViewChild(ApexCharts) chart?: ApexCharts;

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

  ngOnDestroy(){
 
    /* this.pieChartOptions = {
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
       
     } */
     this.options = {
      chart: {
          height: 280,
          type: 'pie',
          foreColor: '#4e4e4e',
      },
      dataLabels: {
          enabled: true,
          style:{
            colors: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
            fontSize: '15px',
            fontFamily: 'Helvetica',
            fontWeight:'0px'
          },
          textAnchor: 'start' 
      },
      series: [Math.round(((this.A.total/1000) + Number.EPSILON) * 100) / 100, Math.round(((this.B.total/1000) + Number.EPSILON) * 100) / 100, Math.round(((this.C.total/1000) + Number.EPSILON) * 100) / 100, Math.round(((this.D.total/1000) + Number.EPSILON) * 100) / 100, Math.round(((this.E.total/1000) + Number.EPSILON) * 100) / 100, Math.round(((this.F.total/1000) + Number.EPSILON) * 100) / 100, Math.round(((this.G.total/1000) + Number.EPSILON) * 100) / 100],
      colors: ["#04b962", "#ff8800", "#14b6ff", "#94614f", "#7934f3", "#4A235A", "#2874A6"],
      labels: ["De 6 a 14", "15 a 24", "25 a 34", "35 a 44", "45 a 54", "55 a 64", "65 ó más"],
      legend: {
        customLegendItems:["De 6 a 14", "15 a 24", "25 a 34", "35 a 44", "45 a 54", "55 a 64", "65 ó más"],
        
        formatter: function(abc:any, opts:any) {
            return abc + " - " + opts.w.globals.series[opts.seriesIndex] + " Tons"
        }
      },
      responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  height: 330
              },
              legend: {
                  position: 'bottom'
              }
          }
      }]
  
    }
    this.chart?.destroy();

    this.chart = new ApexCharts(
      document.querySelector("#chartEdad"),
      this.options
    );

    this.chart?.render();
     //this.chart?.update();

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
          let date = new Date().getFullYear();
          if(date == this.info[i].timestamp.slice(0,4) )
          {
            let element = this.info[i].uid;
            let PET = parseFloat(this.info[i].kilosreciclaje1);
            let PEAD = parseFloat(this.info[i].kilosreciclaje2);
            let PEBD = parseFloat(this.info[i].kilosreciclaje3);
            let carton = parseFloat(this.info[i].kilosreciclaje4);
            let latas = parseFloat(this.info[i].kilosreciclaje5);
            //se consulta la edad desde la BD
            let dateBorn = await this.infoFechaNacimiento(element);
            // console.log('yearBorn: '+ dateBorn.slice(6,10));
            let age = date - dateBorn.slice(6,10);
           /*  console.log('edad'+ age); */
            

            
            let total = PET + PEAD + PEBD + carton + latas;
            total = Math.round((total + Number.EPSILON) * 100) / 100;
            PET = Math.round((PET + Number.EPSILON) * 100) / 100;
            PEAD = Math.round((PEAD + Number.EPSILON) * 100) / 100;
            PEBD = Math.round((PEBD + Number.EPSILON) * 100) / 100;
            carton = Math.round((carton + Number.EPSILON) * 100) / 100;
            latas = Math.round((latas + Number.EPSILON) * 100) / 100;

            //edad entre 6 y 14 anos
            if( age >=6 && age <=14)
            {
              // console.log("su edad esta entre 6 y 14");
              this.A.pet += PET;
              this.A.pead += PEAD;
              this.A.pebd += PEBD;
              this.A.carton += carton;
              this.A.aluminio += latas;
              this.A.total += total;

              this.A.pet = Math.round((this.A.pet + Number.EPSILON) * 100) / 100;
              this.A.pead = Math.round((this.A.pead + Number.EPSILON) * 100) / 100;
              this.A.pebd = Math.round((this.A.pebd + Number.EPSILON) * 100) / 100;
              this.A.carton = Math.round((this.A.carton  + Number.EPSILON) * 100) / 100;
              this.A.aluminio = Math.round((this.A.aluminio + Number.EPSILON) * 100) / 100;
              this.A.total = Math.round((this.A.total + Number.EPSILON) * 100) / 100;


            }

            //edad entre 15 y 24 anos
            if( age >=15 && age <=24)
            {
              //console.log("su edad esta entre 15 y 24");
              this.B.pet += PET;
              this.B.pead += PEAD;
              this.B.pebd += PEBD;
              this.B.carton += carton;
              this.B.aluminio += latas;
              this.B.total += total;

              
              this.B.pet = Math.round((this.B.pet + Number.EPSILON) * 100) / 100;
              this.B.pead = Math.round((this.B.pead + Number.EPSILON) * 100) / 100;
              this.B.pebd = Math.round((this.B.pebd + Number.EPSILON) * 100) / 100;
              this.B.carton = Math.round((this.B.carton  + Number.EPSILON) * 100) / 100;
              this.B.aluminio = Math.round((this.B.aluminio + Number.EPSILON) * 100) / 100;
              this.B.total = Math.round((this.B.total + Number.EPSILON) * 100) / 100;
            }

            //edad entre 25 y 34 anos
            if( age >=25 && age <=34)
            {
              //console.log("su edad esta entre 25 y 34");
              this.C.pet += PET;
              this.C.pead += PEAD;
              this.C.pebd += PEBD;
              this.C.carton += carton;
              this.C.aluminio += latas;
              this.C.total += total;

              this.C.pet = Math.round((this.C.pet + Number.EPSILON) * 100) / 100;
              this.C.pead = Math.round((this.C.pead + Number.EPSILON) * 100) / 100;
              this.C.pebd = Math.round((this.C.pebd + Number.EPSILON) * 100) / 100;
              this.C.carton = Math.round((this.C.carton  + Number.EPSILON) * 100) / 100;
              this.C.aluminio = Math.round((this.C.aluminio + Number.EPSILON) * 100) / 100;
              this.C.total = Math.round((this.C.total + Number.EPSILON) * 100) / 100;
            }

            //edad entre 35 y 44 anos 
            if( age >=35 && age <=44)
            {
              //console.log("su edad esta entre 35 y 44");
              this.D.pet += PET;
              this.D.pead += PEAD;
              this.D.pebd += PEBD;
              this.D.carton += carton;
              this.D.aluminio += latas;
              this.D.total += total;

              this.D.pet = Math.round((this.D.pet + Number.EPSILON) * 100) / 100;
              this.D.pead = Math.round((this.D.pead + Number.EPSILON) * 100) / 100;
              this.D.pebd = Math.round((this.D.pebd + Number.EPSILON) * 100) / 100;
              this.D.carton = Math.round((this.D.carton  + Number.EPSILON) * 100) / 100;
              this.D.aluminio = Math.round((this.D.aluminio + Number.EPSILON) * 100) / 100;
              this.D.total = Math.round((this.D.total + Number.EPSILON) * 100) / 100;
            }

            //edad entre 45 y 54
            if( age >=45 && age <=54)
            {
              //console.log("su edad esta entre 45 y 54");
              this.E.pet += PET;
              this.E.pead += PEAD;
              this.E.pebd += PEBD;
              this.E.carton += carton;
              this.E.aluminio += latas;
              this.E.total += total;

              this.E.pet = Math.round((this.E.pet + Number.EPSILON) * 100) / 100;
              this.E.pead = Math.round((this.E.pead + Number.EPSILON) * 100) / 100;
              this.E.pebd = Math.round((this.E.pebd + Number.EPSILON) * 100) / 100;
              this.E.carton = Math.round((this.E.carton  + Number.EPSILON) * 100) / 100;
              this.E.aluminio = Math.round((this.E.aluminio + Number.EPSILON) * 100) / 100;
              this.E.total = Math.round((this.E.total + Number.EPSILON) * 100) / 100;
            }

            //edad entre 55 y 64 anos
            if( age >=55 && age <=64)
            {
            /*   console.log("su edad esta entre 55 y 64"); */
              this.F.pet += PET;
              this.F.pead += PEAD;
              this.F.pebd += PEBD;
              this.F.carton += carton;
              this.F.aluminio += latas;
              this.F.total += total;

              this.F.pet = Math.round((this.F.pet + Number.EPSILON) * 100) / 100;
              this.F.pead = Math.round((this.F.pead + Number.EPSILON) * 100) / 100;
              this.F.pebd = Math.round((this.F.pebd + Number.EPSILON) * 100) / 100;
              this.F.carton = Math.round((this.F.carton  + Number.EPSILON) * 100) / 100;
              this.F.aluminio = Math.round((this.F.aluminio + Number.EPSILON) * 100) / 100;
              this.F.total = Math.round((this.F.total + Number.EPSILON) * 100) / 100;
            }

            //edad entre 65 o mayor
            if( age >=65 && age <=150)
            {
            /*   console.log("su edad es mayor a 65 anos!"); */
              this.G.pet += PET;
              this.G.pead += PEAD;
              this.G.pebd += PEBD;
              this.G.carton += carton;
              this.G.aluminio += latas;
              this.G.total += total;

              this.G.pet = Math.round((this.G.pet + Number.EPSILON) * 100) / 100;
              this.G.pead = Math.round((this.G.pead + Number.EPSILON) * 100) / 100;
              this.G.pebd = Math.round((this.G.pebd + Number.EPSILON) * 100) / 100;
              this.G.carton = Math.round((this.G.carton  + Number.EPSILON) * 100) / 100;
              this.G.aluminio = Math.round((this.G.aluminio + Number.EPSILON) * 100) / 100;
              this.G.total = Math.round((this.G.total + Number.EPSILON) * 100) / 100;
            }

           

          }
          

        }


      });
      console.log('Termino calculo!!!')
  }


  infoFechaNacimiento(id:any)
  {
    return this.firebaseSer.getFechaNacimiento(id);
  }


   //funcion que genera el excel
   generateExcelEtario()
   {
     console.log('hello');
     //le pasamos la id de la tabla al excel guy, imma right?
     let element = document.getElementById('edad-table');
     const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
 
     //yenereit workbuk an ad de workshit (worksheet)
 
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
 
     //guardamos el archivo
     XLSX.writeFile(wb, 'ReporteRangoEtario.xlsx');
   }

}
