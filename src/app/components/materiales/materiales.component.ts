import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import {FirebaseService} from '../../services/firebase.service';
@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {

  @Output() materialesData = new EventEmitter<any>();

  total:number = 0;
  pet = {
    precio:0,
    cantidad: 0,
    disponible:0,
    nombre: 'Botellas PET',
    estado: false
  }

  pead = {
    precio:0,
    cantidad:0,
    disponible:0,
    nombre: 'Envases PEAD',
    estado: false
  }

  pebd = {
    precio:0,
    cantidad:0,
    disponible:0,
    nombre: 'Envases PEBD',
    estado: false
  }

  carton = {
    precio:0,
    cantidad:0,
    disponible:0,
    nombre: 'Cartón y papel',
    estado: false
  }

  aluminio = {
    precio:0,
    cantidad:0,
    disponible:0,
    nombre: 'Latas de aluminio',
    estado: false
  }

  objetoMateriales = {
    pet: {},
    pead: {},
    pebd: {},
    carton: {},
    aluminio: {},
    total: 0
  }

  constructor(private firebaseSer: FirebaseService) { }

  ngOnInit(): void {
    this.getProductosData();
  }

  addToShopCart(cantidad:number, precio:number, disponible:number, nombre:string, estado: boolean)
  {
    //si la cantidad es igual a 0, no se ingresa ningun valor
    if(cantidad == 0) return;
 
    //si la cantidad es menor a 0 se le retorna un msj indicando que no es permitido
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

    //si la cantidad ingresada es mayor a la cantidad disponible se retorna msj con operacion no permitida
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

      if(estado)
      {
        return Swal.fire({
          title: 'La cantidad ya se ha registrado',
          icon: 'info',
          html: `Para ingresar una nueva cantidad, primero elimine sus kilos ingresados con el boton <br> 
          <i class="fa-solid fa-trash-can" style="color:red"></i>`,
          
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar',
        });
      }
   

    if(nombre == 'Botellas PET')
    {
      this.pet.estado = true;
      this.objetoMateriales.pet = this.pet;
    }
    if(nombre == 'Envases PEAD')
    {
      this.pead.estado = true;
      this.objetoMateriales.pead = this.pead;
    }
    if(nombre == 'Envases PEBD')
    {
      this.pebd.estado = true;
      this.objetoMateriales.pebd = this.pebd;
    }
    if(nombre == 'Cartón y papel')
    {
      this.carton.estado = true;
      this.objetoMateriales.carton = this.carton;
    }
    if(nombre == 'Latas de aluminio')
    {
      this.aluminio.estado = true;
      this.objetoMateriales.aluminio = this.aluminio;
    }



    let suma = cantidad*precio;
    this.total = this.total + suma;
    this.objetoMateriales.total = this.total;

    console.log(this.objetoMateriales);

    Swal.fire({
      title: 'Cantidad agregada exitosamente',
      icon: 'success',
      text: `Se han añadido ${cantidad}kg de ${nombre} a su compra, teniendo un total de ${this.total} CLP.`,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    });


  }

  removeFromShopCart(cantidad:number, name:string, precio:number)
  {
    if(this.total == 0)
    {
      return;
    }

    this.total = this.total - (cantidad*precio);
    this.objetoMateriales.total = this.total;

    if(name == 'Botellas PET')
    {
      this.pet.cantidad = 0;  
      this.pet.estado = false;
      this.objetoMateriales.pet = {};
    }
   
    if(name == 'Envases PEAD')
    {
      this.pead.cantidad = 0;  
      this.pead.estado = false;
      this.objetoMateriales.pead = {};
    }
    
    if(name == 'Envases PEBD')
    {
      this.pebd.cantidad = 0;  
      this.pebd.estado = false;
      this.objetoMateriales.pebd = {};
    }
  
    if(name == 'Cartón y papel')
    {
      this.carton.cantidad = 0;  
      this.carton.estado = false;
      this.objetoMateriales.carton = {};
    }

    if(name == 'Latas de aluminio')
    {
      this.aluminio.cantidad = 0;  
      this.aluminio.estado = false;
      this.objetoMateriales.aluminio = {};
    }

    console.log(this.objetoMateriales);

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

  enviarMateriales(){

    this.datosFormulario();
    
  }

  
  datosFormulario() {
    
    Swal.fire({
      title: '¿Desea continuar?',
      icon: 'info',
      text: 'Al presionar "continuar" usted dispondra de 5 minutos para completar el formulario con los datos de su empresa y realizar la transferencia bancaria, durante este tiempo se le reservaran sus kilos, pero de no completarse la transacción, éstos ya no estarán reservados.',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        //continuar a formulario ;)
        this.materialesData.emit(this.objetoMateriales);
        
      }
    })
  }
  

}
