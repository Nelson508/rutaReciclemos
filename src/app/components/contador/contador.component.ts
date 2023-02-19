import { Component, Input, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';


@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent implements OnInit {

  @Input() pasos: boolean = false;
  @Input() materiales: any;
 
  public secondsToDday = '0';
  public minutesToDday = '5';


  constructor(private firebaseSer: FirebaseService) { }

  ngOnInit(): void {
    this.cuentaRegresiva();
    console.log(this.materiales);
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
        this.devolverMateriales();
        window.location.reload();

      }
      
    }, 1000);
  }

  devolverMateriales(){


    let material = {
      pet:{
        cantidad:(this.materiales.pet.disponible),
        precio: this.materiales.pet.precio
      },
      pead:{
        cantidad:(this.materiales.pead.disponible),
        precio: this.materiales.pead.precio
      },
      pebd:{
        cantidad:(this.materiales.pebd.disponible),
        precio:this.materiales.pebd.precio,
      },
      carton:{
        cantidad:(this.materiales.carton.disponible),
        precio:this.materiales.carton.precio
      },
      aluminio:{
        cantidad:(this.materiales.aluminio.disponible),
        precio:this.materiales.aluminio.precio
      }

    }

    this.firebaseSer.reservarProducto(material);
    
  }

}
