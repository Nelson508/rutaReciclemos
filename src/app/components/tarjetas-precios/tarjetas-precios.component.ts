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
    precio:0,
    tipo:''
  }

  pead = {
    cantidad: 0,
    nombre: '',
    precio:0,
    tipo:''
  }

  pebd= {
    cantidad: 0,
    nombre: '',
    precio:0,
    tipo:''
  }

  carton= {
    cantidad: 0,
    nombre: '',
    precio:0,
    tipo:''
  }

  latas= {
    cantidad: 0,
    nombre: '',
    precio:0,
    tipo:''
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

        if(this.pet.cantidad>= 1000)
        {
          this.pet.tipo = 'Tons';
          this.pet.cantidad = this.pet.cantidad/1000;
          this.pet.cantidad = Math.round((this.pet.cantidad + Number.EPSILON) * 100) / 100;
        }else{
          this.pet.tipo = 'Kg';
        }

        if(this.pead.cantidad>= 1000)
        {
          this.pead.tipo = 'Tons';
          this.pead.cantidad = this.pead.cantidad/1000;
          this.pead.cantidad = Math.round((this.pead.cantidad + Number.EPSILON) * 100) / 100;
        }else{
          this.pead.tipo = 'Kg';
        }

        if(this.pebd.cantidad>= 1000)
        {
          this.pebd.tipo = 'Tons';
          this.pebd.cantidad = this.pebd.cantidad/1000;
          this.pebd.cantidad = Math.round((this.pebd.cantidad + Number.EPSILON) * 100) / 100;
        }else{
          this.pebd.tipo = 'Kg';
        }

        if(this.carton.cantidad>= 1000)
        {
          this.carton.tipo = 'Tons';
          this.carton.cantidad = this.carton.cantidad/1000;
          this.carton.cantidad = Math.round((this.carton.cantidad + Number.EPSILON) * 100) / 100;
        }else{
          this.carton.tipo = 'Kg';
        }

        if(this.latas.cantidad>= 1000)
        {
          this.latas.tipo = 'Tons';
          this.latas.cantidad = this.latas.cantidad/1000;
          this.latas.cantidad = Math.round((this.latas.cantidad + Number.EPSILON) * 100) / 100;
        }else{
          this.latas.tipo = 'Kg';
        }
      });

  }

}
