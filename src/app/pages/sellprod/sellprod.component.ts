import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../services/firebase.service';

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
    nuevaCantidad: 0,
    precio:0
  }

  pead = {
    id: 1,
    cantidad: 0,
    precio:0
  }

  pebd = {
    id: 2,
    cantidad: 0,
    precio:0
  }

  carton = {
    id: 3,
    cantidad: 0,
    precio:0
  }

  aluminio = {
    id: 4,
    cantidad: 0,
    precio:0
  }

  Editpet = {
    cantidad: 0,
    precio:0
  }

  Editpead = {
    cantidad: 0,
    precio:0
  }

  Editpebd = {
    cantidad: 0,
    precio:0
  }

  Editcarton = {
    cantidad: 0,
    precio:0
  }

  Editaluminio = {
    cantidad: 0,
    precio:0
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
    console.log(material);
    await this.firebaseSer.updateProducto(material);

  }

}
