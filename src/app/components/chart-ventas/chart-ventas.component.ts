import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import Swal from 'sweetalert2';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-chart-ventas',
  templateUrl: './chart-ventas.component.html',
  styleUrls: ['./chart-ventas.component.css']
})

export class ChartVentasComponent implements OnInit {

  @Input() desactivado:boolean = true;

  infoClientes: any;
  modalReference: NgbModalRef = this.modalService.open('');
  closeResult = '';
  pedidoPendiente: any = [];
  pedidoAprobado: any = [];
  year: any;

  pet = {
    precio:0,
    cantidad: 0
  }

  pead = {
    precio:0,
    cantidad:0
  }

  pebd = {
    precio:0,
    cantidad:0
  }

  carton = {
    precio:0,
    cantidad:0
  }

  aluminio = {
    precio:0,
    cantidad:0
  }

  En = {
    nombre: 'En',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  Feb = {
    nombre: 'Feb',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  Mar = {
    nombre: 'Mar',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  Abr = {
    nombre: 'Abr',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  May = {
    nombre: 'May',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  Jun = {
    nombre: 'Jun',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  Jul = {
    nombre: 'Jul',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  Agto = {
    nombre: 'Agto',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  Sept = {
    nombre: 'Sept',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  Oct = {
    nombre: 'Oct',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  Nov = {
    nombre: 'Nov',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  Dic = {
    nombre: 'Dic',
    pet: 0,
    pead: 0,
    pebd: 0,
    carton: 0,
    aluminio: 0,
    total: 0
  }

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      labels: {
      fontColor: '#585757',  
      boxWidth:40
      }
    },
    scales: {
      xAxes: [{
        
      ticks: {
        beginAtZero:true,
        fontColor: '#585757'
      },
      gridLines: {
        display: true ,
        color: "rgba(0, 0, 0, 0.07)"
      },
      
      }],
      
      yAxes: [{
        ticks: {
          beginAtZero:true,
          fontColor: '#585757'
        },
        gridLines: {
          display: true ,
          color: "rgba(0, 0, 0, 0.07)"
        },
        }]
       
    }
  
  };
  public barChartLabels: string[] = [this.En.nombre, this.Feb.nombre, this.Mar.nombre, this.Abr.nombre, this.May.nombre, this.Jun.nombre, this.Jul.nombre, this.Agto.nombre, this.Sept.nombre, this.Oct.nombre, this.Nov.nombre,this.Dic.nombre];
  public barChartType: ChartType  = 'bar';
  public barChartLegend = true;
  
  public barChartData: any[] = [
    { barPercentage: .5, data: [13, 20, 4, 18, 29, 25, 8, 11, 32, 23, 14, 35], label: 'Plasticos' },
    { barPercentage: .5, data: [31, 30, 6, 6, 21, 4, 11, 21, 32, 33, 24, 25], label: 'Cartón y Papel' },
    { barPercentage: .5, data: [13, 20, 4, 18, 29, 25, 8, 31, 12, 13, 34, 15], label: 'Latas de aluminio' },
  ];
  
  public barChartColors: Array<any> = [
    
    {
      backgroundColor: "#FDDA0D"
    },
    {
      backgroundColor: "#0096FF"
    },
    {
      backgroundColor: "#888888"
    }
  ];
  
  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(private firebaseSer: FirebaseService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.modalReference.close();
    this.ngOnDestroy();
    this.traerInfoCliente();
  }

  // events
  public chartClicked(e: any): void {
    //your code here
  }

  public chartHovered(e: any): void {
    //your code here
  }
  
  ngOnDestroy(){
    
     this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true,
      maintainAspectRatio: true,
      legend: {
        display: true,
        labels: {
        fontColor: '#585757',  
        boxWidth:40
        }
      },
      scales: {
        xAxes: [{
          
        ticks: {
          beginAtZero:true,
          fontColor: '#585757'
        },
        gridLines: {
          display: true ,
          color: "rgba(0, 0, 0, 0.07)"
        },
        
        }],
        
        yAxes: [{
          ticks: {
            beginAtZero:true,
            fontColor: '#585757'
          },
          gridLines: {
            display: true ,
            color: "rgba(0, 0, 0, 0.07)"
          },
          }]
         
      },
      animation: {
        animateScale: true,
        animateRotate: false,
        duration: 500,
        easing: 'linear'
      }
    
    };

    this.chart?.update();
  }

  async traerInfoCliente(){

    this.infoClientes = await this.firebaseSer.getCliente();
    this.year = new Date().getFullYear();

    this.infoClientes.forEach((pedido: any)=>{

      if(pedido.estado == 'pendiente'){
        this.pedidoPendiente.push(pedido);
      }

      if(pedido.estado == 'aprobado'){
        this.ventasMes(pedido);
        /* this.pedidoAprobado.push(clientes); */
      }

    });



      /* 
    console.log('Pedido Pendiente',this.pedidoPendiente);
    console.log('Pedido Aprobado',this.pedidoAprobado); */


   /*  this.infoClientes.ocultar =  */
    /* console.log( this.infoClientes); */
    this.recorreId();

  }

  open(content:any) {
   /*  this.previsualizacion = ''; */
    this.modalReference = this.modalService.open(content,{ size: 'xl' });
    this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  aceptar(infoCliente:any) {

    Swal.fire({
      title: '¿Desea aceptar la venta?',
      icon: 'info',
    /*   text: '¿?', */
      showCancelButton: true,
      confirmButtonColor: '#6a27e0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        this.firebaseSer.aprobarPedido(infoCliente);
       
      }
    })

    
  }

  rechazar(infoCliente:any) {

   
    console.log(infoCliente.materiales);

    

    Swal.fire({
      title: '¿Desea rechazar la venta?',
      icon: 'info',
     /*  text: 'asdsad', */
      showCancelButton: true,
      confirmButtonColor: '#6a27e0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {
        this.firebaseSer.rechazarPedido(infoCliente);
        await this.getProductosData();

        let cantidadPet = (infoCliente.materiales.pet == undefined) ? 0 : infoCliente.materiales.pet.cantidad;
        let cantidadPead = (infoCliente.materiales.pead == undefined) ? 0 : infoCliente.materiales.pead.cantidad;
        let cantidadPebd = (infoCliente.materiales.pebd == undefined) ? 0 : infoCliente.materiales.pebd.cantidad;
        let cantidadCarton = (infoCliente.materiales.carton == undefined) ? 0 : infoCliente.materiales.carton.cantidad;
        let cantidadAluminio = (infoCliente.materiales.aluminio == undefined) ? 0 : infoCliente.materiales.aluminio.cantidad;
        
        let material = {
          pet:{
            cantidad:( this.pet.cantidad + cantidadPet ),
            precio: this.pet.precio
          },
          pead:{
            cantidad:(this.pead.cantidad + cantidadPead ),
            precio: this.pead.precio
          },
          pebd:{
            cantidad:(this.pebd.cantidad + cantidadPebd ),
            precio:this.pebd.precio,
          },
          carton:{
            cantidad:(this.carton.cantidad + cantidadCarton ),
            precio:this.carton.precio
          },
          aluminio:{
            cantidad:(this.aluminio.cantidad + cantidadAluminio ),
            precio:this.aluminio.precio
          }
    
        }
        
        this.firebaseSer.reservarProducto(material);
        infoCliente.ocultar=true;
        
      }
    })
  }

  async getProductosData()  
  {
    await this.firebaseSer.getProductos().then(
      data => 
      {
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

  recorreId(){
    let largo = Object.keys(this.infoClientes).length;

   /*  console.log(this.infoClientes); */
  
    for (let i = 0; i < largo; i++) {     

      this.infoClientes[i]['ocultar']= false;
     
    }

   /*  console.log(this.infoClientes); */
  }


  async ventasMes(pedido: any){

    /* console.log('Pedido no importa el ano',pedido.fechaCompra.slice(5,7));
    console.log('Datos',pedido); */
   
    if(this.year == pedido.fechaCompra.slice(0,4)){

      let petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad;
      let peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad;
      let pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad;
      let cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad;
      let aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad;

      if(pedido.fechaCompra.slice(5,7) == '01'){
        this.En.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.En.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.En.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.En.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.En.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Enero',this.En);
      }

      if(pedido.fechaCompra.slice(5,7) == '02'){
        this.Feb.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.Feb.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.Feb.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.Feb.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.Feb.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Febrero',this.Feb);
      }

      if(pedido.fechaCompra.slice(5,7) == '03'){
        this.Mar.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.Mar.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.Mar.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.Mar.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.Mar.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Marzo',this.Mar);
      }

      if(pedido.fechaCompra.slice(5,7) == '04'){
        this.Abr.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.Abr.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.Abr.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.Abr.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.Abr.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Abril',this.Abr);
      }

      if(pedido.fechaCompra.slice(5,7) == '05'){
        this.May.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.May.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.May.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.May.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.May.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Mayo',this.May); 
      }

      if(pedido.fechaCompra.slice(5,7) == '06'){
        this.Jun.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.Jun.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.Jun.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.Jun.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.Jun.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Junio',this.Jun);
      }

      if(pedido.fechaCompra.slice(5,7) == '07'){
        this.Jul.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.Jul.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.Jul.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.Jul.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.Jul.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Julio',this.Jul);
      }

      if(pedido.fechaCompra.slice(5,7) == '08'){
        this.Agto.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.Agto.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.Agto.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.Agto.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.Agto.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Agosto',this.Agto);
      }

      if(pedido.fechaCompra.slice(5,7) == '09'){
        this.Sept.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.Sept.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.Sept.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.Sept.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.Sept.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Septiembre',this.Sept);
      }

      if(pedido.fechaCompra.slice(5,7) == '10'){
        this.Oct.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.Oct.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.Oct.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.Oct.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.Oct.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Octubre',this.Oct);
      }

      if(pedido.fechaCompra.slice(5,7) == '11'){
        this.Nov.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.Nov.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.Nov.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.Nov.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.Nov.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Noviembre',this.Nov);
      }

      if(pedido.fechaCompra.slice(5,7) == '12'){
        this.Dic.pet += parseFloat(petCantidad = (pedido.materiales.pet == undefined) ? 0 : pedido.materiales.pet.cantidad);
        this.Dic.pead += parseFloat(peadCantidad = (pedido.materiales.pead == undefined) ? 0 : pedido.materiales.pead.cantidad);
        this.Dic.pebd += parseFloat(pebdCantidad = (pedido.materiales.pebd == undefined) ? 0 : pedido.materiales.pebd.cantidad);
        this.Dic.carton += parseFloat(cartonCantidad = (pedido.materiales.carton == undefined) ? 0 : pedido.materiales.carton.cantidad);
        this.Dic.aluminio += parseFloat(aluminioCantidad = (pedido.materiales.aluminio == undefined) ? 0 : pedido.materiales.aluminio.cantidad);

        console.log('Datos Diciembre',this.Dic);
      }

    }

  }
}

