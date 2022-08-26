import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FirebaseService} from '../../services/firebase.service';
import {HttpClient} from '@angular/common/http'
import { IGeocoderResult } from 'src/app/interfaces/interfaces';
import ApexCharts from 'apexcharts';


@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  @Input() desactivado:boolean = false;
  dathax:any;
  ciudad:string = '';
  //variable par mostrar current year en resument.html
  year = new Date().getFullYear();
  upload = false;

  /* Variables Puntos Limpios Fijos */
  nombrePuntoFijo: string[] = [];
  plasticos: number[] = [];
  latasAluminio: number[] = [];
  cartonPapel: number[] = [];

  comunaArray = [
    {
      nombre: 'Alto Bío-Bío',
      peso: 0
    },
    {
      nombre: 'Antuco',
      peso: 0
    },
    {
      nombre: 'Arauco',
      peso: 0
    },
    {
      nombre: 'Cabrero',
      peso: 0
    },
    {
      nombre: 'Cañete',
      peso: 0
    },
    {
      nombre: 'Chiguayante',
      peso: 0
    },
    {
      nombre: 'Concepción',
      peso: 0
    },
    {
      nombre: 'Contulmo',
      peso: 0
    },
    {
      nombre: 'Coronel',
      peso: 0
    },
    {
      nombre: 'Curanilahue',
      peso: 0
    },
    {
      nombre: 'Florida',
      peso: 0
    },
    {
      nombre: 'Hualpén',
      peso: 0
    },
    {
      nombre: 'Hualqui',
      peso: 0
    },
    {
      nombre: 'Laja',
      peso: 0
    },
    {
      nombre: 'Lebu',
      peso: 0
    },
    {
      nombre: 'Los Álamos',
      peso: 0
    },
    {
      nombre: 'Los Ángeles',
      peso: 0
    },
    {
      nombre: 'Lota',
      peso: 0
    },
    {
      nombre: 'Mulchén',
      peso: 0
    },
    {
      nombre: 'Nacimiento',
      peso: 0
    },
    {
      nombre: 'Negrete',
      peso: 0
    },
    {
      nombre: 'Penco',
      peso: 0
    },
    {
      nombre: 'Quilaco',
      peso: 0
    },
    {
      nombre: 'Quilleco',
      peso: 0
    },
    {
      nombre: 'San Pedro De La Paz',
      peso: 0
    },
    {
      nombre: 'San Rosendo',
      peso: 0
    },
    {
      nombre: 'Santa Bárbara',
      peso: 0
    },
    {
      nombre: 'Santa Juana',
      peso: 0
    },
    {
      nombre: 'Talcahuano',
      peso: 0
    },
    {
      nombre: 'Tirúa',
      peso: 0
    },
    {
      nombre: 'Tomé',
      peso: 0
    },
    {
      nombre: 'Tucapel',
      peso: 0
    },
    {
      nombre: 'Yumbel',
      peso: 0
    }
  ];
  //variables que muestran los valores en el TOp5 de comuna
  top1:number = 0;
  top2:number = 0;
  top3:number = 0;
  top4:number =0;
  top5: number=0;
  top6: number =0;

  topName1:string = '';
  topName2:string = '';
  topName3:string = '';
  topName4:string = '';
  topName5:string = '';

  

  PersonasPet: number = 0;
  PersonasPead: number = 0;
  PersonasPebd:number = 0;
  PersonasCarton:number = 0;
  PersonasLatas:number = 0;

  //variables para chart-genero
  Masculino: number = 0;
  Femenino: number = 0;
  No_especifica: number = 0;


/* Variables Reciclaje por Material */
  pet: number = 0;
  pead: number = 0;
  pebd:number = 0;
  carton:number = 0;
  latas:number = 0;


  /* Variables Rango etario
  GRUPO A: ENTRE 6 Y 14
  GRUPO B: ENTRE 15 Y 24
  GRUPO C: ENTRE 25 Y 34
  GRUPO D: ENTRE 35 Y 44
  GRUPO E: ENTRE 45 Y 54
  GRUPO F: ENTRE 55 Y 64
  GRUPO G: ENTRE 65 Y 150
  */

  A = {
    total: 0
  }

  B = {
    total: 0
  }

  C = {
    total: 0
  }

  D = {
    total: 0
  }

  E = {
    total: 0
  }

  F = {
    total: 0
  }

  G = {
    total: 0
  }
 
  // // Grafico Por Comuna
  public optionsComuna = {
    chart: {
        height: 480,
        type: 'pie',
        foreColor: '#4e4e4e',
    },
    dataLabels: {
        enabled: true,
        style:{
          colors: ["#000000", "#000000", "#000000","#000000", "#000000", "#000000"],
          fontSize: '15px',
          fontFamily: 'Helvetica',
          fontWeight:'0px'
        },
        
    },
    series: [this.top1, this.top2, this.top3, this.top4, this.top5, this.top6],
    colors: ["#04b962", "#ff8800", "#14b6ff", "#94614f", "#7934f3", "#505050"],
    labels: [this.topName1, this.topName2, this.topName3, this.topName4, this.topName5, "Otras comunas"],
    legend: {
      customLegendItems:[this.topName1, this.topName2, this.topName3, this.topName4, this.topName5, "Otras comunas"],
      
      formatter: function(abc:any, opts:any) {
          return abc + " - " + opts.w.globals.series[opts.seriesIndex]
      }
    },
    // responsive: [{
    //     breakpoint: 480,
    //     options: {
    //         chart: {
    //             height: 500
    //         },
    //         legend: {
    //             position: 'bottom'
    //         }
    //     }
    // }]

  }

  // Grafico por Material
  public optionsMateriales = {
    chart: {
        height: 280,
        type: 'donut',
        foreColor: '#4e4e4e',
    },
    dataLabels: {
        enabled: true,
        style:{
          colors: ["#000000", "#000000", "#000000", "#000000", "#000000"],
          fontSize: '15px',
          fontFamily: 'Helvetica',
          fontWeight:'0px'
        },
        textAnchor: 'start' 
    },
    series: [Math.round((this.pet + Number.EPSILON)*100)/100, Math.round((this.pead + Number.EPSILON)*100)/100, Math.round((this.pebd + Number.EPSILON)*100)/100, Math.round((this.carton + Number.EPSILON)*100)/100, Math.round((this.latas + Number.EPSILON)*100)/100],
    colors: ["#FFEA00", "#FDDA0D", "#DFFF00", "#0096FF", "#888888"],
    labels: ["Botellas PET", "Envases PEAD", "Envases PEBD", "Cartón y Papel", "Latas de aluminio"],
    legend: {
      customLegendItems:["Botellas PET", "Envases PEAD", "Envases PEBD", "Cartón y Papel", "Latas de aluminio"],
      
      formatter: function(abc:any, opts:any) {
          return abc + " - " + opts.w.globals.series[opts.seriesIndex]
      },
      position: 'bottom',
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

  // Grafico por Rango Etario
  public optionsEdad = {
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
    series: [this.A.total, this.B.total, this.C.total, this.D.total, this.E.total, this.F.total, this.G.total],
    colors: ["#04b962", "#ff8800", "#14b6ff", "#94614f", "#7934f3", "#4A235A", "#2874A6"],
    labels: ["De 6 a 14", "15 a 24", "25 a 34", "35 a 44", "45 a 54", "55 a 64", "65 ó más"],
    legend: {
      customLegendItems:["De 6 a 14", "15 a 24", "25 a 34", "35 a 44", "45 a 54", "55 a 64", "65 ó más"],
      
      formatter: function(abc:any, opts:any) {
          return abc + " - " + opts.w.globals.series[opts.seriesIndex] + "Kg"
      },
      position: 'bottom',
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
  
  // Grafico por Genero
  public optionsGenero = {
    chart: {
        height: 1000,
        type: 'donut',
        foreColor: '#4e4e4e',
    },
    dataLabels: {
        enabled: true,
        style:{
          colors: ["#000000","#000000","#000000"],
          fontSize: '10px',
          fontFamily: 'Helvetica',
          fontWeight:'0px'
        },
        
    },
    series: [this.Masculino, this.Femenino, this.No_especifica],
    colors: ["#7934f3", "#f43643", "#04b962"],
    labels: ["Masculino", "Femenino", "No especifica"],
    legend: {
      customLegendItems:["Masculino", "Femenino", "No especifica"],
      
      formatter: function(abc:any, opts:any) {
          return abc + " - " + opts.w.globals.series[opts.seriesIndex]
      },
      position: 'bottom',
    },
  }

  // Grafico puntos limpios
  public puntoLimpioChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      labels: {
      fontColor: '#585757',  
      boxWidth:40
      }
    },
    scales: {
      xAxes: [{
        
      ticks: {
        beginAtZero:true,
        fontColor: '#585757'
      },
      gridLines: {
        display: true ,
        color: "rgba(0, 0, 0, 0.07)"
      },
      
      }],
      
      yAxes: [{
        ticks: {
          beginAtZero:true,
          fontColor: '#585757'
        },
        gridLines: {
          display: true ,
          color: "rgba(0, 0, 0, 0.07)"
        },
        }]
        
    }
  
  };
  public puntoLimpioChartLabels: string[] = this.nombrePuntoFijo;
  public puntoLimpioChartType: ChartType  = 'bar';
  public puntoLimpioChartLegend = true;
  
  public puntoLimpioChartData: any[] = [
    { barPercentage: .5, data: this.plasticos, label: 'Plasticos' },
    { barPercentage: .5, data: this.cartonPapel, label: 'Cartón y Papel' },
    { barPercentage: .5, data: this.latasAluminio, label: 'Latas de aluminio' }
  ];
  
  public puntoLimpioChartColors: Array<any> = [
    
    {
      backgroundColor: "#FDDA0D"
    },
    {
      backgroundColor: "#0096FF"
    },
    {
      backgroundColor: "#888888"
    }
  ];

  // @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild(ApexCharts) chart?: ApexCharts;
  @ViewChild(ApexCharts) chart2?: ApexCharts;
  @ViewChild(ApexCharts) chartMaterial?: ApexCharts;
  @ViewChild(ApexCharts) chartEdad?: ApexCharts;
  
  constructor(private firebaseSer: FirebaseService,
              private http: HttpClient) { }

  async ngOnInit() {
    this.getComunas();
   
   this.infoPuntosFijos(); 

  //  await this.obtenerRutasCompletadas();
    
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  async ngOnDestroy(){
   
    
  }


  async getComunas()
  {
    //insertamos un loader spinner en HTML a traves de innerHTML;

    let loader = '<div id="loader" style="border: 16px solid #f3f3f3; border-radius: 50%; border-top: 16px solid blue; border-bottom: 16px solid blue; width: 120px; height: 120px; -webkit-animation: spin 2s linear infinite; animation: spin 2s linear infinite; margin-left: 32%;"></div> <p class="text-center pt-2">Cargando información...</p>';
    let loaderCol4 = '<div id="loader" style="border: 16px solid #f3f3f3; border-radius: 50%; border-top: 16px solid blue; border-bottom: 16px solid blue; width: 120px; height: 120px; -webkit-animation: spin 2s linear infinite; animation: spin 2s linear infinite; margin-left: 25%;"></div> <p class="text-center pt-2">Cargando información...</p>';
    const comuna = document.getElementById('comuna-render');
    const material = document.getElementById('material-render');
    const edad = document.getElementById('edad-render');
    const gender = document.getElementById('genero-render');
    const cleanPoints = document.getElementById('puntosLimpios-render');

    //debe ir dentro de if porque Sr typeScript no quiere nada indefinido
    if(comuna) comuna.innerHTML = loader;
    if(cleanPoints) cleanPoints.innerHTML = loader;
    if(material) material.innerHTML = loaderCol4;
    if(edad) edad.innerHTML = loaderCol4;
    if(gender) gender.innerHTML = loaderCol4;
    
    
    await this.firebaseSer.getRutasCompletadas().then(
      async data =>
       {
         this.dathax = data;
         let largo = Object.keys(this.dathax).length;
          for (let i = 1; i < largo; i++) 
          {
           let date = new Date().getFullYear();
         
           if(date == this.dathax[i].timestamp.slice(0,4) )
           {
             //sumamos la info para materiales
            this.pet +=  parseFloat(this.dathax[i].kilosreciclaje1);
            this.pead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.pebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.carton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.latas += parseFloat(this.dathax[i].kilosreciclaje5);

             //sumamos las cantidades totales para TIpo De material reciclado
            this.PersonasPet +=  parseFloat(this.dathax[i].kilosreciclaje1);
            this.PersonasPead += parseFloat(this.dathax[i].kilosreciclaje2);
            this.PersonasPebd += parseFloat(this.dathax[i].kilosreciclaje3);
            this.PersonasCarton += parseFloat(this.dathax[i].kilosreciclaje4);
            this.PersonasLatas += parseFloat(this.dathax[i].kilosreciclaje5);
            //restringimos a 2 decimales despues de la coma
            this.PersonasPet = Math.round((this.PersonasPet + Number.EPSILON) * 100) / 100;
            this.PersonasPead = Math.round(( this.PersonasPead+ Number.EPSILON) * 100) / 100;
            this.PersonasPebd = Math.round(( this.PersonasPebd+ Number.EPSILON) * 100) / 100;
            this.PersonasCarton = Math.round((this.PersonasCarton + Number.EPSILON) * 100) / 100;
            this.PersonasLatas = Math.round((this.PersonasLatas + Number.EPSILON) * 100) / 100;

            //se suman las cantidades para calcular el total que se asignara a su respectiva comuna
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
             await this.getAdress(lat,lng, total);

             //Comienzo de trabajo para chart-genero
             let element = this.dathax[i].id;
             console.log( this.dathax[i]);
             let genero = await this.infoGenero(element);

             if(genero == 'Masculino')
            {
              this.Masculino += total;
              this.Masculino = Math.round((this.Masculino + Number.EPSILON) * 100) / 100;

            } else if (genero == 'Femenino') 
            {
              this.Femenino += total;
              this.Femenino = Math.round(( this.Femenino+ Number.EPSILON) * 100) / 100;
              
            } else if(genero == 'No aplica') 
            {
              this.No_especifica += total;
              this.No_especifica = Math.round((this.No_especifica + Number.EPSILON) * 100) / 100;
            }

            /**** Comienzo de trabajo para chart-edad ***/
             //se consulta la edad desde la BD
             let dateBorn = await this.infoFechaNacimiento(element);
             let age = date - dateBorn.slice(6,10);

             if( age >=6 && age <=14)
            {
              // console.log("su edad esta entre 6 y 14");
              this.A.total += total;
              this.A.total = Math.round((this.A.total + Number.EPSILON) * 100) / 100;


            }

            //edad entre 15 y 24 anos
            if( age >=15 && age <=24)
            {
              this.B.total += total;
              this.B.total = Math.round((this.B.total + Number.EPSILON) * 100) / 100;
            }

            //edad entre 25 y 34 anos
            if( age >=25 && age <=34)
            {
              this.C.total += total;
              this.C.total = Math.round((this.C.total + Number.EPSILON) * 100) / 100;
            }

            //edad entre 35 y 44 anos 
            if( age >=35 && age <=44)
            {
              this.D.total += total;
              this.D.total = Math.round((this.D.total + Number.EPSILON) * 100) / 100;
            }

            //edad entre 45 y 54
            if( age >=45 && age <=54)
            {
              this.E.total += total;
              this.E.total = Math.round((this.E.total + Number.EPSILON) * 100) / 100;
            }

            //edad entre 55 y 64 anos
            if( age >=55 && age <=64)
            {
              this.F.total += total;
              this.F.total = Math.round((this.F.total + Number.EPSILON) * 100) / 100;
            }

            //edad entre 65 o mayor
            if( age >=65 && age <=150)
            {
              this.G.total += total;
              this.G.total = Math.round((this.G.total + Number.EPSILON) * 100) / 100;
            }


 
             }else{
          
             }        
 
         }
        //ordenamos el object array de mayor a menor
         this.comunaArray.sort((a,b) =>(b.peso - a.peso))
         
         this.top1 = this.comunaArray[0].peso;
         this.top2 = this.comunaArray[1].peso;
         this.top3 = this.comunaArray[2].peso;
         this.top4 = this.comunaArray[3].peso;
         this.top5 = this.comunaArray[4].peso;

         this.topName1 = this.comunaArray[0].nombre;
         this.topName2 = this.comunaArray[1].nombre;
         this.topName3 = this.comunaArray[2].nombre;
         this.topName4 = this.comunaArray[3].nombre;
         this.topName5 = this.comunaArray[4].nombre;
         
         for(let i=5; i < 33; i++ )
         {
           this.top6 += this.comunaArray[i].peso;
         }

 
       }
     )
    //INICIO Graficosd
    //instanciamos la id que recibira la info del grafico
    let ChargedComuna = '<div id="chart-comuna-resumen"></div>';
    let ChargedMaterial = '<div id="chart-material-resumen"></div>';
    let ChargedEdad = '<div id="chart-edad-resumen"></div>';
    let ChargedGender = '<div id="chart-genero-resumen"></div>';


    

    //cargamos ahora esa info
    if(comuna) comuna.innerHTML = ChargedComuna;
    if(material) material.innerHTML = ChargedMaterial;
    if(edad) edad.innerHTML = ChargedEdad;
    if(gender) gender.innerHTML = ChargedGender;


     // INICIO cosas de Comuna

     this.optionsComuna = {
      chart: {
          height: 480,
          type: 'pie',
          foreColor: '#4e4e4e',
      },
      dataLabels: {
          enabled: true,
          style:{
            colors: ["#000000", "#000000", "#000000","#000000", "#000000", "#000000"],
            fontSize: '15px',
            fontFamily: 'Helvetica',
            fontWeight:'0px'
          },
           
      },
      series: [Math.round(((this.top1 /1000) + Number.EPSILON)*100)/100, Math.round(((this.top2 /1000) + Number.EPSILON)*100)/100, Math.round(((this.top3 /1000) + Number.EPSILON)*100)/100, Math.round(((this.top4 /1000) + Number.EPSILON)*100)/100, Math.round(((this.top5 /1000) + Number.EPSILON)*100)/100,Math.round(((this.top6 /1000) + Number.EPSILON)*100)/100],
      colors: ["#04b962", "#ff8800", "#14b6ff", "#94614f", "#7934f3", "#505050"],
      labels: [this.topName1, this.topName2, this.topName3, this.topName4, this.topName5, "Otras comunas"],
      legend: {
        customLegendItems:[this.topName1, this.topName2, this.topName3, this.topName4, this.topName5, "Otras comunas"],
        
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

    //fin cosas de comuna

    //inicio cositas de genero
    this.optionsGenero = {
      chart: {
          height: 480,
          type: 'donut',
          foreColor: '#4e4e4e',
      },
      dataLabels: {
          enabled: true,
          style:{
            colors: ["#000000", "#000000", "#000000"],
            fontSize: '15px',
            fontFamily: 'Helvetica',
            fontWeight:'0px'
          },
         
      },
      series: [ Math.round(((this.Masculino /1000) + Number.EPSILON)*100)/100,  Math.round(((this.Femenino /1000) + Number.EPSILON)*100)/100, Math.round(((this.No_especifica /1000) + Number.EPSILON)*100)/100],
      colors: ["#7934f3", "#f43643", "#04b962"],
      labels: ["Masculino", "Femenino", "No especifica"],
      legend: {
        customLegendItems:["Masculino", "Femenino", "No especifica"],
        
        formatter: function(abc:any, opts:any) {
            // return opts.w.globals.series[opts.seriesIndex]
            return abc + " - " + opts.w.globals.series[opts.seriesIndex] + ' Tons'
        },
        position: 'bottom',
      },
    }

    //fin cositas de genero

    //inicio opciones de mamteriales
    this.optionsMateriales = {
      chart: {
          height: 480,
          type: 'donut',
          foreColor: '#4e4e4e',
      },
      dataLabels: {
          enabled: true,
          style:{
            colors: ["#000000", "#000000", "#000000", "#000000", "#000000"],
            fontSize: '15px',
            fontFamily: 'Helvetica',
            fontWeight:'0px'
          },
          textAnchor: 'start' 
      },
      series: [Math.round(((this.pet/1000) + Number.EPSILON)*100)/100, Math.round(((this.pead/1000) + Number.EPSILON)*100)/100, Math.round(((this.pebd/1000) + Number.EPSILON)*100)/100, Math.round(((this.carton/1000) + Number.EPSILON)*100)/100, Math.round(((this.latas/1000) + Number.EPSILON)*100)/100],
      colors: ["#FFEA00", "#FDDA0D", "#DFFF00", "#0096FF", "#888888"],
      labels: ["Botellas PET", "Envases PEAD", "Envases PEBD", "Cartón y Papel", "Latas de aluminio"],
      legend: {
        customLegendItems:["Botellas PET", "Envases PEAD", "Envases PEBD", "Cartón y Papel", "Latas de aluminio"],
        
        formatter: function(abc:any, opts:any) {
            return abc + " - " + opts.w.globals.series[opts.seriesIndex] + " Tons"
        },
        position: 'bottom',
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

    //fin opciones de mamteriales
    
    //inicio opciones rango etario
    this.optionsEdad = {
      chart: {
          height: 480,
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
        },
        position: 'bottom',
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

    //fin opciones rango etario
    
    
    //genero
    this.chart2?.destroy();
    this.chart2 = new ApexCharts(
      document.querySelector("#chart-genero-resumen"),
      this.optionsGenero
    );
    await this.chart2?.render();

    //comuna
    this.chart?.destroy();
    this.chart = new ApexCharts(
      document.querySelector("#chart-comuna-resumen"),
      this.optionsComuna
    );
   await this.chart?.render();

   //material
    this.chartMaterial?.destroy();
    this.chartMaterial = new ApexCharts(
      document.querySelector("#chart-material-resumen"),
      this.optionsMateriales
    );
    await this.chartMaterial?.render();

    //edad
    this.chartEdad?.destroy();

    this.chartEdad = new ApexCharts(
      document.querySelector("#chart-edad-resumen"),
      this.optionsEdad
    );

    this.chartEdad?.render();
     
    this.puntoLimpioChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        labels: {
        fontColor: '#585757',  
        boxWidth:40
        }
      },
      scales: {
        xAxes: [{
          
        ticks: {
          beginAtZero:true,
          fontColor: '#585757'
        },
        gridLines: {
          display: true ,
          color: "rgba(0, 0, 0, 0.07)"
        },
        
        }],
        
        yAxes: [{
          ticks: {
            beginAtZero:true,
            fontColor: '#585757'
          },
          gridLines: {
            display: true ,
            color: "rgba(0, 0, 0, 0.07)"
          },
          }]
         
      },
      animation: {
        animateScale: true,
        animateRotate: false,
        duration: 500,
        easing: 'linear'
      }
    
    };

    //FIn graficos
  }

  async getAdress(lng:any,lat:any, total:number): Promise<any>
  {
    //en la consulta primero va lng, lat
    //de la bd vienen lat,lng

    let api_key = 'pk.eyJ1IjoibHVpc20taXQiLCJhIjoiY2wzMHNjcHNuMXNnbzNicDJxZjJnMDgyNSJ9.977eW4ZB5TbbKJFgicE7Mg'
    return this.http.get<IGeocoderResult>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?country=cl&limit=1&types=place%2Cpostcode%2Caddress&language=es&access_token=${api_key}`)
      .toPromise()  
      .then((resp:any) => {
        let adress = resp.features[0].place_name;
        let city = adress.split(",");
        //this.ciudad almacena el nombre de la comuna claudio gay 1, Talcahuano
        this.ciudad = city[1];
        //le quitamos el primer caracter a this.ciudad porque es un espacio
        this.ciudad = this.ciudad.substring(1);
        total = Math.round((total));

        //comienza el ciclo de ifs
        if (this.ciudad == 'Alto Biobío') {
          this.comunaArray[0]['peso'] += total;
        }

        if (this.ciudad == 'Antuco') {
          this.comunaArray[1].peso += total;      
        }

        if (this.ciudad == 'Arauco') {
          this.comunaArray[2].peso += total;   
        }

        if (this.ciudad == 'Cabrero') {
          this.comunaArray[3].peso += total; 
        }

        if (this.ciudad == 'Cañete' || this.ciudad == 'Canete') {
          this.comunaArray[4].peso += total;        
        }

        if (this.ciudad == 'Chiguayante') {
          this.comunaArray[5].peso += total;
        }

        if (this.ciudad == 'Concepción') {
          this.comunaArray[6].peso += total;
        }

        if (this.ciudad == 'Contulmo') {
          this.comunaArray[7].peso += total;
        }

        if (this.ciudad == 'Coronel') {
          this.comunaArray[8].peso += total;
        }

        if (this.ciudad == 'Curanilahue') {
          this.comunaArray[9].peso += total;
        }

        if (this.ciudad == 'Florida') {
          this.comunaArray[10].peso += total;
        }

        if (this.ciudad == 'Hualpén') {
          this.comunaArray[11].peso += total;
        }

        if (this.ciudad == 'Hualqui') {
          this.comunaArray[12].peso += total;
        }

        if (this.ciudad == 'Laja') {
          this.comunaArray[13].peso += total;
        }

        if (this.ciudad == 'Lebu') {
          this.comunaArray[14].peso += total;
        }

        if (this.ciudad == 'Los Álamos' || this.ciudad == 'Los Alamos') {
          this.comunaArray[15].peso += total;
        }

        if (this.ciudad == 'Los Ángeles' || this.ciudad == 'Los Ángeles') {
          this.comunaArray[16].peso += total;
        }

        if (this.ciudad == 'Lota') {
          this.comunaArray[17].peso += total;
        }

        if (this.ciudad == 'Mulchén' || this.ciudad == 'Mulchen') {
          this.comunaArray[18].peso += total;
        }

        if (this.ciudad == 'Nacimiento') {
          this.comunaArray[19].peso += total;
        }

        if (this.ciudad == 'Negrete') {
          this.comunaArray[20].peso += total;
        }

        if (this.ciudad == 'Penco') {
          this.comunaArray[21].peso += total;
        }

        if (this.ciudad == 'Quilaco') {
          this.comunaArray[22].peso += total;
        }

        if (this.ciudad == 'Quilleco') {
          this.comunaArray[23].peso += total;
        }

        if (this.ciudad == 'San Pedro De La Paz' || this.ciudad == 'San Pedro de la Paz') {
          this.comunaArray[24].peso += total;
        }
        if (this.ciudad == 'San Rosendo') {
          this.comunaArray[25].peso += total;
        }

        if (this.ciudad == 'Santa Bárbara' || this.ciudad == 'Santa Barbara') {
          this.comunaArray[26].peso += total;
        }

        if (this.ciudad == 'Santa Juana') {
          this.comunaArray[27].peso += total;
        }

        if (this.ciudad == 'Talcahuano') {
          this.comunaArray[28].peso += total;
        }

        if (this.ciudad == 'Tirúa' || this.ciudad == 'Tirua') {
          this.comunaArray[29].peso += total;
        }

        if (this.ciudad == 'Tomé' || this.ciudad == 'Tome') {
          this.comunaArray[30].peso += total;
        }

        if (this.ciudad == 'Tucapel') {
          this.comunaArray[31].peso += total;
        }

        if (this.ciudad == 'Yumbel') {
          this.comunaArray[32].peso += total;
        }

      })
  }
  
  async infoPuntosFijos(){
    await this.firebaseSer.getPuntosFijos().then( async data =>
      {
        // const cleanPoints = document.getElementById('puntosLimpios-render');
        // const ChargedCleanPoins = '<canvas baseChart [datasets]="puntoLimpioChartData" [labels]="puntoLimpioChartLabels" [options]="puntoLimpioChartOptions" [colors]="puntoLimpioChartColors" [legend]="puntoLimpioChartLegend" [chartType]="puntoLimpioChartType" (chartHover)="chartHovered($event)" (chartClick)="chartClicked($event)"></canvas>';
        // if(cleanPoints) cleanPoints.innerHTML = ChargedCleanPoins;
        let largo = Object.keys(data).length;    
        for (let i = 0; i < largo; i++) {

          this.nombrePuntoFijo.push(data[i].nombre);
          this.plasticos.push(data[i].fijo_punto_plasticos);
          this.latasAluminio.push(data[i].fijo_punto_latas);
          this.cartonPapel.push(data[i].fijo_punto_carton);
        } 
      });

  }

  infoGenero(id:any) {
    return this.firebaseSer.getGenero(id);
  }

  infoFechaNacimiento(id:any)
  {
    return this.firebaseSer.getFechaNacimiento(id);
  }

}
