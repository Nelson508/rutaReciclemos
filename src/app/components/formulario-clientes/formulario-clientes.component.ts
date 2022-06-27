import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formulario-clientes',
  templateUrl: './formulario-clientes.component.html',
  styleUrls: ['./formulario-clientes.component.css']
})
export class FormularioClientesComponent implements OnInit {

  datos = 
  {
    _id: 0,
    nombre:'',
    rut:'',
    giro:'',
    direccion:'',
    email:'',
    telefono: '',
    comunas: ''
  };

  comunas = [
    {name:"Alto Bío-Bío"},
    {name:"Antuco"},
    {name:"Arauco"},
    {name:"Cabrero"},
    {name:"Cañete"},
    {name:"Chiguayante"},
    {name:"Concepción"},
    {name:"Contulmo"},
    {name:"Coronel"},
    {name:"Curanilahue"},
    {name:"Florida"},
    {name:"Hualpén"},
    {name:"Hualqui"},
    {name:"Laja"},
    {name:"Lebu"},
    {name:"Los Álamos"},
    {name:"Los Ángeles"},
    {name:"Lota"},
    {name:"Mulchén"},
    {name:"Nacimiento"},
    {name:"Negrete"},
    {name:"Penco"},
    {name:"Quilaco"},
    {name:"Quilleco"},
    {name:"San Pedro De La Paz"},
    {name:"San Rosendo"},
    {name:"Santa Bárbara"},
    {name:"Santa Juana"},
    {name:"Talcahuano"},
    {name:"Tirúa"},
    {name:"Tomé"},
    {name:"Tucapel"},
    {name:"Yumbel"},
    {name:"Antuco"}
  ];

  lastIdPedido = -1;


  constructor(private firebaseSer: FirebaseService,
              private router: Router) { }

  ngOnInit(): void {
    //this.traerCliente();
  }

  async traerCliente(){
    let variableD = await this.firebaseSer.getCliente();
    console.log(variableD);

    this.lastIdPedido = variableD.at(-1)._id;
  }

  async enviarPedido(){

    let valido = this.validacion(this.datos);

    
    if(valido != undefined){

      return Swal.fire({
        title: valido,
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });

    }

    await this.traerCliente();

    console.log('Ultimo Id: '+this.lastIdPedido);
    this.datos._id = this.lastIdPedido + 1;
    console.log('Nuevo Id: '+this.datos._id);

    this.firebaseSer.setPedido(this.datos);
    this.router.navigate(['/', 'nosotros']);

  }

  validacion(dates:any){

    /* //Validación caracteres en el campo nombre de la empresa
    var caracteresNombre = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\-., ]{3,50})+$/g;

    if(caracteresNombre.test(dates.nombre ) == false){
      
      return 'El campo nombre de la empresa no permite tener los caracteres ingresados. Con un mínimo de 3 caracteres.';
    }

    //Validación caracteres en el campo rut de la empresa
    var caracteresRut = /(^[kK0-9\-.]{10,12})+$/g;

    if(caracteresRut.test(dates.rut ) == false){
      
      return 'El campo rut de la empresa no permite tener los caracteres ingresados.';
    }

    //Validación caracteres en el campo giro
    var caracteresGiro = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ\-., ]{3,50})+$/g;

    if(caracteresGiro.test(dates.giro ) == false){
      
      return 'El campo giro de la empresa no permite tener los caracteres ingresados. Con un mínimo de 3 caracteres.';
    }
    
    if(dates.comunas == ''){
      return 'Seleccione una comuna';
    } */

    //Validación de correo
    var correo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(correo.test(dates.email) == false){

      return 'Debe ingresar un correo valido.';
    }



    if(dates.direccion == ''){
      return 'Ingrese un título para la publicación';
    }

    if(dates.direccion.length > 80){
      return 'El título no debe tener mas de 80 caracteres';
    }
    
    
  
  }

}
