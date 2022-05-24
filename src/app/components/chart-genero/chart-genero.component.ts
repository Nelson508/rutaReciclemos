import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FirebaseService} from '../../services/firebase.service';
import * as XLSX from 'xlsx';

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

  Mpet: number = 0;
  Mpead: number =0;
  Mpebd: number = 0;
  Mcarton: number = 0;
  Maluminio: number = 0;
  Mtotal: number = 0;

  Fpet: number = 0;
  Fpead: number =0;
  Fpebd: number = 0;
  Fcarton: number = 0;
  Faluminio: number = 0;
  Ftotal: number = 0;

  NNpet: number = 0;
  NNpead: number =0;
  NNpebd: number = 0;
  NNcarton: number = 0;
  NNaluminio: number = 0;
  NNtotal: number = 0;
  
  excelGenero = true;

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
          let date = new Date().getFullYear();
          if(date == this.info[i].timestamp.slice(0,4) )
          {
            let element = this.info[i].uid;
            let PET = parseFloat(this.info[i].kilosreciclaje1);
            let PEAD = parseFloat(this.info[i].kilosreciclaje2);
            let PEBD = parseFloat(this.info[i].kilosreciclaje3);
            let carton = parseFloat(this.info[i].kilosreciclaje4);
            let latas = parseFloat(this.info[i].kilosreciclaje5);
            let genero = await this.infoGenero(element);
            let total = PET + PEAD + PEBD + carton + latas;
            total = Math.round((total + Number.EPSILON) * 100) / 100;
            PET = Math.round((PET + Number.EPSILON) * 100) / 100;
            PEAD = Math.round((PEAD + Number.EPSILON) * 100) / 100;
            PEBD = Math.round((PEBD + Number.EPSILON) * 100) / 100;
            carton = Math.round((carton + Number.EPSILON) * 100) / 100;
            latas = Math.round((latas + Number.EPSILON) * 100) / 100;
            if(genero == 'Masculino')
            {
              this.Masculino += total;
              this.Mpet += PET;
              this.Mpead += PEAD;
              this.Mpebd += PEBD;
              this.Mcarton += carton;
              this.Maluminio += latas;

            } else if (genero == 'Femenino') 
            {
              this.Femenino += total;
              this.Fpet += PET;
              this.Fpead += PEAD;
              this.Fpebd += PEBD;
              this.Fcarton += carton;
              this.Faluminio += latas;
              
            } else if(genero == 'No aplica') 
            {
              this.No_especifica += total;
              this.NNpet += PET;
              this.NNpead += PEAD;
              this.NNpebd += PEBD;
              this.NNcarton += carton;
              this.NNaluminio += latas;

              this.NNpet  = Math.round((this.NNpet + Number.EPSILON) * 100) / 100;
              this.NNpead = Math.round(( this.NNpead+ Number.EPSILON) * 100) / 100;
              this.NNpebd= Math.round(( this.NNpebd+ Number.EPSILON) * 100) / 100;
              this.NNcarton= Math.round((this.NNcarton + Number.EPSILON) * 100) / 100;
              this.NNaluminio= Math.round((this.NNaluminio + Number.EPSILON) * 100) / 100;
            }

          }
          

        }


      });

      this.ngOnDestroy();
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

  //funcion que genera el excel
  generateExcelGenero()
  {
    console.log('hello');
    //le pasamos la id de la tabla al excel guy, imma right?
    let element = document.getElementById('genero-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    //yenereit workbuk an ad de workshit (worksheet)

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

    //guardamos el archivo
    XLSX.writeFile(wb, 'ReporteGenero.xlsx');
  }

}
