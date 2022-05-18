import { Component,Input, OnInit, ViewChild} from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {FirebaseService} from '../../services/firebase.service';
import {HttpClient} from '@angular/common/http'
import { IGeocoderResult } from 'src/app/interfaces/interfaces';
import * as XLSX from 'xlsx';

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

  //Comunas que almacenan valor;
  altoBioBio:number = 0;
  antuco:number = 0;
  arauco:number = 0;
  cabrero:number =0;
  cañete: number=0;
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



  

  // Pie
  public pieChartLabels: string[] = ["Alto Bío-Bío", "Antuco", "Arauco","Cabrero", "Cañete", "Chiguayante", 
                                      "Concepción", "Contulmo", "Coronel", "Curanilahue", 
                                      "Florida", "Hualpén", "Hualqui", "Laja", "Lebu", "Los Álamos", "Los Ángeles", 
                                      "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilaco", "Quilleco",
                                      "San Pedro De La Paz", "San Rosendo", "Santa Bárbara" , "Santa Juana", "Talcahuano",
                                      "Tirúa", "Tomé", "Tucapel", "Yumbel"
                                    ];
  public pieChartData: number[] = [this.altoBioBio, this.antuco, this.arauco, this.cabrero, this.cañete, this.chiguayante,
                                   this.concepcion, this.contulmo , this.coronel, this.curanilahue, this.florida, this.hualpen, this.hualqui,
                                   this.laja, this.lebu, this.losAlamos , this.losAngeles, this.lota, this.mulchen, this.nacimiento, 
                                   this.negrete, this.penco, this.quilaco, this.quilleco, this.sanPedroDeLaPaz, this.sanRosendo, this.santaBarbara,
                                   this.santaJuana, this.talcahuano, this.tirua , this.tome, this.tucapel, this.yumbel];
  public pieChartType: ChartType = 'pie';
  public pieChartColors: any[] = [{ backgroundColor: ["#04b962", "#ff8800", "#14b6ff", "#94614f", "#7934f3", "#4A235A", "#2874A6",
                                                      "#117864", "#3498DB", "#F1948A", "#EDBB99", "#F4D03F", "#F0B27A ", "#186A3B",
                                                      "#A93226", "#F39C12", "#AED6F1", "#A6ACAF", "#F6DDCC", "#EBDEF0", "#2C3E50",
                                                      "#ee82ee", "#ffa500", "#ff0000", "#5F4C0B", "#084B8A", "#6A0888", "#E6E6E6",
                                                      "#F7819F", "#210B61", "#58FAF4", "#00FFBF", "#000"
                                                      
                                                      ], 
                                    borderWidth: [0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] }];
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
    },
  
  };

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
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
  
  ngOnDestroy(){
   /* if(this.desactivado == true){
      this.chart?.update();
      this.pieChartData = [13, 120, 11, 20];
    }else{
      this.chart?.update();
      this.pieChartData = [121, 10, 11, 220];
    } */
    this.pieChartData = [this.altoBioBio, this.antuco, this.arauco, this.cabrero, this.cañete, this.chiguayante,
      this.concepcion, this.contulmo , this.coronel, this.curanilahue, this.florida, this.hualpen, this.hualqui,
      this.laja, this.lebu, this.losAlamos , this.losAngeles, this.lota, this.mulchen, this.nacimiento, 
      this.negrete, this.penco, this.quilaco, this.quilleco, this.sanPedroDeLaPaz, this.sanRosendo, this.santaBarbara,
      this.santaJuana, this.talcahuano, this.tirua , this.tome, this.tucapel, this.yumbel];
    this.pieChartOptions = {
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
            await this.getAdress(lat,lng, total);

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
  }

  async getAdress(lng:any,lat:any, total:number)
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
      total = Math.round((total + Number.EPSILON) * 100) / 100

      //comienza el ciclo de ifs
      if(this.ciudad == 'Alto Biobío')
      {
        this.altoBioBio += total;
        
      }
      
      if(this.ciudad == 'Antuco')
      {
        this.antuco += total;
      }

      if(this.ciudad == 'Arauco')
      {
        this.arauco += total;
      }

      if(this.ciudad == 'Cabrero')
      {
        this.cabrero += total;
      }
      
      if(this.ciudad == 'Cañete' || this.ciudad == 'Canete')
      {
        this.cañete += total;
      }

      if(this.ciudad == 'Chiguayante')
      {
        this.chiguayante += total;
      }

      if(this.ciudad == 'Concepción')
      {
        this.concepcion  += total;
        
      }

      if(this.ciudad == 'Contulmo')
      {
        this.contulmo  += total;
      }

      if(this.ciudad == 'Coronel')
      {
        this.coronel  += total;
      }

      if(this.ciudad == 'Curanilahue')
      {
        this.curanilahue  += total;
      }

      if(this.ciudad == 'Florida')
      {
        this.florida  += total;
      }

      if(this.ciudad == 'Hualpén')
      {
        this.hualpen  += total;
      }

      if(this.ciudad == 'Hualqui')
      {
        this.hualqui  += total;
      }

      if(this.ciudad == 'Laja')
      {
        this.laja  += total;
      }

      if(this.ciudad == 'Lebu')
      {
        this.lebu  += total;
      }

      if(this.ciudad == 'Los Álamos' || this.ciudad == 'Los Alamos' )
      {
        this.losAlamos  += total;
      }

      if(this.ciudad == 'Los Ángeles' || this.ciudad == 'Los Ángeles')
      {
        this.losAngeles  += total;
      }
      
      if(this.ciudad == 'Lota')
      {
        this.lota  += total;
      }

      if(this.ciudad == 'Mulchén' || this.ciudad == 'Mulchen')
      {
        this.mulchen  += total;
      }

      if(this.ciudad == 'Nacimiento')
      {
        this.nacimiento  += total;
      }

      if(this.ciudad == 'Negrete')
      {
        this.negrete  += total;
      }

      if(this.ciudad == 'Penco')
      {
        this.penco  += total;
      }

      if(this.ciudad == 'Quilaco')
      {
        this.quilaco  += total;
      }
      
      if(this.ciudad == 'Quilleco')
      {
        this.quilleco  += total;
      }

      if(this.ciudad == 'San Pedro De La Paz' || this.ciudad == 'San Pedro de la Paz')
      {
        this.sanPedroDeLaPaz  += total;
      }


      if(this.ciudad == 'San Rosendo')
      {
        this.sanRosendo  += total;
      }

      if(this.ciudad == 'Santa Bárbara' || this.ciudad == 'Santa Barbara')
      {
        this.santaBarbara  += total;
      }

      if(this.ciudad == 'Santa Juana')
      {
        this.santaJuana  += total;
      }
      
      if(this.ciudad == 'Talcahuano')
      {
        this.talcahuano  += total;
      }

      if(this.ciudad == 'Tirúa' || this.ciudad == 'Tirua')
      {
        this.tirua  += total;
      }

      if(this.ciudad == 'Tomé' || this.ciudad == 'Tome')
      {
        this.tome  += total;
      }

      if(this.ciudad == 'Tucapel')
      {
        this.tucapel  += total;
      }

      if(this.ciudad == 'Yumbel')
      {
        this.yumbel  += total;
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
