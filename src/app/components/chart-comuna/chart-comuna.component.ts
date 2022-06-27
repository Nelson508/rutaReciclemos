import { Component,Input, OnInit, ViewChild} from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FirebaseService} from '../../services/firebase.service';
import {HttpClient} from '@angular/common/http'
import { IGeocoderResult } from 'src/app/interfaces/interfaces';
import * as XLSX from 'xlsx';
import ApexCharts from 'apexcharts';



@Component({
  selector: 'app-chart-comuna',
  templateUrl: './chart-comuna.component.html',
  styleUrls: ['./chart-comuna.component.css']
})
export class ChartComunaComponent implements OnInit {

  @Input() desactivado:boolean = false;
  //@ViewChild(BaseChartDirective)
  dathax:any;
  ciudad:string = '';
  options:any = {};
  comunaLabels: Array<string> = [];

  //Comunas que almacenan valor;
  altoBioBio:number = 0;
  antuco:number = 0;
  arauco:number = 0;
  cabrero:number =0;
  canete: number=0;
  chiguayante: number=0;
  concepcion: number=0;
  contulmo: number=0;
  coronel: number=0;
  curanilahue: number=0;
  florida: number=0;
  hualpen: number=0;
  hualqui: number=0;
  laja: number=0;
  lebu: number=0;
  losAlamos: number=0;
  losAngeles: number=0;
  lota: number=0;
  mulchen: number=0;
  nacimiento: number=0;
  negrete: number=0;
  penco: number=0;
  quilaco: number=0;
  quilleco: number=0;
  sanPedroDeLaPaz: number=0;
  sanRosendo: number=0;
  santaBarbara: number=0;
  santaJuana: number=0;
  talcahuano: number=0;
  tirua: number=0;
  tome: number=0;
  tucapel: number=0;
  yumbel: number=0;
  harray: any = [];
  excell = true;

  comunaArray = [
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    },
    {
      nombre: '',
      peso: 0
    }
  ];

  //comienzo de objetos para generacion de Excel
  OAltobiobio = {
    nombre: 'Alto Bío-Bío',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0
  }

 OAntuco = {
  nombre: 'Antuco',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OArauco = {
  nombre: 'Arauco',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0  
}

OCabrero = 
{
  nombre: 'Cabrero',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OCanete = 
{
  nombre: 'Cañete',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OChiguayante = 
{
  nombre: 'Chiguayante',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OConcepcion  = 
{
  nombre: 'Concepción',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OContulmo  = 
{
  nombre: 'Contulmo',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OCoronel   = 
{
  nombre: 'Coronel',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OCuranilahue   = 
{
  nombre: 'Curanilahue',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OFlorida   = 
{
  nombre: 'Florida',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OHualpen   = 
{
  nombre: 'Hualpén',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OHualqui   = 
{
  nombre: 'Hualqui',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OLaja   = 
{
  nombre: 'Laja',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OLebu  = 
{
  nombre: 'Lebu',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OAlamos  = 
{
  nombre: 'Los Álamos',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OAngeles  = 
{
  nombre: 'Los Ángeles',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OLota  = 
{
  nombre: 'Lota',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OMulchen  = 
{
  nombre: 'Mulchén',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

ONacimiento  = 
{
  nombre: 'Nacimiento',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

ONegrete  = 
{
  nombre: 'Negrete',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OPenco  = 
{
  nombre: 'Penco',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OQuilaco  = 
{
  nombre: 'Quilaco',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OQuilleco  = 
{
  nombre: 'Quilleco',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OSanpedro  = 
{
  nombre: 'San Pedro De La Paz',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

ORosendo  = 
{
  nombre: 'San Rosendo',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OBarbara  = 
{
  nombre: 'Santa Bárbara',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OJuana  = 
{
  nombre: 'Santa Juana',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OTalcahuano  = 
{
  nombre: 'Talcahuano',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OTirua  = 
{
  nombre: 'Tirúa',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OTome  = 
{
  nombre: 'Tomé',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OTucapel  = 
{
  nombre: 'Tucapel',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

OYumbel  = 
{
  nombre: 'Yumbel',
  pet: 0,
  pead: 0,
  pebd: 0,
  carton: 0,
  aluminio: 0
}

Toplabel1 = '';















  

  // // Pie
  // public pieChartLabels: string[] = ["Alto Bío-Bío", "Antuco", "Arauco","Cabrero", "Cañete", "Chiguayante", 
  //                                     "Concepción", "Contulmo", "Coronel", "Curanilahue", 
  //                                     "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", 
  //                                     "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco",
  //                                     "San Pedro De La Paz", "San Rosendo", "Santa Bárbara" , "Santa Juana", "Talcahuano",
  //                                     "Tirúa", "Tomé", "Tucapel", "Yumbel"
  //                                   ];
  // public pieChartData: number[] = [this.altoBioBio, this.antuco, this.arauco, this.cabrero, this.canete, this.chiguayante,
  //                                  this.concepcion, this.contulmo , this.coronel, this.curanilahue, this.florida, this.hualpen, this.hualqui,
  //                                  this.laja, this.lebu, this.losAlamos , this.losAngeles, this.lota, this.mulchen, this.nacimiento, 
  //                                  this.negrete, this.penco, this.quilaco, this.quilleco, this.sanPedroDeLaPaz, this.sanRosendo, this.santaBarbara,
  //                                  this.santaJuana, this.talcahuano, this.tirua , this.tome, this.tucapel, this.yumbel];
  // public pieChartType: ChartType = 'pie';
  // public pieChartColors: any[] = [{ backgroundColor: ["#04b962", "#ff8800", "#14b6ff", "#94614f", "#7934f3", "#4A235A", "#2874A6",
  //                                                     "#117864", "#3498DB", "#F1948A", "#EDBB99", "#F4D03F", "#F0B27A", "#186A3B",
  //                                                     "#A93226", "#F39C12", "#AED6F1", "#A6ACAF", "#F6DDCC", "#EBDEF0", "#2C3E50",
  //                                                     "#ee82ee", "#ffa500", "#ff0000", "#5F4C0B", "#084B8A", "#6A0888", "#E6E6E6",
  //                                                     "#F7819F", "#210B61", "#58FAF4", "#00FFBF", "#14b6ff"
                                                      
  //                                                     ], 
  //                                   borderWidth: [0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] }];
  // public pieChartOptions: any = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   legend: {
  //     position :"right",	
  //     display: true,
  //       labels: {
  //       fontColor: '#585757',  
  //       boxWidth:15
  //       }
  //   },
  
  // };

  // @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild(ApexCharts) chart?: ApexCharts;

  constructor(private firebaseSer: FirebaseService,
              private http: HttpClient) { }

  ngOnInit() 
  {
    /* if(this.desactivado === true){
      this.chart?.ngOnDestroy();
    } */
    this.obtenerRutasCompletadas();
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }
  
  async ngOnDestroy(){
   /* if(this.desactivado == true){
      this.chart?.update();
      this.pieChartData = [13, 120, 11, 20];
    }else{
      this.chart?.update();
      this.pieChartData = [121, 10, 11, 220];
    } */

    this.options = {
      chart: {
          height: 480,
          type: 'pie',
          foreColor: '#4e4e4e',
         
      },
      dataLabels: {
          enabled: true,
          style:{
            colors: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
            fontSize: '13px',
            fontFamily: 'Helvetica',
            fontWeight:'0px'
          },
          textAnchor: 'start',
          borderWith: [0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          background:{
            borderWith: [0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
          } 
      },
      series: [this.comunaArray[0].peso,  this.comunaArray[1].peso,  this.comunaArray[2].peso,   this.comunaArray[3].peso, this.comunaArray[4].peso, this.comunaArray[5].peso,
               this.comunaArray[6].peso,  this.comunaArray[7].peso , this.comunaArray[8].peso,   this.comunaArray[9].peso, this.comunaArray[10].peso, this.comunaArray[11].peso, this.comunaArray[12].peso,
               this.comunaArray[13].peso, this.comunaArray[14].peso, this.comunaArray[15].peso , this.comunaArray[16].peso,this.comunaArray[17].peso, this.comunaArray[18].peso, this.comunaArray[19].peso, 
               this.comunaArray[20].peso, this.comunaArray[21].peso, this.comunaArray[22].peso,  this.comunaArray[23].peso,this.comunaArray[24].peso, this.comunaArray[25].peso, this.comunaArray[26].peso,
               this.comunaArray[27].peso, this.comunaArray[28].peso, this.comunaArray[29].peso , this.comunaArray[30].peso,this.comunaArray[31].peso, this.comunaArray[32].peso],

      colors: ["#04b962", "#ff8800", "#14b6ff", "#94614f", "#7934f3", "#4A235A", "#2874A6",
      "#117864", "#3498DB", "#F1948A", "#EDBB99", "#F4D03F", "#F0B27A", "#186A3B",
      "#A93226", "#F39C12", "#AED6F1", "#A6ACAF", "#F6DDCC", "#EBDEF0", "#2C3E50",
      "#ee82ee", "#ffa500", "#ff0000", "#5F4C0B", "#084B8A", "#6A0888", "#E6E6E6",
      "#F7819F", "#210B61", "#58FAF4", "#00FFBF", "#14b6ff"],

      labels: [this.comunaArray[0].nombre,  this.comunaArray[1].nombre,  this.comunaArray[2].nombre,   this.comunaArray[3].nombre, this.comunaArray[4].nombre, this.comunaArray[5].nombre,
               this.comunaArray[6].nombre,  this.comunaArray[7].nombre , this.comunaArray[8].nombre,   this.comunaArray[9].nombre, this.comunaArray[10].nombre, this.comunaArray[11].nombre, this.comunaArray[12].nombre,
               this.comunaArray[13].nombre, this.comunaArray[14].nombre, this.comunaArray[15].nombre , this.comunaArray[16].nombre,this.comunaArray[17].nombre, this.comunaArray[18].nombre, this.comunaArray[19].nombre, 
               this.comunaArray[20].nombre, this.comunaArray[21].nombre, this.comunaArray[22].nombre,  this.comunaArray[23].nombre,this.comunaArray[24].nombre, this.comunaArray[25].nombre, this.comunaArray[26].nombre,
               this.comunaArray[27].nombre, this.comunaArray[28].nombre, this.comunaArray[29].nombre , this.comunaArray[30].nombre,this.comunaArray[31].nombre, this.comunaArray[32].nombre],

      borderWith: [0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      background:{
        borderWith: [0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      }, 

      legend: {
        customLegendItems:[this.comunaArray[0].nombre,  this.comunaArray[1].nombre,  this.comunaArray[2].nombre,   this.comunaArray[3].nombre, this.comunaArray[4].nombre, this.comunaArray[5].nombre,
        this.comunaArray[6].nombre,  this.comunaArray[7].nombre , this.comunaArray[8].nombre,   this.comunaArray[9].nombre, this.comunaArray[10].nombre, this.comunaArray[11].nombre, this.comunaArray[12].nombre,
        this.comunaArray[13].nombre, this.comunaArray[14].nombre, this.comunaArray[15].nombre , this.comunaArray[16].nombre,this.comunaArray[17].nombre, this.comunaArray[18].nombre, this.comunaArray[19].nombre, 
        this.comunaArray[20].nombre, this.comunaArray[21].nombre, this.comunaArray[22].nombre,  this.comunaArray[23].nombre,this.comunaArray[24].nombre, this.comunaArray[25].nombre, this.comunaArray[26].nombre,
        this.comunaArray[27].nombre, this.comunaArray[28].nombre, this.comunaArray[29].nombre , this.comunaArray[30].nombre,this.comunaArray[31].nombre, this.comunaArray[32].nombre],
        
        position: 'right',
        
        formatter: function(abc:any, opts:any) {
            return abc + " - " + opts.w.globals.series[opts.seriesIndex] + ' Tons'
        }
      },
      // responsive: [{
        
      //     breakpoint: 480,
      //     options: {
      //         chart: {
      //             height: 330
      //         },
      //         legend: {
      //             position: 'bottom'
      //         }
      //     }
      // }]
  
    }

    await this.chart?.destroy();

    this.chart = new ApexCharts(
      document.querySelector("#chart-comuna"),
      this.options
    );
    await this.chart?.render();



    // this.options = {
    //   chart: {
    //       height: 300,
    //       type: 'pie',
    //       foreColor: '#4e4e4e',
    //   },
    //   dataLabels: {
    //       enabled: true,
    //       style:{
    //         colors: ["#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"],
    //         fontSize: '13px',
    //         fontFamily: 'Helvetica',
    //         fontWeight:'0px'
    //       },
    //       textAnchor: 'start' 
    //   },
    //   series: [this.altoBioBio, this.antuco, this.arauco, this.cabrero, this.canete, this.chiguayante,
    //     this.concepcion, this.contulmo , this.coronel, this.curanilahue, this.florida, this.hualpen, this.hualqui,
    //     this.laja, this.lebu, this.losAlamos , this.losAngeles, this.lota, this.mulchen, this.nacimiento, 
    //     this.negrete, this.penco, this.quilaco, this.quilleco, this.sanPedroDeLaPaz, this.sanRosendo, this.santaBarbara,
    //     this.santaJuana, this.talcahuano, this.tirua , this.tome, this.tucapel, this.yumbel],

    //   colors: ["#04b962", "#ff8800", "#14b6ff", "#94614f", "#7934f3", "#4A235A", "#2874A6",
    //   "#117864", "#3498DB", "#F1948A", "#EDBB99", "#F4D03F", "#F0B27A ", "#186A3B",
    //   "#A93226", "#F39C12", "#AED6F1", "#A6ACAF", "#F6DDCC", "#EBDEF0", "#2C3E50",
    //   "#ee82ee", "#ffa500", "#ff0000", "#5F4C0B", "#084B8A", "#6A0888", "#E6E6E6",
    //   "#F7819F", "#210B61", "#58FAF4", "#00FFBF", "#14b6ff"],

    //   labels: ["Alto Bío-Bío", "Antuco", "Arauco","Cabrero", "Cañete", "Chiguayante", 
    //   "Concepción", "Contulmo", "Coronel", "Curanilahue", 
    //   "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", 
    //   "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco",
    //   "San Pedro De La Paz", "San Rosendo", "Santa Bárbara" , "Santa Juana", "Talcahuano",
    //   "Tirúa", "Tomé", "Tucapel", "Yumbel"],

    //   legend: {
    //     customLegendItems:["Alto Bío-Bío", "Antuco", "Arauco","Cabrero", "Cañete", "Chiguayante", 
    //     "Concepción", "Contulmo", "Coronel", "Curanilahue", 
    //     "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", 
    //     "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco",
    //     "San Pedro De La Paz", "San Rosendo", "Santa Bárbara" , "Santa Juana", "Talcahuano",
    //     "Tirúa", "Tomé", "Tucapel", "Yumbel"],
        
    //     formatter: function(abc:any, opts:any) {
    //         return abc + " - " + opts.w.globals.series[opts.seriesIndex]
    //     }
    //   },
    //   responsive: [{
    //       breakpoint: 480,
    //       options: {
    //           chart: {
    //               height: 330
    //           },
    //           legend: {
    //               position: 'bottom'
    //           }
    //       }
    //   }]
  
    // }

    // this.pieChartData = [this.altoBioBio, this.antuco, this.arauco, this.cabrero, this.canete, this.chiguayante,
    //   this.concepcion, this.contulmo , this.coronel, this.curanilahue, this.florida, this.hualpen, this.hualqui,
    //   this.laja, this.lebu, this.losAlamos , this.losAngeles, this.lota, this.mulchen, this.nacimiento, 
    //   this.negrete, this.penco, this.quilaco, this.quilleco, this.sanPedroDeLaPaz, this.sanRosendo, this.santaBarbara,
    //   this.santaJuana, this.talcahuano, this.tirua , this.tome, this.tucapel, this.yumbel];
    // this.pieChartOptions = {
    //   responsive: true,
    //   maintainAspectRatio: true,
    //   legend: {
    //     position :"right",	
    //     display: true,
    //       labels: {
    //       fontColor: '#585757',  
    //       boxWidth:15
    //       }
    //   },
    //   animation: {
    //     animateScale: false,
    //     animateRotate: true,
    //     duration: 500,
    //     easing: 'linear'
    //   }
      
    // }
    // this.chart?.update();
  }


  async obtenerRutasCompletadas()
  {
   await this.firebaseSer.getRutasCompletadas().then(
     async data =>
      {
        this.dathax = data;
        // 2020/04/27
        // 27/04/2020
        // 2020-04-27
        // 27-04-2020
        // console.log(data);
        let largo = Object.keys(this.dathax).length;
        // console.log('Largo:' + largo);
         for (let i = 1; i < largo; i++) {
          let date = new Date().getFullYear();
          // console.log(date)
          // console.log(this.dathax[i].timestamp.slice(0,4))
          if(date == this.dathax[i].timestamp.slice(0,4) )
          {
            this.harray.push(this.dathax[i])
            let pet =  parseFloat(this.dathax[i].kilosreciclaje1);
            let pead = parseFloat(this.dathax[i].kilosreciclaje2);
            let pebd = parseFloat(this.dathax[i].kilosreciclaje3);
            let carton = parseFloat(this.dathax[i].kilosreciclaje4);
            let latas = parseFloat(this.dathax[i].kilosreciclaje5);
          
            //se suman las cantidades para asignarselas a su comuna correspondiente
            let total = pet + pead + pebd + carton + latas;
            //traspasamos lng y lat desde BD
            let lng = this.dathax[i].l[0];
            let lat = this.dathax[i].l[1];
          
            // console.log(` lng: ${lng} | lat: ${lat}`);
            await this.getAdress(lat,lng, total, pet, pead, pebd, carton, latas);

            }else{
            // console.log('Nel perro' +this.dathax[i].timestamp)
            }          
          
          
          
          //console.log(total);
          //npm install mapbox-gl --save
          //npm i --save-dev @types/mapbox-gl
          //https://www.youtube.com/watch?v=3p7YyVwUli8&ab_channel=exelfer
          //https://www.youtube.com/watch?v=Vs5TfSMy3uA&list=PLCKuOXG0bPi0RHirEQB7GJgpfW-Q5m-Xu&index=9&ab_channel=FernandoHerrera
          //https://www.youtube.com/watch?v=EwZUQuPjakg&ab_channel=SteveGriffith-Prof3ssorSt3v3
          //https://www.youtube.com/watch?v=H7gZ2hEjwuI&ab_channel=SteveGriffith-Prof3ssorSt3v3
          // console.log('Lat:' + lat + ' '+ 'Lng:' + lng);
          //https://docs.mapbox.com/playground/geocoding/?search_text=-73.16250608333128,-36.998693016330655&country=cl&limit=1&types=place%2Cpostcode%2Caddress&language=es
          
         
       

        }

        
        
      }
    )

    //INICIO ORDENAR COMUNA
    this.comunaArray  = [
      {
        nombre: 'Alto Bío-Bío',
        peso: this.altoBioBio
      },
      {
        nombre: 'Antuco',
        peso: this.antuco
      },
      {
        nombre: 'Arauco',
        peso: this.arauco
      },
      {
        nombre: 'Cabrero',
        peso: this.cabrero
      },
      {
        nombre: 'Cañete',
        peso: this.canete
      },
      {
        nombre: 'Chiguayante',
        peso: this.chiguayante
      },
      {
        nombre: 'Concepción',
        peso: this.concepcion
      },
      {
        nombre: 'Contulmo',
        peso: this.contulmo
      },
      {
        nombre: 'Coronel',
        peso: this.coronel
      },
      {
        nombre: 'Curanilahue',
        peso: this.curanilahue
      },
      {
        nombre: 'Florida',
        peso: this.florida
      },
      {
        nombre: 'Hualpén',
        peso: this.hualpen
      },
      {
        nombre: 'Hualqui',
        peso: this.hualqui
      },
      {
        nombre: 'Laja',
        peso: this.laja
      },
      {
        nombre: 'Lebu',
        peso: this.lebu
      },
      {
        nombre: 'Los Álamos',
        peso: this.losAlamos
      },
      {
        nombre: 'Los Ángeles',
        peso: this.losAngeles
      },
      {
        nombre: 'Lota',
        peso: this.lota
      },
      {
        nombre: 'Mulchén',
        peso: this.mulchen
      },
      {
        nombre: 'Nacimiento',
        peso: this.nacimiento
      },
      {
        nombre: 'Negrete',
        peso: this.negrete
      },
      {
        nombre: 'Penco',
        peso: this.penco
      },
      {
        nombre: 'Quilaco',
        peso: this.quilaco
      },
      {
        nombre: 'Quilleco',
        peso: this.quilleco
      },
      {
        nombre: 'San Pedro De La Paz',
        peso: this.sanPedroDeLaPaz
      },
      {
        nombre: 'San Rosendo',
        peso: this.sanRosendo
      },
      {
        nombre: 'Santa Bárbara',
        peso: this.santaBarbara
      },
      {
        nombre: 'Santa Juana',
        peso: this.santaJuana
      },
      {
        nombre: 'Talcahuano',
        peso: this.talcahuano
      },
      {
        nombre: 'Tirúa',
        peso: this.tirua
      },
      {
        nombre: 'Tomé',
        peso: this.tome
      },
      {
        nombre: 'Tucapel',
        peso: this.tucapel
      },
      {
        nombre: 'Yumbel',
        peso: this.yumbel
      }
    ];

    this.comunaArray.sort((a,b) =>(b.peso - a.peso));

    this.comunaArray.forEach( element =>
      {
        element.peso = Math.round(((element.peso/1000) + Number.EPSILON) * 100) / 100;
        // this.comunaLabels.push(element.nombre)
      })

      this.Toplabel1 = this.comunaArray[0].nombre

    // console.log(this.comunaArray);


    //FIN ORDENAR COMUNA

    //pasar datos de tabla excell a tons
    //alto Bío-Bío
    this.OAltobiobio.pet = Math.round(((this.OAltobiobio.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAltobiobio.pead = Math.round(((this.OAltobiobio.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAltobiobio.pebd = Math.round(((this.OAltobiobio.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAltobiobio.carton = Math.round(((this.OAltobiobio.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAltobiobio.aluminio = Math.round(((this.OAltobiobio.aluminio/1000) + Number.EPSILON) * 1000) / 1000;
    this.altoBioBio    = Math.round(((this.altoBioBio/1000) + Number.EPSILON) * 1000) / 1000;

    //antuco
    this.OAntuco.pet = Math.round(((this.OAntuco.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAntuco.pead = Math.round(((this.OAntuco.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAntuco.pebd = Math.round(((this.OAntuco.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAntuco.carton = Math.round(((this.OAntuco.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAntuco.aluminio = Math.round(((this.OAntuco.aluminio/1000) + Number.EPSILON) * 1000) / 1000;
    this.antuco =  this.OAntuco.pet + this.OAntuco.pead + this.OAntuco.pebd + this.OAntuco.carton +this.OAntuco.aluminio;
    this.antuco  = Math.round(((this.antuco) + Number.EPSILON) * 1000) / 1000;

    //arauco
    this.OArauco.pet  = Math.round(((this.OArauco.pet /1000) + Number.EPSILON) * 1000) / 1000;
    this.OArauco.pead = Math.round((( this.OArauco.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OArauco.pebd = Math.round((( this.OArauco.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OArauco.carton = Math.round((( this.OArauco.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OArauco.aluminio = Math.round((( this.OArauco.aluminio /1000) + Number.EPSILON) * 1000) / 1000;
    this.arauco = this.OArauco.pet + this.OArauco.pead + this.OArauco.pebd + this.OArauco.carton + this.OArauco.aluminio;
    this.arauco  = Math.round((( this.arauco) + Number.EPSILON) * 1000) / 1000;

    //cabrero
    this.OCabrero.pet = Math.round(((this.OCabrero.pet /1000) + Number.EPSILON) * 1000) / 1000;
    this.OCabrero.pead = Math.round((( this.OCabrero.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OCabrero.pebd = Math.round((( this.OCabrero.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OCabrero.carton = Math.round((( this.OCabrero.carton/1000) + Number.EPSILON) * 1000) / 1000;;
    this.OCabrero.aluminio = Math.round((( this.OCabrero.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.cabrero = this.OCabrero.pet+  this.OCabrero.pead + this.OCabrero.pebd + this.OCabrero.carton +this.OCabrero.aluminio;
    this.cabrero = Math.round((( this.cabrero) + Number.EPSILON) * 1000) / 1000;

    //canete
    this.OCanete.pet = Math.round((( this.OCanete.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OCanete.pead = Math.round((( this.OCanete.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OCanete.pebd = Math.round((( this.OCanete.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OCanete.carton = Math.round(((this.OCanete.carton /1000) + Number.EPSILON) * 1000) / 1000;
    this.OCanete.aluminio = Math.round((( this.OCanete.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.canete = this.OCanete.pet + this.OCanete.pead + this.OCanete.pebd + this.OCanete.carton + this.OCanete.aluminio;
    this.canete = Math.round((( this.canete) + Number.EPSILON) * 1000) / 1000;

    //chiguayante
    this.OChiguayante.pet = Math.round((( this.OChiguayante.pet /1000) + Number.EPSILON) * 1000) / 1000;
    this.OChiguayante.pead = Math.round((( this.OChiguayante.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OChiguayante.pebd = Math.round((( this.OChiguayante.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OChiguayante.carton = Math.round((( this.OChiguayante.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OChiguayante.aluminio = Math.round((( this.OChiguayante.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.chiguayante = this.OChiguayante.pet + this.OChiguayante.pead + this.OChiguayante.pebd + this.OChiguayante.carton + this.OChiguayante.aluminio;
    this.chiguayante = Math.round((( this.chiguayante) + Number.EPSILON) * 1000) / 1000;

    //concepcion
    this.OConcepcion.pet = Math.round((( this.OConcepcion.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OConcepcion.pead  = Math.round((( this.OConcepcion.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OConcepcion.pebd = Math.round((( this.OConcepcion.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OConcepcion.carton = Math.round((( this.OConcepcion.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OConcepcion.aluminio = Math.round((( this.OConcepcion.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.concepcion  = this.OConcepcion.pet + this.OConcepcion.pead +  this.OConcepcion.pebd + this.OConcepcion.carton + this.OConcepcion.aluminio;
    this.concepcion  = Math.round((( this.concepcion) + Number.EPSILON) * 1000) / 1000;

    //contulmo
    this.OContulmo.pet = Math.round((( this.OContulmo.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OContulmo.pead = Math.round((( this.OContulmo.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OContulmo.pebd = Math.round((( this.OContulmo.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OContulmo.carton = Math.round((( this.OContulmo.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OContulmo.aluminio = Math.round((( this.OContulmo.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.contulmo = this.OContulmo.pet + this.OContulmo.pead + this.OContulmo.pebd + this.OContulmo.carton + this.OContulmo.aluminio;
    this.contulmo = Math.round((( this.contulmo) + Number.EPSILON) * 1000) / 1000;
    
    //coronel
    this.OCoronel.pet = Math.round((( this.OCoronel.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OCoronel.pead = Math.round((( this.OCoronel.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OCoronel.pebd = Math.round((( this.OCoronel.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OCoronel.carton = Math.round((( this.OCoronel.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OCoronel.aluminio = Math.round((( this.OCoronel.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.coronel = this.OCoronel.pet + this.OCoronel.pead + this.OCoronel.pebd + this.OCoronel.carton  + this.OCoronel.aluminio;
    this.coronel = Math.round(((this.coronel) + Number.EPSILON) * 1000) / 1000;
    
    //curanilahue
    this.OCuranilahue.pet = Math.round((( this.OCuranilahue.pet /1000) + Number.EPSILON) * 1000) / 1000;
    this.OCuranilahue.pead = Math.round((( this.OCuranilahue.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OCuranilahue.pebd = Math.round(((this.OCuranilahue.pebd /1000) + Number.EPSILON) * 1000) / 1000;
    this.OCuranilahue.carton = Math.round((( this.OCuranilahue.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OCuranilahue.aluminio = Math.round((( this.OCuranilahue.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.curanilahue = this.OCuranilahue.pet  + this.OCuranilahue.pead + this.OCuranilahue.pebd + this.OCuranilahue.carton +this.OCuranilahue.aluminio;
    this.curanilahue = Math.round((( this.curanilahue) + Number.EPSILON) * 1000) / 1000;

    //florida
    this.OFlorida.pet = Math.round(((  this.OFlorida.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OFlorida.pead = Math.round((( this.OFlorida.pead /1000) + Number.EPSILON) * 1000) / 1000;
    this.OFlorida.pebd = Math.round(((  this.OFlorida.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OFlorida.carton = Math.round((( this.OFlorida.carton /1000) + Number.EPSILON) * 1000) / 1000;
    this.OFlorida.aluminio = Math.round(((  this.OFlorida.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.florida =this.OFlorida.pet + this.OFlorida.pead + this.OFlorida.pebd + this.OFlorida.carton + this.OFlorida.aluminio;
    this.florida = Math.round(((  this.florida) + Number.EPSILON) * 1000) / 1000;

    //hualpen
    this.OHualpen.pet = Math.round((( this.OHualpen.pet /1000) + Number.EPSILON) * 1000) / 1000;
    this.OHualpen.pead = Math.round(((  this.OHualpen.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OHualpen.pebd = Math.round(((  this.OHualpen.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OHualpen.carton = Math.round(((  this.OHualpen.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OHualpen.aluminio = Math.round(((  this.OHualpen.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.hualpen  =this.OHualpen.pet + this.OHualpen.pead + this.OHualpen.pebd + this.OHualpen.carton + this.OHualpen.aluminio;
    this.hualpen  = Math.round(((  this.hualpen) + Number.EPSILON) * 1000) / 1000;

    //hualqui
    this.OHualqui.pet = Math.round(((  this.OHualqui.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OHualqui.pead = Math.round(((  this.OHualqui.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OHualqui.pebd = Math.round((( this.OHualqui.pebd /1000) + Number.EPSILON) * 1000) / 1000;
    this.OHualqui.carton = Math.round(((  this.OHualqui.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OHualqui.aluminio = Math.round(((  this.OHualqui.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.hualqui  = this.OHualqui.pet + this.OHualqui.pead + this.OHualqui.pebd + this.OHualqui.carton + this.OHualqui.aluminio;
    this.hualqui  = Math.round(((  this.hualqui) + Number.EPSILON) * 1000) / 1000;

    //laja
    this.OLaja.pet = Math.round((( this.OLaja.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OLaja.pead  = Math.round((( this.OLaja.pead /1000) + Number.EPSILON) * 1000) / 1000;
    this.OLaja.pebd = Math.round((( this.OLaja.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OLaja.carton = Math.round((( this.OLaja.carton /1000) + Number.EPSILON) * 1000) / 1000;
    this.OLaja.aluminio = Math.round((( this.OLaja.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.laja =  this.OLaja.pet + this.OLaja.pead + this.OLaja.pebd + this.OLaja.carton + this.OLaja.aluminio;
    this.laja = Math.round((( this.laja) + Number.EPSILON) * 1000) / 1000;
    
    //lebu
    this.OLebu.pet = Math.round((( this.OLebu.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OLebu.pead = Math.round((( this.OLebu.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OLebu.pebd = Math.round((( this.OLebu.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OLebu.carton = Math.round(((  this.OLebu.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OLebu.aluminio = Math.round((( this.OLebu.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.lebu  = this.OLebu.pet + this.OLebu.pead + this.OLebu.pebd + this.OLebu.carton + this.OLebu.aluminio;
    this.lebu  = Math.round((( this.lebu) + Number.EPSILON) * 1000) / 1000;

    //Los alamos
    this.OAlamos.pet = Math.round((( this.OAlamos.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAlamos.pead = Math.round((( this.OAlamos.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAlamos.pebd = Math.round((( this.OAlamos.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAlamos.carton = Math.round((( this.OAlamos.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAlamos.aluminio = Math.round((( this.OAlamos.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.losAlamos  = this.OAlamos.pet + this.OAlamos.pead + this.OAlamos.pebd + this.OAlamos.carton + this.OAlamos.aluminio;
    this.losAlamos  = Math.round((( this.losAlamos) + Number.EPSILON) * 1000) / 1000;

    //los angeles
    this.OAngeles.pet = Math.round((( this.OAngeles.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAngeles.pead = Math.round((( this.OAngeles.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAngeles.pebd = Math.round((( this.OAngeles.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAngeles.carton = Math.round((( this.OAngeles.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OAngeles.aluminio = Math.round((( this.OAngeles.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.losAngeles = this.OAngeles.pet + this.OAngeles.pead + this.OAngeles.pebd + this.OAngeles.carton + this.OAngeles.aluminio;
    this.losAngeles = Math.round((( this.losAngeles) + Number.EPSILON) * 1000) / 1000;

    //lota
    this.OLota.pet  = Math.round((( this.OLota.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OLota.pead = Math.round((( this.OLota.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OLota.pebd = Math.round((( this.OLota.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OLota.carton = Math.round((( this.OLota.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OLota.aluminio = Math.round((( this.OLota.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.lota = this.OLota.pet + this.OLota.pead + this.OLota.pebd + this.OLota.carton + this.OLota.aluminio;
    this.lota = Math.round((( this.lota) + Number.EPSILON) * 1000) / 1000;
    
    //mulchen
    this.OMulchen.pet = Math.round(((this.OMulchen.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OMulchen.pead = Math.round(((this.OMulchen.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OMulchen.pebd = Math.round(((this.OMulchen.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OMulchen.carton = Math.round(((this.OMulchen.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OMulchen.aluminio = Math.round(((this.OMulchen.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.mulchen = this.OMulchen.pet + this.OMulchen.pead + this.OMulchen.pebd + this.OMulchen.carton + this.OMulchen.aluminio;
    this.mulchen = Math.round(((this.mulchen) + Number.EPSILON) * 1000) / 1000;

    //nacimiento
    this.ONacimiento.pet = Math.round((( this.ONacimiento.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.ONacimiento.pead = Math.round((( this.ONacimiento.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.ONacimiento.pebd = Math.round((( this.ONacimiento.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.ONacimiento.carton = Math.round((( this.ONacimiento.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.ONacimiento.aluminio = Math.round((( this.ONacimiento.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.nacimiento = this.ONacimiento.pet + this.ONacimiento.pead + this.ONacimiento.pebd + this.ONacimiento.carton + this.ONacimiento.aluminio;
    this.nacimiento = Math.round((( this.nacimiento) + Number.EPSILON) * 1000) / 1000;

    //negrete
    this.ONegrete.pet = Math.round(((this.ONegrete.pet /1000) + Number.EPSILON) * 1000) / 1000;
    this.ONegrete.pead = Math.round((( this.ONegrete.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.ONegrete.pebd = Math.round((( this.ONegrete.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.ONegrete.carton = Math.round((( this.ONegrete.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.ONegrete.aluminio  = Math.round((( this.ONegrete.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.negrete = this.ONegrete.pet + this.ONegrete.pead + this.ONegrete.pebd + this.ONegrete.carton + this.ONegrete.aluminio;
    this.negrete = Math.round(((this.negrete) + Number.EPSILON) * 1000) / 1000;
    
    //penco
    this.OPenco.pet = Math.round((( this.OPenco.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OPenco.pead = Math.round((( this.OPenco.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OPenco.pebd = Math.round((( this.OPenco.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OPenco.carton = Math.round((( this.OPenco.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OPenco.aluminio = Math.round((( this.OPenco.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.penco  = this.OPenco.pet + this.OPenco.pead + this.OPenco.pebd + this.OPenco.carton + this.OPenco.aluminio;
    this.penco  = Math.round(((this.penco) + Number.EPSILON) * 1000) / 1000;

    //quilaco
    this.OQuilaco.pet = Math.round((( this.OQuilaco.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OQuilaco.pead = Math.round((( this.OQuilaco.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OQuilaco.pebd = Math.round((( this.OQuilaco.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OQuilaco.carton = Math.round((( this.OQuilaco.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OQuilaco.aluminio = Math.round((( this.OQuilaco.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.quilaco = this.OQuilaco.pet + this.OQuilaco.pead + this.OQuilaco.pebd + this.OQuilaco.carton + this.OQuilaco.aluminio;
    this.quilaco = Math.round((( this.quilaco) + Number.EPSILON) * 1000) / 1000;
    
    //quilleco
    this.OQuilleco.pet = Math.round((( this.OQuilleco.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OQuilleco.pead = Math.round((( this.OQuilleco.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OQuilleco.pebd = Math.round((( this.OQuilleco.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OQuilleco.carton = Math.round((( this.OQuilleco.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OQuilleco.aluminio = Math.round((( this.OQuilleco.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.quilleco = this.OQuilleco.pet + this.OQuilleco.pead + this.OQuilleco.pebd + this.OQuilleco.carton + this.OQuilleco.aluminio;
    this.quilleco = Math.round((( this.quilleco) + Number.EPSILON) * 1000) / 1000;

    //Sam pedro
    this.OSanpedro.pet = Math.round((( this.OSanpedro.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OSanpedro.pead = Math.round((( this.OSanpedro.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OSanpedro.pebd = Math.round((( this.OSanpedro.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OSanpedro.carton = Math.round((( this.OSanpedro.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OSanpedro.aluminio  = Math.round((( this.OSanpedro.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.sanPedroDeLaPaz = this.OSanpedro.pet + this.OSanpedro.pead + this.OSanpedro.pebd + this.OSanpedro.carton + this.OSanpedro.aluminio;
    this.sanPedroDeLaPaz = Math.round((( this.sanPedroDeLaPaz) + Number.EPSILON) * 1000) / 1000;
    
    //San rosendo
    this.ORosendo.pet = Math.round(((this.ORosendo.pet /1000) + Number.EPSILON) * 1000) / 1000;
    this.ORosendo.pead = Math.round((( this.ORosendo.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.ORosendo.pebd = Math.round(((this.ORosendo.pebd /1000) + Number.EPSILON) * 1000) / 1000;
    this.ORosendo.carton = Math.round((( this.ORosendo.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.ORosendo.aluminio = Math.round((( this.ORosendo.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.sanRosendo = this.ORosendo.pet + this.ORosendo.pead + this.ORosendo.pebd + this.ORosendo.carton + this.ORosendo.aluminio;
    this.sanRosendo = Math.round((( this.sanRosendo) + Number.EPSILON) * 1000) / 1000;

    //barbara
    this.OBarbara.pet = Math.round((( this.OBarbara.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OBarbara.pead = Math.round((( this.OBarbara.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OBarbara.pebd = Math.round((( this.OBarbara.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OBarbara.carton = Math.round((( this.OBarbara.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OBarbara.aluminio = Math.round((( this.OBarbara.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.santaBarbara = this.OBarbara.pet + this.OBarbara.pead + this.OBarbara.pebd + this.OBarbara.carton +  this.OBarbara.aluminio;
    this.santaBarbara = Math.round((( this.santaBarbara) + Number.EPSILON) * 1000) / 1000;
    
      //saint johana
    this.OJuana.pet = Math.round(((this.OJuana.pet /1000) + Number.EPSILON) * 1000) / 1000;
    this.OJuana.pead  = Math.round((( this.OJuana.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OJuana.pebd = Math.round(((this.OJuana.pebd /1000) + Number.EPSILON) * 1000) / 1000;
    this.OJuana.carton = Math.round((( this.OJuana.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OJuana.aluminio = Math.round((( this.OJuana.aluminio /1000) + Number.EPSILON) * 1000) / 1000;

    this.santaJuana = this.OJuana.pet + this.OJuana.pead +this.OJuana.pebd + this.OJuana.carton + this.OJuana.aluminio;
    this.santaJuana = Math.round((( this.santaJuana) + Number.EPSILON) * 1000) / 1000;

    //talca huanooo oOOOO
    this.OTalcahuano.pet  = Math.round((( this.OTalcahuano.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTalcahuano.pead = Math.round((( this.OTalcahuano.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTalcahuano.pebd = Math.round((( this.OTalcahuano.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTalcahuano.carton = Math.round((( this.OTalcahuano.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTalcahuano.aluminio = Math.round((( this.OTalcahuano.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.talcahuano = this.OTalcahuano.pet + this.OTalcahuano.pead + this.OTalcahuano.pebd + this.OTalcahuano.carton + this.OTalcahuano.aluminio;
    this.talcahuano = Math.round((( this.talcahuano) + Number.EPSILON) * 1000) / 1000;
    
    //tiru AA
    this.OTirua.pet = Math.round((( this.OTirua.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTirua.pead  = Math.round((( this.OTirua.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTirua.pebd = Math.round((( this.OTirua.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTirua.carton = Math.round((( this.OTirua.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTirua.aluminio = Math.round((( this.OTirua.aluminio /1000) + Number.EPSILON) * 1000) / 1000;

    this.tirua = this.OTirua.pet + this.OTirua.pead + this.OTirua.pebd + this.OTirua.carton +this.OTirua.aluminio;
    this.tirua = Math.round(((this.tirua) + Number.EPSILON) * 1000) / 1000;
    

    //tome
    this.OTome.pet = Math.round((( this.OTome.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTome.pead = Math.round((( this.OTome.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTome.pebd = Math.round((( this.OTome.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTome.carton = Math.round((( this.OTome.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTome.aluminio = Math.round((( this.OTome.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.tome = this.OTome.pet + this.OTome.pead + this.OTome.pebd + this.OTome.pebd + this.OTome.carton + this.OTome.aluminio;
    this.tome = Math.round((( this.tome) + Number.EPSILON) * 1000) / 1000;

    //tucapel
    this.OTucapel.pet = Math.round((( this.OTucapel.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTucapel.pead = Math.round((( this.OTucapel.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTucapel.pebd = Math.round((( this.OTucapel.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTucapel.carton = Math.round((( this.OTucapel.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OTucapel.aluminio = Math.round((( this.OTucapel.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.tucapel = this.OTucapel.pet + this.OTucapel.pead + this.OTucapel.pebd + this.OTucapel.carton + this.OTucapel.aluminio
    this.tucapel = Math.round((( this.tucapel) + Number.EPSILON) * 1000) / 1000;
    

    //yumbo
    this.OYumbel.pet = Math.round((( this.OYumbel.pet/1000) + Number.EPSILON) * 1000) / 1000;
    this.OYumbel.pead = Math.round((( this.OYumbel.pead/1000) + Number.EPSILON) * 1000) / 1000;
    this.OYumbel.pebd = Math.round((( this.OYumbel.pebd/1000) + Number.EPSILON) * 1000) / 1000;
    this.OYumbel.carton = Math.round((( this.OYumbel.carton/1000) + Number.EPSILON) * 1000) / 1000;
    this.OYumbel.aluminio = Math.round((( this.OYumbel.aluminio/1000) + Number.EPSILON) * 1000) / 1000;

    this.yumbel = this.OYumbel.pet + this.OYumbel.pead + this.OYumbel.pebd + this.OYumbel.carton + this.OYumbel.aluminio;
    this.yumbel = Math.round((( this.yumbel) + Number.EPSILON) * 1000) / 1000;
    await this.ngOnDestroy();
  }

  async getAdress(lng:any,lat:any, total:number,pet:number, pead:number, pebd:number, carton:number, latas:number)
  {
    //en la consulta primero va lng, lat
    //de la bd vienen lat,lng
    // let lng = '-73.023'
    // let lat = '-36.813'

    let api_key = 'pk.eyJ1IjoibHVpc20taXQiLCJhIjoiY2wzMHNjcHNuMXNnbzNicDJxZjJnMDgyNSJ9.977eW4ZB5TbbKJFgicE7Mg'
    await this.http.get<IGeocoderResult>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?country=cl&limit=1&types=place%2Cpostcode%2Caddress&language=es&access_token=${api_key}`)
    .toPromise()
    .then( (resp:any) => 
      {
      // console.log(resp.features[0].place_name)
      let adress = resp.features[0].place_name;
      let city = adress.split(",");
      //this.ciudad almacena el nombre de la comuna
     
      this.ciudad= city[1];
      //le quitamos el primer caracter a this.ciudad porque es un espacio
      this.ciudad = this.ciudad.substring(1);
      // console.log(this.ciudad + ' '+ this.ciudad.length)
      // console.log(total);
      // total = Math.round((total + Number.EPSILON) * 100) / 100;

      //comienza el ciclo de ifs
      if(this.ciudad == 'Alto Biobío')
      {
        this.altoBioBio += total;
        this.OAltobiobio.pet += pet;
        this.OAltobiobio.pead += pead;
        this.OAltobiobio.pebd += pebd;
        this.OAltobiobio.carton += carton;
        this.OAltobiobio.aluminio += latas;
        
      }
      
      if(this.ciudad == 'Antuco')
      {
        this.antuco += total;
        this.OAntuco.pet += pet;
        this.OAntuco.pead += pead;
        this.OAntuco.pebd += pebd;
        this.OAntuco.carton += carton;
        this.OAntuco.aluminio += latas;
      }

      if(this.ciudad == 'Arauco')
      {
        this.arauco += total;
        this.OArauco.pet += pet;
        this.OArauco.pead += pead;
        this.OArauco.pebd += pebd;
        this.OArauco.carton += carton;
        this.OArauco.aluminio += latas;
      }

      if(this.ciudad == 'Cabrero')
      {
        this.cabrero += total;
        this.OCabrero.pet += pet;
        this.OCabrero.pead += pead;
        this.OCabrero.pebd += pebd;
        this.OCabrero.carton += carton;
        this.OCabrero.aluminio += latas;
      }
      
      if(this.ciudad == 'Cañete' || this.ciudad == 'Canete')
      {
        this.canete += total;
        this.OCanete.pet += pet;
        this.OCanete.pead += pead;
        this.OCanete.pebd += pebd;
        this.OCanete.carton += carton;
        this.OCanete.aluminio += latas;
      }

      if(this.ciudad == 'Chiguayante')
      {
        this.chiguayante += total;
        this.OChiguayante.pet += pet;
        this.OChiguayante.pead += pead;
        this.OChiguayante.pebd += pebd;
        this.OChiguayante.carton += carton;
        this.OChiguayante.aluminio += latas;
      }

      if(this.ciudad == 'Concepción')
      {
        this.concepcion  += total;
        this.OConcepcion.pet += pet;
        this.OConcepcion.pead += pead;
        this.OConcepcion.pebd += pebd;
        this.OConcepcion.carton += carton;
        this.OConcepcion.aluminio += latas;
        
      }

      if(this.ciudad == 'Contulmo')
      {
        this.contulmo  += total;
        this.OContulmo.pet += pet;
        this.OContulmo.pead += pead;
        this.OContulmo.pebd += pebd;
        this.OContulmo.carton += carton;
        this.OContulmo.aluminio += latas;
      }

      if(this.ciudad == 'Coronel')
      {
        this.coronel  += total;
        this.OCoronel.pet += pet;
        this.OCoronel.pead += pead;
        this.OCoronel.pebd += pebd;
        this.OCoronel.carton += carton;
        this.OCoronel.aluminio += latas;
      }

      if(this.ciudad == 'Curanilahue')
      {
        this.curanilahue  += total;
        this.OCuranilahue.pet += pet;
        this.OCuranilahue.pead += pead;
        this.OCuranilahue.pebd += pebd;
        this.OCuranilahue.carton += carton;
        this.OCuranilahue.aluminio += latas;
      }

      if(this.ciudad == 'Florida')
      {
        this.florida  += total;
        this.OFlorida.pet += pet;
        this.OFlorida.pead += pead;
        this.OFlorida.pebd += pebd;
        this.OFlorida.carton += carton;
        this.OFlorida.aluminio += latas;
      }

      if(this.ciudad == 'Hualpén')
      {
        this.hualpen  += total;
        this.OHualpen.pet += pet;
        this.OHualpen.pead += pead;
        this.OHualpen.pebd += pebd;
        this.OHualpen.carton += carton;
        this.OHualpen.aluminio += latas;
      }

      if(this.ciudad == 'Hualqui')
      {
        this.hualqui  += total;
        this.OHualqui.pet += pet;
        this.OHualqui.pead += pead;
        this.OHualqui.pebd += pebd;
        this.OHualqui.carton += carton;
        this.OHualqui.aluminio += latas;
      }

      if(this.ciudad == 'Laja')
      {
        this.laja  += total;
        this.OLaja.pet += pet;
        this.OLaja.pead += pead;
        this.OLaja.pebd += pebd;
        this.OLaja.carton += carton;
        this.OLaja.aluminio += latas;
      }

      if(this.ciudad == 'Lebu')
      {
        this.lebu  += total;
        this.OLebu.pet += pet;
        this.OLebu.pead += pead;
        this.OLebu.pebd += pebd;
        this.OLebu.carton += carton;
        this.OLebu.aluminio += latas;
      }

      if(this.ciudad == 'Los Álamos' || this.ciudad == 'Los Alamos' )
      {
        this.losAlamos  += total;
        this.OAlamos.pet += pet;
        this.OAlamos.pead += pead;
        this.OAlamos.pebd += pebd;
        this.OAlamos.carton += carton;
        this.OAlamos.aluminio += latas;
      }

      if(this.ciudad == 'Los Ángeles' || this.ciudad == 'Los Ángeles')
      {
        this.losAngeles  += total;
        this.OAngeles.pet += pet;
        this.OAngeles.pead += pead;
        this.OAngeles.pebd += pebd;
        this.OAngeles.carton += carton;
        this.OAngeles.aluminio += latas;
      }
      
      if(this.ciudad == 'Lota')
      {
        this.lota  += total;
        this.OLota.pet += pet;
        this.OLota.pead += pead;
        this.OLota.pebd += pebd;
        this.OLota.carton += carton;
        this.OLota.aluminio += latas;
      }

      if(this.ciudad == 'Mulchén' || this.ciudad == 'Mulchen')
      {
        this.mulchen  += total;
        this.OMulchen.pet += pet;
        this.OMulchen.pead += pead;
        this.OMulchen.pebd += pebd;
        this.OMulchen.carton += carton;
        this.OMulchen.aluminio += latas;
      }

      if(this.ciudad == 'Nacimiento')
      {
        this.nacimiento  += total;
        this.ONacimiento.pet += pet;
        this.ONacimiento.pead += pead;
        this.ONacimiento.pebd += pebd;
        this.ONacimiento.carton += carton;
        this.ONacimiento.aluminio += latas;
      }

      if(this.ciudad == 'Negrete')
      {
        this.negrete  += total;
        this.ONegrete.pet += pet;
        this.ONegrete.pead += pead;
        this.ONegrete.pebd += pebd;
        this.ONegrete.carton += carton;
        this.ONegrete.aluminio += latas;
      }

      if(this.ciudad == 'Penco')
      {
        this.penco  += total;
        this.OPenco.pet += pet;
        this.OPenco.pead += pead;
        this.OPenco.pebd += pebd;
        this.OPenco.carton += carton;
        this.OPenco.aluminio += latas;
      }

      if(this.ciudad == 'Quilaco')
      {
        this.quilaco  += total;
        this.OQuilaco.pet += pet;
        this.OQuilaco.pead += pead;
        this.OQuilaco.pebd += pebd;
        this.OQuilaco.carton += carton;
        this.OQuilaco.aluminio += latas;
      }
      
      if(this.ciudad == 'Quilleco')
      {
        this.quilleco  += total;
        this.OQuilleco.pet += pet;
        this.OQuilleco.pead += pead;
        this.OQuilleco.pebd += pebd;
        this.OQuilleco.carton += carton;
        this.OQuilleco.aluminio += latas;
      }

      if(this.ciudad == 'San Pedro De La Paz' || this.ciudad == 'San Pedro de la Paz')
      {
        this.sanPedroDeLaPaz  += total;
        this.OSanpedro.pet += pet;
        this.OSanpedro.pead += pead;
        this.OSanpedro.pebd += pebd;
        this.OSanpedro.carton += carton;
        this.OSanpedro.aluminio += latas;
      }


      if(this.ciudad == 'San Rosendo')
      {
        this.sanRosendo  += total;
        this.ORosendo.pet += pet;
        this.ORosendo.pead += pead;
        this.ORosendo.pebd += pebd;
        this.ORosendo.carton += carton;
        this.ORosendo.aluminio += latas;
      }

      if(this.ciudad == 'Santa Bárbara' || this.ciudad == 'Santa Barbara')
      {
        this.santaBarbara  += total;
        this.OBarbara.pet += pet;
        this.OBarbara.pead += pead;
        this.OBarbara.pebd += pebd;
        this.OBarbara.carton += carton;
        this.OBarbara.aluminio += latas;
      }

      if(this.ciudad == 'Santa Juana')
      {
        this.santaJuana  += total;
        this.OJuana.pet += pet;
        this.OJuana.pead += pead;
        this.OJuana.pebd += pebd;
        this.OJuana.carton += carton;
        this.OJuana.aluminio += latas;
      }
      
      if(this.ciudad == 'Talcahuano')
      {
        this.talcahuano  += total;
        this.OTalcahuano.pet += pet;
        this.OTalcahuano.pead += pead;
        this.OTalcahuano.pebd += pebd;
        this.OTalcahuano.carton += carton;
        this.OTalcahuano.aluminio += latas;
      }

      if(this.ciudad == 'Tirúa' || this.ciudad == 'Tirua')
      {
        this.tirua  += total;
        this.OTirua.pet += pet;
        this.OTirua.pead += pead;
        this.OTirua.pebd += pebd;
        this.OTirua.carton += carton;
        this.OTirua.aluminio += latas;
      }

      if(this.ciudad == 'Tomé' || this.ciudad == 'Tome')
      {
        this.tome  += total;
        this.OTome.pet += pet;
        this.OTome.pead += pead;
        this.OTome.pebd += pebd;
        this.OTome.carton += carton;
        this.OTome.aluminio += latas;
      }

      if(this.ciudad == 'Tucapel')
      {
        this.tucapel  += total;
        this.OTucapel.pet += pet;
        this.OTucapel.pead += pead;
        this.OTucapel.pebd += pebd;
        this.OTucapel.carton += carton;
        this.OTucapel.aluminio += latas;
      }

      if(this.ciudad == 'Yumbel')
      {
        this.yumbel  += total;
        this.OYumbel.pet += pet;
        this.OYumbel.pead += pead;
        this.OYumbel.pebd += pebd;
        this.OYumbel.carton += carton;
        this.OYumbel.aluminio += latas;
      }
      
    })
   
  
  }


  generateExcel()
  {
    //le pasamos la id de la tabla al excel guy, imma right?
    let element = document.getElementById('comuna-table');
    const ws:XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    //yenereit workbuk an ad de workshit (worksheet)

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'sheet1');

    //guardamos el archivo
    XLSX.writeFile(wb, 'ReporteComuna.xlsx');
  }


}
