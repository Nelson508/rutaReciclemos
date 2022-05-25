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
  //                                                     "#117864", "#3498DB", "#F1948A", "#EDBB99", "#F4D03F", "#F0B27A ", "#186A3B",
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
          height: 1400,
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
      series: [this.altoBioBio, this.antuco, this.arauco, this.cabrero, this.canete, this.chiguayante,
        this.concepcion, this.contulmo , this.coronel, this.curanilahue, this.florida, this.hualpen, this.hualqui,
        this.laja, this.lebu, this.losAlamos , this.losAngeles, this.lota, this.mulchen, this.nacimiento, 
        this.negrete, this.penco, this.quilaco, this.quilleco, this.sanPedroDeLaPaz, this.sanRosendo, this.santaBarbara,
        this.santaJuana, this.talcahuano, this.tirua , this.tome, this.tucapel, this.yumbel],

      colors: ["#04b962", "#ff8800", "#14b6ff", "#94614f", "#7934f3", "#4A235A", "#2874A6",
      "#117864", "#3498DB", "#F1948A", "#EDBB99", "#F4D03F", "#F0B27A ", "#186A3B",
      "#A93226", "#F39C12", "#AED6F1", "#A6ACAF", "#F6DDCC", "#EBDEF0", "#2C3E50",
      "#ee82ee", "#ffa500", "#ff0000", "#5F4C0B", "#084B8A", "#6A0888", "#E6E6E6",
      "#F7819F", "#210B61", "#58FAF4", "#00FFBF", "#14b6ff"],

      labels: ["Alto Bío-Bío", "Antuco", "Arauco","Cabrero", "Cañete", "Chiguayante", 
      "Concepción", "Contulmo", "Coronel", "Curanilahue", 
      "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", 
      "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco",
      "San Pedro De La Paz", "San Rosendo", "Santa Bárbara" , "Santa Juana", "Talcahuano",
      "Tirúa", "Tomé", "Tucapel", "Yumbel"],

      borderWith: [0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      background:{
        borderWith: [0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      }, 

      legend: {
        customLegendItems:["Alto Bío-Bío", "Antuco", "Arauco","Cabrero", "Cañete", "Chiguayante", 
        "Concepción", "Contulmo", "Coronel", "Curanilahue", 
        "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", 
        "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco",
        "San Pedro De La Paz", "San Rosendo", "Santa Bárbara" , "Santa Juana", "Talcahuano",
        "Tirúa", "Tomé", "Tucapel", "Yumbel"],
        
        formatter: function(abc:any, opts:any) {
            return abc + " - " + opts.w.globals.series[opts.seriesIndex]
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
    .subscribe( resp => 
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
      total = Math.round((total + Number.EPSILON) * 100) / 100;

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
    console.log('hello');
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
