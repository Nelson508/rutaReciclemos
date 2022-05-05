import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {

  @Input() desactivado:boolean = false;

 
  
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
  
  constructor() { }

  ngOnInit(): void {
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

}
