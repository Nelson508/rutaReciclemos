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
  //https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
  comunaArray: any = [
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
  harray: Array<Object> = [];

  harrison = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  altoBioBio:number = 0;
  antuco:number = 0;
  arauco:number = 0;
  cabrero:number =0;
  cañete: number=0;
  

 
  
  // Grafico Por Comuna
  public comunaChartLabels: string[] = ["Concepción", "Talcahuano", "Coronel", "Chuguayante","San Pedro de la paz"];
  public comunaChartData: number[] = [80, 30, 11, 20, 25];
  public comunaChartType: ChartType = 'pie';
  public comunaChartColors: any[] = [{ backgroundColor: ["#04b962", "#ff8800", "#14b6ff", "#94614f", "#7934f3"], borderWidth: [1, 1, 1, 1, 1] }];
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
  public personaChartData: number[] = [13, 30, 11, 20, 50];
  public personaChartColors: any[] = [{ backgroundColor: ["#7934f3", "#f43643", "#04b962", "#0a151f", "#ff8800"] ,
                                              borderWidth: [5, 5, 5, 5, 5]}];
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

   // barChart
   public barChartOptions: any = {
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
  public barChartLabels: string[] = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  public barChartType: ChartType  = 'bar';
  public barChartLegend = true;
  
  public barChartData: any[] = [
    { barPercentage: .5, data: [13, 20, 4, 18, 29, 25, 8], label: 'Google' },
    { barPercentage: .5, data: [31, 30, 6, 6, 21, 4, 11], label: 'Facebook' }
  ];
  
  public barChartColors: Array<any> = [
    
    {
      backgroundColor: "#04b962"
    },
    {
      backgroundColor: "#14b6ff"
    },
  ];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
  constructor(private firebaseSer: FirebaseService,
              private http: HttpClient) { }

  ngOnInit() {
    this.getComunas();
    
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }

  ngOnDestroy(){
   
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

    this.barChartOptions = {
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
            this.harray.push(this.dathax[i])
             
             let pet =  parseFloat(this.dathax[i].kilosreciclaje1);
             let pead = parseFloat(this.dathax[i].kilosreciclaje2);
             let pebd = parseFloat(this.dathax[i].kilosreciclaje3);
             let carton = parseFloat(this.dathax[i].kilosreciclaje4);
             let latas = parseFloat(this.dathax[i].kilosreciclaje5);
            // let pet =  parseFloat(this.harray[i].kilosreciclaje1);
            //  let pead = parseFloat(this.harray[i].kilosreciclaje2);
            //  let pebd = parseFloat(this.harray[i].kilosreciclaje3);
            //  let carton = parseFloat(this.harray[i].kilosreciclaje4);
            //  let latas = parseFloat(this.harray[i].kilosreciclaje5);
           
             //se suman las cantidades para asignarselas a su comuna correspondiente
             let total = pet + pead + pebd + carton + latas;
             //traspasamos lng y lat desde BD
             let lng = this.dathax[i].l[0];
             let lat = this.dathax[i].l[1];
            
            //  console.log(` lng: ${lng} | lat: ${lat}`);
             await this.getAdress(lat,lng, total);
             console.log(1)
             console.log(this.comunaArray);
 
             }else{
          
             }        
 
         }

        // this.harray.push(...this.dathax)
        // // this.harray.forEach((element: any) => {
        // //   console.log(element)
          
        // // });

        // console.log(this.harray)
        //  console.log('ordenar')
        console.log(2)
        console.log(this.comunaArray);
         await this.sortComunas();
        // let jurray = this.comunaArray.sort((a,b) =>  Number(b.peso) - Number(a.peso))
        // this.comunaArray.sort(this.sortComunas)
        // console.log(jurray);
    //     for( const value of this.comunaArray)
    // {
    //   console.log(value)
    // }https://jsonworld.com/demo/how-to-export-data-to-excel-file-in-angular-application
 
       }
     )
     
    

  }

  async getAdress(lng:any,lat:any, total:number)
  {
    //en la consulta primero va lng, lat
    //de la bd vienen lat,lng
    // let lng = '-73.023'
    // let lat = '-36.813'

    let api_key = 'pk.eyJ1IjoibHVpc20taXQiLCJhIjoiY2wzMHNjcHNuMXNnbzNicDJxZjJnMDgyNSJ9.977eW4ZB5TbbKJFgicE7Mg'
    this.http.get<IGeocoderResult>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?country=cl&limit=1&types=place%2Cpostcode%2Caddress&language=es&access_token=${api_key}`)
      .subscribe((resp:any) => {
        // console.log(resp.features[0].place_name)
        let adress = resp.features[0].place_name;
        let city = adress.split(",");
        //this.ciudad almacena el nombre de la comuna claudio gay 1, Talcahuano
        this.ciudad = city[1];
        //le quitamos el primer caracter a this.ciudad porque es un espacio
        this.ciudad = this.ciudad.substring(1);
        // console.log(this.ciudad + ' '+ this.ciudad.length)
        // console.log(total);
        total = Math.round((total));

        //comienza el ciclo de ifs
        if (this.ciudad == 'Alto Biobío') {
          this.comunaArray[0]['peso'] += total;
          this.harrison[0] += total;
          this.altoBioBio += total;

        }

        if (this.ciudad == 'Antuco') {
          this.comunaArray[1].peso += total;
          this.harrison[1] += total;
          this.antuco += total;
        }

        if (this.ciudad == 'Arauco') {
          this.comunaArray[2].peso += total;
          this.harrison[2] += total;
          this.arauco += total;
        }

        if (this.ciudad == 'Cabrero') {
          this.comunaArray[3].peso += total;
          this.harrison[3] += total;
          this.cabrero += total;
        }

        if (this.ciudad == 'Cañete' || this.ciudad == 'Canete') {
          this.comunaArray[4].peso += total;
          this.harrison[4] += total;
          this.cañete += total;
        }

        if (this.ciudad == 'Chiguayante') {
          this.comunaArray[5].peso += total;
          this.harrison[5] += total;
        }

        if (this.ciudad == 'Concepción') {
          this.comunaArray[6].peso += total;
          this.harrison[6] += total;

        }

        if (this.ciudad == 'Contulmo') {
          this.comunaArray[7].peso += total;
          this.harrison[7] += total;
        }

        if (this.ciudad == 'Coronel') {
          this.comunaArray[8].peso += total;
          this.harrison[8] += total;
        }

        if (this.ciudad == 'Curanilahue') {
          this.comunaArray[9].peso += total;
          this.harrison[9] += total;
        }

        if (this.ciudad == 'Florida') {
          this.comunaArray[10].peso += total;
          this.harrison[10] += total;
        }

        if (this.ciudad == 'Hualpén') {
          this.comunaArray[11].peso += total;
          this.harrison[11] += total;
        }

        if (this.ciudad == 'Hualqui') {
          this.comunaArray[12].peso += total;
          this.harrison[12] += total;
        }

        if (this.ciudad == 'Laja') {
          this.comunaArray[13].peso += total;
          this.harrison[13] += total;
        }

        if (this.ciudad == 'Lebu') {
          this.comunaArray[14].peso += total;
          this.harrison[14] += total;
        }

        if (this.ciudad == 'Los Álamos' || this.ciudad == 'Los Alamos') {
          this.comunaArray[15].peso += total;
          this.harrison[15] += total;
        }

        if (this.ciudad == 'Los Ángeles' || this.ciudad == 'Los Ángeles') {
          this.comunaArray[16].peso += total;
          this.harrison[16] += total;
        }

        if (this.ciudad == 'Lota') {
          this.comunaArray[17].peso += total;
          this.harrison[17] += total;
        }

        if (this.ciudad == 'Mulchén' || this.ciudad == 'Mulchen') {
          this.comunaArray[18].peso += total;
          this.harrison[18] += total;
        }

        if (this.ciudad == 'Nacimiento') {
          this.comunaArray[19].peso += total;
          this.harrison[19] += total;
        }

        if (this.ciudad == 'Negrete') {
          this.comunaArray[20].peso += total;
          this.harrison[20] += total;
        }

        if (this.ciudad == 'Penco') {
          this.comunaArray[21].peso += total;
          this.harrison[21] += total;
        }

        if (this.ciudad == 'Quilaco') {
          this.comunaArray[22].peso += total;
          this.harrison[22] += total;
        }

        if (this.ciudad == 'Quilleco') {
          this.comunaArray[23].peso += total;
          this.harrison[23] += total;
        }

        if (this.ciudad == 'San Pedro De La Paz' || this.ciudad == 'San Pedro de la Paz') {
          this.comunaArray[24].peso += total;
          this.harrison[24] += total;
        }


        if (this.ciudad == 'San Rosendo') {
          this.comunaArray[25].peso += total;
          this.harrison[25] += total;
        }

        if (this.ciudad == 'Santa Bárbara' || this.ciudad == 'Santa Barbara') {
          this.comunaArray[26].peso += total;
          this.harrison[26] += total;
        }

        if (this.ciudad == 'Santa Juana') {
          this.comunaArray[27].peso += total;
          this.harrison[27] += total;
        }

        if (this.ciudad == 'Talcahuano') {
          this.comunaArray[28].peso += total;
          this.harrison[28] += total;
        }

        if (this.ciudad == 'Tirúa' || this.ciudad == 'Tirua') {
          this.comunaArray[29].peso += total;
          this.harrison[29] += total;
        }

        if (this.ciudad == 'Tomé' || this.ciudad == 'Tome') {
          this.comunaArray[30].peso += total;
          this.harrison[30] += total;
        }

        if (this.ciudad == 'Tucapel') {
          this.comunaArray[31].peso += total;
          this.harrison[31] += total;
        }

        if (this.ciudad == 'Yumbel') {
          this.comunaArray[32].peso += total;
          this.harrison[32] += total;
        }

      })
    
   
  
  }

  async sortComunas()
  {
    // a traves de sort ordenamos el array de mayor a menor

    
     let arraycito = [
       {name: 'pepe',
        edad: 100
       },
       {name: 'Marcelo',
        edad: 20
       },
       {
        name: 'Julio',
        edad: 1
       },
       {
         name: 'sdfsdf',
         edad: 33
       },
       {
         name: 'asda',
         edad: 4
       }
     ]

    
     arraycito.sort((a,b) =>
    {
      return b.edad - a.edad;
    })

    console.log(arraycito)

    // this.sort((a,b) =>
    // {
    //   return b.edad - a.edad;
    // })
    
    // let ordenado = this.comunaArray.map(item => item).sort((a,b)=>a.peso-b.peso)
    let x= []
   
    
    // await console.log(this.altoBioBio);
    // // this.comunaArray.forEach(element => 
    // //   {
    // //     console.log(element.peso)
    // //   });
    await console.log(JSON.stringify(this.comunaArray[1]))
    // console.log(this.comunaArray)
    
    
   
    

  }

}
