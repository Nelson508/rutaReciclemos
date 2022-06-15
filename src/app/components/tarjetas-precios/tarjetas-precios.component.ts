import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-tarjetas-precios',
  templateUrl: './tarjetas-precios.component.html',
  styleUrls: ['./tarjetas-precios.component.css']
})
export class TarjetasPreciosComponent implements OnInit {

  info: any;
  pet = {
    cantidad: 0,
    nombre: '',
    precio:0
  }

  pead = {
    cantidad: 0,
    nombre: '',
    precio:0
  }

  pebd= {
    cantidad: 0,
    nombre: '',
    precio:0
  }

  carton= {
    cantidad: 0,
    nombre: '',
    precio:0
  }

  latas= {
    cantidad: 0,
    nombre: '',
    precio:0
  }
  
  constructor(private firebaseSer: FirebaseService) { }

  ngOnInit(): void {

    this.datosMateriales();
  }

  async datosMateriales(){

    await this.firebaseSer.getProductos().then( (data:any) => 
      {
        this.info = data;
        console.log(data);

        this.pet =  this.info[0];
        this.pead =  this.info[1];
        this.pebd =  this.info[2];
        this.carton =  this.info[3];
        this.latas =  this.info[4];


      });

  }

}
