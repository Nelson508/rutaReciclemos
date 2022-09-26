import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  Productos = 'active';
  ocultar = true;
  pasos = false;

  mostrarVentas = false;
  mostrarFormulario = false;
  mostrarTransaccion = false;
  mostrarContador = false;

  datos = 
  {
    _id: 0,
    datosCliente : {
      nombre:'',
      rut:'',
      giro:'',
      direccion:'',
      email:'',
      telefono: '',
      regiones: '',
      comunas: '',
    },
    materiales : {
      pet: {},
      pead: {},
      pebd: {},
      carton: {},
      aluminio: {},
      total: 0,
    },
   
  };

  /* datos:any; */

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async activar(activar: boolean) {

    // const element = document.querySelector('.formulario');
    // await element!.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__delay-.1s');
    //this.ocultar = false;
   
    this.mostrarVentas = activar;
    this.mostrarContador = false;
    this.mostrarFormulario = false;
    this.mostrarTransaccion = false;

   
  }

  async activarFormulario(newItem: any) {
    //let aux = 0;
    const elementVentas = document.querySelector('#Ventas');
    await elementVentas!.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__delay-1s');
    const elementoContador = document.querySelector('.cuentaRegresiva');
    await elementoContador!.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-2s');
    const elementoFrmulario = document.querySelector('.formulario');
    await elementoFrmulario!.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-2s');
    // //this.ocultar = false;
    this.datos.materiales.aluminio = newItem.aluminio;
    this.datos.materiales.carton = newItem.carton;
    this.datos.materiales.pet = newItem.pet;
    this.datos.materiales.pead = newItem.pead;
    this.datos.materiales.pebd = newItem.pebd;
    this.datos.materiales.total = newItem.total;
    console.log(this.datos, 'datos pro');

    setTimeout(() => {
      this.mostrarVentas = false;
      this.mostrarContador = true;
      this.mostrarFormulario = true;
      this.mostrarTransaccion = false;

    }, 2000);

    //this.mostrarVentas = false;
    

  }

  async atcivarTransaccion(newItem: any) {
    //let aux = 0;
    const element = document.querySelector('.formulario');
    await element!.classList.remove('animate__fadeInUp', 'animate__delay-2s');
    await element!.classList.add('animate__fadeOutUp', 'animate__delay-1s');
    const elementoFrmulario = document.querySelector('.transaccion');
    await elementoFrmulario!.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-2s');
  
    this.datos._id = newItem._id;
    this.datos.datosCliente.nombre = newItem.nombre;
    this.datos.datosCliente.rut = newItem.rut;
    this.datos.datosCliente.giro = newItem.giro;
    this.datos.datosCliente.direccion = newItem.direccion;
    this.datos.datosCliente.email = newItem.email;
    this.datos.datosCliente.telefono = newItem.telefono;
    this.datos.datosCliente.regiones = newItem.regiones;
    this.datos.datosCliente.comunas = newItem.comunas;
    console.log(this.datos, 'datos pro');

    setTimeout(() => {
      this.mostrarVentas = false;
      this.mostrarContador = true;
      this.mostrarFormulario = false;
      this.mostrarTransaccion = true;
      this.pasos = true;
    }, 2000);

  }

}
