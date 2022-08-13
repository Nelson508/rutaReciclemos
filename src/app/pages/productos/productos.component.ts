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
   
  }

  async activarFormulario(newItem: any) {
    //let aux = 0;
    // const element = document.querySelector('.formulario');
    // await element!.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__delay-.1s');
    // //this.ocultar = false;
    // console.log(newItem);

    this.mostrarVentas = false;
    this.mostrarFormulario = true;

  }

  async addItem(newItem: any) {
    //let aux = 0;
    const element = document.querySelector('.formulario');
    await element!.classList.add('animate__animated', 'animate__fadeOutUp', 'animate__delay-.1s');
    //this.ocultar = false;
    console.log(newItem);

    this.mostrarVentas = false;
    this.mostrarFormulario = false;

  }

}
