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

  mostrarVentas = false;
  mostrarFormulario = false;
  mostrarTransaccion = false;

  datos = 
  {
    _id: 0,
    nombre:'',
    rut:'',
    giro:'',
    direccion:'',
    email:'',
    telefono: '',
    comunas: '',
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  async activar(activar: boolean) {

    // const element = document.querySelector('.formulario');
    // await element!.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__delay-.1s');
    //this.ocultar = false;
   
    this.mostrarVentas = activar;
    this.mostrarFormulario = false;
    this.mostrarTransaccion = false;

   
  }

  async activarFormulario(newItem: any) {
    //let aux = 0;
    const elementVentas = document.querySelector('#Ventas');
    await elementVentas!.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__delay-1s');
    const elementoFrmulario = document.querySelector('.formulario');
    await elementoFrmulario!.classList.add('animate__animated', 'animate__fadeInUp', 'animate__delay-2s');
    // //this.ocultar = false;
    console.log(newItem);

    setTimeout(() => {
      this.mostrarVentas = false;
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
    //this.ocultar = false;
    console.log(newItem);

    setTimeout(() => {
      this.mostrarVentas = false;
      this.mostrarFormulario = false;
      this.mostrarTransaccion = true;
    }, 2000);

  }



}
