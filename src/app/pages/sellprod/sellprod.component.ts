import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sellprod',
  templateUrl: './sellprod.component.html',
  styleUrls: ['./sellprod.component.css']
})
export class SellprodComponent implements OnInit {

  data:any;
  pet = {
    id: 0,
    cantidad: 0,
    precio:0,
    nuevaCantidad: null,
    nuevoPrecio:null
  }

  pead = {
    id: 1,
    cantidad: 0,
    precio:0,
    nuevaCantidad: null,
    nuevoPrecio:null
  }

  pebd = {
    id: 2,
    cantidad: 0,
    precio:0,
    nuevaCantidad: null,
    nuevoPrecio: null
  }

  carton = {
    id: 3,
    cantidad: 0,
    precio:0,
    nuevaCantidad: null,
    nuevoPrecio:null
  }

  aluminio = {
    id: 4,
    cantidad: 0,
    precio:0,
    nuevaCantidad: null,
    nuevoPrecio:null
  }

  

  constructor(private firebaseSer: FirebaseService) { }

  ngOnInit(): void {
    this.getProductosData();
  }

  async getProductosData()
  {
    await this.firebaseSer.getProductos().then(
      data => 
      {
        // console.log(data[0].cantidad)
        //pet
        this.pet.cantidad = data[0].cantidad
        this.pet.precio = data[0].precio

        //pead
        this.pead.cantidad = data[1].cantidad
        this.pead.precio = data[1].precio

        //pebd
        this.pebd.cantidad = data[2].cantidad
        this.pebd.precio = data[2].precio

        //carton
        this.carton.cantidad = data[3].cantidad
        this.carton.precio = data[3].precio

        //aluminio
        this.aluminio.cantidad = data[4].cantidad
        this.aluminio.precio = data[4].precio

      }
    )
  }

  async actualizar(material:any)
  {

    //validaciones
    if(material.nuevoPrecio < 0)
    {
      Swal.fire({
        title: 'Operación no permitida',
        icon: 'error',
        text:'El precio no puede ser menor a 0',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });

      return;

    }
    if(material.nuevaCantidad == null || material.nuevaCantidad == NaN)
    {
      //se mantiene la cantidad
    }else{
      let aux = material.cantidad + material.nuevaCantidad;
      if(aux <= 0)
    {

      Swal.fire({
        title: 'Operación no permitida',
        icon: 'error',
        text:'La cantidad no puede ser menor o igual a 0',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });

      return;

    }else{
      material.cantidad += material.nuevaCantidad;
    }
    }

    if(material.nuevoPrecio == null ||  material.nuevoPrecio == NaN)
    {
      //se mantiene el precio actual
    }else{
      material.precio = material.nuevoPrecio

    }
    let boolie = await this.firebaseSer.updateProducto(material);
    this.getProductosData();
    this.pet.nuevaCantidad = null;
    this.pet.nuevoPrecio = null;

    this.pead.nuevaCantidad = null;
    this.pead.nuevoPrecio = null;

    this.pebd.nuevaCantidad = null;
    this.pebd.nuevoPrecio = null;

    this.carton.nuevaCantidad = null;
    this.carton.nuevoPrecio = null;

    this.aluminio.nuevaCantidad = null;
    this.aluminio.nuevoPrecio = null;
    
    

  }

  removeZero(value:number)
  {
    
  }

}
