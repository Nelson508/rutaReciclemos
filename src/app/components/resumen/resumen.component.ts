import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FirebaseService} from '../../services/firebase.service';
import {HttpClient} from '@angular/common/http'
import { IGeocoderResult } from 'src/app/interfaces/interfaces';


@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  @Input() desactivado:boolean = false;
  dathax:any;
  ciudad:string = '';

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
  

 
  
  // // Grafico Por Comuna
  // public comunaChartLabels: string[] = [this.comunaArray[0].nombre, this.comunaArray[1].nombre, this.comunaArray[2].nombre, this.comunaArray[3].nombre, this.comunaArray[4].nombre, "Otras comunas"];
  public comunaChartLabels: string[] = [this.topName1, this.topName2, this.topName3, this.topName4, this.topName5, "Otras comunas"];
  public comunaChartData: number[] = [this.top1, this.top2, this.top3, this.top4, this.top5, this.top6];
  public comunaChartType: ChartType = 'pie';
  public comunaChartColors: any[] = [{ backgroundColor: ["#04b962", "#ff8800", "#14b6ff", "#94614f", "#7934f3", "#505050"], borderWidth: [1, 1, 1, 1, 1,1] }];
  public comunaChartOptions: any = {
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

  // Grafico por Personas
  public personaChartLabels: string[] = ["Botellas PET", "Envases PEAD", "Envases PEBD", "Cartón y Papel", "Latas de aluminio"];
  public personaChartData: number[] = [this.PersonasPet, this.PersonasPead, this.PersonasPebd, this.PersonasCarton, this.PersonasLatas];
  public personaChartColors: any[] = [{ backgroundColor: ["#FFEA00", "#FDDA0D", "#DFFF00", "#0096FF", "#888888"] ,
                                              borderWidth: [0,0,0,0,0]}];
  public personaChartType: ChartType = 'doughnut';
  public personaChartOptions: any = {
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

  // Grafico por Rango Etario
  public edadChartLabels: string[] = ["Menores de 18", "18 - 26", "27 - 59", "Mayores de 60"];
  public edadChartData: number[] = [13, 120, 11, 20];
  public edadChartType: ChartType = 'pie';
  public edadChartColors: any[] = [{ backgroundColor: ["#04b962", "#ff8800", "#14b6ff", "#94614f"], borderWidth: [0, 0, 0, 0] }];
  public edadChartOptions: any = {
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

  
  // Grafico por Genero
  public generoChartLabels: string[] = ["Masculino", "Femenino", "No especifica"];
  public generoChartData: number[] = [13, 20, 11];
  public generoChartColors: any[] = [{ backgroundColor: ["#7934f3", "#f43643", "#04b962"] ,
                                              borderWidth: [3, 3, 3]}];
  public generoChartType: ChartType = 'doughnut';
  public generoChartOptions: any = {
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

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  constructor(private firebaseSer: FirebaseService,
              private http: HttpClient) { }

  async ngOnInit() {
    this.getComunas();
   await  this.ngOnDestroy();
   this.infoPuntosFijos(); 
    
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  ngOnDestroy(){
    // INICIO cosas de Comuna
    this.comunaChartData = [this.top1, this.top2, this.top3, this.top4, this.top5, this.top6];
    this.comunaChartLabels = [this.topName1, this.topName2, this.topName3, this.topName4, this.topName5, "Otras comunas"];
    
    this.comunaChartOptions = {
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
      animation: {
        animateScale: false,
        animateRotate: true,
        duration: 500,
        easing: 'linear'
      }
      
    }
    // FIN cosas de Comuna

    this.personaChartData = [this.PersonasPet, this.PersonasPead, this.PersonasPebd, this.PersonasCarton, this.PersonasLatas];
    this.personaChartOptions = {
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
      animation: {
        animateScale: false,
        animateRotate: true,
        duration: 500,
        easing: 'linear'
      }
      
    }

    this.edadChartOptions = {
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
      animation: {
        animateScale: false,
        animateRotate: true,
        duration: 500,
        easing: 'linear'
      }
      
    }

    this.generoChartOptions = {
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
      animation: {
        animateScale: false,
        animateRotate: true,
        duration: 500,
        easing: 'linear'
      }
      
    }

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
    
    this.chart?.update();
  }


  async getComunas()
  {

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
          // console.log(this.top6 +'+'+ this.comunaArray[i].peso);
           this.top6 += this.comunaArray[i].peso;
         }

 
       }
     )
     
    
    this.ngOnDestroy();
  }

  async getAdress(lng:any,lat:any, total:number): Promise<any>
  {
    //en la consulta primero va lng, lat
    //de la bd vienen lat,lng
    // let lng = '-73.023'
    // let lat = '-36.813'

    let api_key = 'pk.eyJ1IjoibHVpc20taXQiLCJhIjoiY2wzMHNjcHNuMXNnbzNicDJxZjJnMDgyNSJ9.977eW4ZB5TbbKJFgicE7Mg'
    return this.http.get<IGeocoderResult>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?country=cl&limit=1&types=place%2Cpostcode%2Caddress&language=es&access_token=${api_key}`)
      .toPromise()  
      .then((resp:any) => {
        // console.log(resp.features[0].place_name)
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

        let largo = Object.keys(data).length;

        console.log(largo)
        
        for (let i = 0; i < largo; i++) {

          this.nombrePuntoFijo.push(data[i].nombre);
          this.plasticos.push(data[i].fijo_punto_plasticos);
          this.latasAluminio.push(data[i].fijo_punto_latas);
          this.cartonPapel.push(data[i].fijo_punto_carton);

          console.log(data[i]);
        }

        console.log(this.nombrePuntoFijo);
        console.log(this.plasticos);
        console.log(this.latasAluminio);
        console.log(this.cartonPapel);
        
      });
  }

}
