import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {FirebaseService} from '../../services/firebase.service';
@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {
  total:number = 0;
  pet = {
    precio:0,
    cantidad: 0,
    disponible:0,
    nombre: 'Botellas PET'
  }

  pead = {
    precio:0,
    cantidad:0,
    disponible:0,
    nombre: 'Envases PEAD'
  }

  pebd = {
    precio:0,
    cantidad:0,
    disponible:0,
    nombre: 'Envases PEBD'
  }

  carton = {
    precio:0,
    cantidad:0,
    disponible:0,
    nombre: 'Cartón y papel'
  }

  aluminio = {
    precio:0,
    cantidad:0,
    disponible:0,
    nombre: 'Latas de aluminio'
  }

  constructor(private firebaseSer: FirebaseService) { }

  ngOnInit(): void {
    this.getProductosData();
  }

  addToShopCart(cantidad:number, precio:number, disponible:number, nombre:string)
  {
    if(cantidad == 0)
    {
      return;
      //validar que si es menor a 0 que se vaya pa la casa
    }

    if(cantidad < 0)
    {
      
      return Swal.fire({
        title: 'Operación no permitida',
        icon: 'warning',
        text: `No se puede ingresar una cantidad inferior 0`,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      });
    }

    if(cantidad > disponible)
    {
      return Swal.fire({
        title: 'Operación no permitida',
        icon: 'error',
        text: `La cantidad a comprar: ${cantidad}kg de ${nombre}, debe ser menor a la cantidad disponible: ${disponible} kg.`,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      });
    }

    let suma = cantidad*precio;
    this.total = this.total + suma;
    Swal.fire({
      title: 'Cantidad agregada exitosamente',
      icon: 'success',
      text: `Se han añadido ${cantidad}kg de ${nombre} a su compra, teniendo un total de ${this.total} CLP.`,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });


  }

  removeFromShopCart(cantidad:number, name:string, precio:number)
  {
    if(this.total == 0)
    {
      return;
    }

    this.total = this.total - (cantidad*precio);

    if(name == 'Botellas PET') this.pet.cantidad = 0;
   
    if(name == 'Envases PEAD') this.pead.cantidad = 0;
    
    if(name == 'Envases PEBD')this.pebd.cantidad = 0;
  
    if(name == 'Cartón y papel') this.carton.cantidad = 0;

    if(name == 'Latas de aluminio') this.aluminio.cantidad = 0;

    Swal.fire({
      title: 'Se han removido sus kilos del total',
      icon: 'info',
      text: `Se han removido: ${cantidad}kg de ${name}, descontando : ${(cantidad*precio)} CLP del total.`,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });




  }

  async getProductosData()
  {
    await this.firebaseSer.getProductos().then(
      data => 
      {
        // console.log(data[0].cantidad)
        //pet
        this.pet.disponible = data[0].cantidad
        this.pet.precio = data[0].precio

        //pead
        this.pead.disponible = data[1].cantidad
        this.pead.precio = data[1].precio

        //pebd
        this.pebd.disponible = data[2].cantidad
        this.pebd.precio = data[2].precio

        //carton
        this.carton.disponible = data[3].cantidad
        this.carton.precio = data[3].precio

        //aluminio
        this.aluminio.disponible = data[4].cantidad
        this.aluminio.precio = data[4].precio

      }
    )
  }

}
