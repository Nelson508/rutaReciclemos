import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit {

  @Input() pasos: boolean = false;
 
  public secondsToDday = '0';
  public minutesToDday = '5';


  constructor() { }

  ngOnInit(): void {
    this.cuentaRegresiva();
  }

  cuentaRegresiva(){
    var date = new Date('2020-01-01 00:05');
  
    // Función para rellenar con ceros
    var padLeft = (n:any) => "00".substring(0, "00".length - n.length) + n;
    
    // Asignar el intervalo a una variable para poder eliminar el intervale cuando llegue al limite
    var interval = setInterval(() => {
    
      // Asignar el valor de minutos
      var minutes = padLeft(date.getMinutes() + "");
      // Asignqr el valor de segundos
      var seconds = padLeft(date.getSeconds() + "");

      this.minutesToDday = minutes;
      this.secondsToDday = seconds;
      
     /*  console.log(minutes, seconds); */
      
      // Restarle a la fecha actual 1000 milisegundos
      date = new Date(date.getTime() - 1000);
        
      // Si llega a 2:45, eliminar el intervalo
      if( minutes == '00' && seconds == '00' ) {
        clearInterval(interval);
        window.location.reload();
      }
      
    }, 1000);
  }

}
