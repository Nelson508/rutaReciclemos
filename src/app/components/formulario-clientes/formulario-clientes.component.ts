import { Component, OnInit, Input, Output, EventEmitter, HostListener} from '@angular/core';
import { Router } from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-formulario-clientes',
  templateUrl: './formulario-clientes.component.html',
  styleUrls: ['./formulario-clientes.component.css']
})
export class FormularioClientesComponent implements OnInit {

  @Output() formData = new EventEmitter<string>();
  @Input() materiales: any;

  toStr = JSON.stringify;
  optionSelect = true;

  datos = 
  {
    _id: 0,
    nombre:'',
    rut:'',
    giro:'',
   /*  direccion:'', */
    email:'',
    telefono: '',
    regiones:'',
    comunas: '',
    calle: '',
    numCalle: ''
  };

  
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

  comunas: any;

  //comunas = [
    // {name:"Alto Bío-Bío"},
    // {name:"Antuco"},
    // {name:"Arauco"},
    // {name:"Cabrero"},
    // {name:"Cañete"},
    // {name:"Chiguayante"},
    // {name:"Concepción"},
    // {name:"Contulmo"},
    // {name:"Coronel"},
    // {name:"Curanilahue"},
    // {name:"Florida"},
    // {name:"Hualpén"},
    // {name:"Hualqui"},
    // {name:"Laja"},
    // {name:"Lebu"},
    // {name:"Los Álamos"},
    // {name:"Los Ángeles"},
    // {name:"Lota"},
    // {name:"Mulchén"},
    // {name:"Nacimiento"},
    // {name:"Negrete"},
    // {name:"Penco"},
    // {name:"Quilaco"},
    // {name:"Quilleco"},
    // {name:"San Pedro De La Paz"},
    // {name:"San Rosendo"},
    // {name:"Santa Bárbara"},
    // {name:"Santa Juana"},
    // {name:"Talcahuano"},
    // {name:"Tirúa"},
    // {name:"Tomé"},
    // {name:"Tucapel"},
    // {name:"Yumbel"},
    // {name:"Antuco"}
  //];

  
    
  regiones = [
      {
        region: "Arica y Parinacota",
        //"romanNumber": "XV",
        //"number": "15",
        comunas: [
            {comuna: "Arica"},
            {comuna: "Camarones"},
            {comuna: "General Lagos"},
            {comuna: "Putre"}
        ]
      },
      {
        region: "Tarapacá",
        //"romanNumber": "I",
        //"number": "1",
        comunas: [
            {comuna: "Alto Hospicio"},
            {comuna: "Camiña"},
            {comuna: "Colchane"},
            {comuna: "Huara"},
            {comuna: "Iquique"},
            {comuna: "Pica"},
            {comuna: "Pozo Almonte"}
        ]
      },
      {
        region: "Antofagasta",
        //"romanNumber": "II",
        //"number": "2",
        comunas: [
            {comuna: "Antofagasta"},
            {comuna: "Calama"},
            {comuna: "María Elena"},
            {comuna: "Mejillones"},
            {comuna: "Ollagüe"},
            {comuna: "San Pedro de Atacama"},
            {comuna: "Sierra Gorda"},
            {comuna: "Taltal"},
            {comuna: "Tocopilla"}
        ]
      },
      {
        region: "Atacama",
        //"romanNumber": "III",
        //"number": "3",
        comunas: [
            {comuna: "Alto del Carmen"},
            {comuna: "Caldera"},
            {comuna: "Chañaral"},
            {comuna: "Copiapó"},
            {comuna: "Diego de Almagro"},
            {comuna: "Freirina"},
            {comuna: "Huasco"},
            {comuna: "Tierra Amarilla"},
            {comuna: "Vallenar"}
        ]
      },
      {
        region: "Coquimbo",
        //"romanNumber": "IV",
        //"number": "4",
        comunas: [
            {comuna: "Andacollo"},
            {comuna: "Canela"},
            {comuna: "Combarbalá"},
            {comuna: "Coquimbo"},
            {comuna: "Illapel"},
            {comuna: "La Higuera"},
            {comuna: "La Serena"},
            {comuna: "Los Vilos"},
            {comuna: "Monte Patria"},
            {comuna: "Ovalle"},
            {comuna: "Paiguano"},
            {comuna: "Punitaqui"},
            {comuna: "Río Hurtado"},
            {comuna: "Salamanca"},
            {comuna: "Vicuña"}
        ]
      },
      {
        region: "Valparaíso",
        //"romanNumber": "V",
        //"number": "5",
        comunas: [
            {comuna: "Algarrobo"},
            {comuna: "Cabildo"},
            {comuna: "Calera"},
            {comuna: "Calle Larga"},
            {comuna: "Cartagena"},
            {comuna: "Casablanca"},
            {comuna: "Catemu"},
            {comuna: "Concón"},
            {comuna: "El Quisco"},
            {comuna: "El Tabo"},
            {comuna: "Hijuelas"},
            {comuna: "Isla de Pascua"},
            {comuna: "Juan Fernández"},
            {comuna: "La Cruz"},
            {comuna: "La Ligua"},
            {comuna: "Limache"},
            {comuna: "Llaillay"},
            {comuna: "Los Andes"},
            {comuna: "Nogales"},
            {comuna: "Olmué"},
            {comuna: "Panquehue"},
            {comuna: "Papudo"},
            {comuna: "Petorca"},
            {comuna: "Puchuncaví"},
            {comuna: "Putaendo"},
            {comuna: "Quillota"},
            {comuna: "Quilpué"},
            {comuna: "Quintero"},
            {comuna: "Rinconada"},
            {comuna: "San Antonio"},
            {comuna: "San Esteban"},
            {comuna: "San Felipe"},
            {comuna: "Santa María"},
            {comuna: "Santo Domingo"},
            {comuna: "Valparaíso"},
            {comuna: "Villa Alemana"},
            {comuna: "Viña del Mar"},
            {comuna: "Zapallar"}
        ]
      },
      {
        region: "Metropolitana de Santiago",
        //"romanNumber": "XIII",
        //"number": "13",
        comunas: [
            {comuna: "Alhué"},
            {comuna: "Buin"},
            {comuna: "Calera de Tango"},
            {comuna: "Cerrillos"},
            {comuna: "Cerro Navia"},
            {comuna: "Colina"},
            {comuna: "Conchalí"},
            {comuna: "Curacaví"},
            {comuna: "El Bosque"},
            {comuna: "El Monte"},
            {comuna: "Estación Central"},
            {comuna: "Huechuraba"},
            {comuna: "Independencia"},
            {comuna: "Isla de Maipo"},
            {comuna: "La Cisterna"},
            {comuna: "La Florida"},
            {comuna: "La Granja"},
            {comuna: "La Pintana"},
            {comuna: "La Reina"},
            {comuna: "Lampa"},
            {comuna: "Las Condes"},
            {comuna: "Lo Barnechea"},
            {comuna: "Lo Espejo"},
            {comuna: "Lo Prado"},
            {comuna: "Macul"},
            {comuna: "Maipú"},
            {comuna: "María Pinto"},
            {comuna: "Melipilla"},
            {comuna: "Ñuñoa"},
            {comuna: "Padre Hurtado"},
            {comuna: "Paine"},
            {comuna: "Pedro Aguirre Cerda"},
            {comuna: "Peñaflor"},
            {comuna: "Peñalolén"},
            {comuna: "Pirque"},
            {comuna: "Providencia"},
            {comuna: "Pudahuel"},
            {comuna: "Puente Alto"},
            {comuna: "Quilicura"},
            {comuna: "Quinta Normal"},
            {comuna: "Recoleta"},
            {comuna: "Renca"},
            {comuna: "San Bernardo"},
            {comuna: "San Joaquín"},
            {comuna: "San José de Maipo"},
            {comuna: "San Miguel"},
            {comuna: "San Pedro"},
            {comuna: "San Ramón"},
            {comuna: "Santiago"},
            {comuna: "Talagante"},
            {comuna: "Tiltil"},
            {comuna: "Vitacura"}
        ]
      },
      {
        region: "Libertador Gral. Bernardo O’Higgins",
        //"romanNumber": "VI",
        //"number": "6",
        comunas: [
            {comuna: "Chimbarongo"},
            {comuna: "Chépica"},
            {comuna: "Codegua"},
            {comuna: "Coinco"},
            {comuna: "Coltauco"},
            {comuna: "Doñihue"},
            {comuna: "Graneros"},
            {comuna: "La Estrella"},
            {comuna: "Las Cabras"},
            {comuna: "Litueche"},
            {comuna: "Lolol"},
            {comuna: "Machalí"},
            {comuna: "Malloa"},
            {comuna: "Marchihue"},
            {comuna: "Nancagua"},
            {comuna: "Navidad"},
            {comuna: "Olivar"},
            {comuna: "Palmilla"},
            {comuna: "Paredones"},
            {comuna: "Peralillo"},
            {comuna: "Peumo"},
            {comuna: "Pichidegua"},
            {comuna: "Pichilemu"},
            {comuna: "Placilla"},
            {comuna: "Pumanque"},
            {comuna: "Quinta de Tilcoco"},
            {comuna: "Rancagua"},
            {comuna: "Rengo"},
            {comuna: "Requínoa"},
            {comuna: "San Fernando"},
            {comuna: "San Francisco de Mostazal"},
            {comuna: "San Vicente de Tagua Tagua"},
            {comuna: "Santa Cruz"}
        ]
      },
      {
        region: "Maule",
        //"romanNumber": "VII",
        //"number": "7",
        comunas: [
            {comuna: "Cauquenes"},
            {comuna: "Chanco"},
            {comuna: "Colbún"},
            {comuna: "Constitución"},
            {comuna: "Curepto"},
            {comuna: "Curicó"},
            {comuna: "Empedrado"},
            {comuna: "Hualañé"},
            {comuna: "Licantén"},
            {comuna: "Linares"},
            {comuna: "Longaví"},
            {comuna: "Maule"},
            {comuna: "Molina"},
            {comuna: "Parral"},
            {comuna: "Pelarco"},
            {comuna: "Pelluhue"},
            {comuna: "Pencahue"},
            {comuna: "Rauco"},
            {comuna: "Retiro"},
            {comuna: "Romeral"},
            {comuna: "Río Claro"},
            {comuna: "Sagrada Familia"},
            {comuna: "San Clemente"},
            {comuna: "San Javier de Loncomilla"},
            {comuna: "San Rafael"},
            {comuna: "Talca"},
            {comuna: "Teno"},
            {comuna: "Vichuquén"},
            {comuna: "Villa Alegre"},
            {comuna: "Yerbas Buenas"}
        ]
      },
      {
        region: "Ñuble",
        //"romanNumber": "XVI",
        //"number": "16",
        comunas: [
            {comuna: "Bulnes"},
            {comuna: "Chillán Viejo"},
            {comuna: "Chillán"},
            {comuna: "Cobquecura"},
            {comuna: "Coelemu"},
            {comuna: "Coihueco"},
            {comuna: "El Carmen"},
            {comuna: "Ninhue"},
            {comuna: "Ñiquén"},
            {comuna: "Pemuco"},
            {comuna: "Pinto"},
            {comuna: "Portezuelo"},
            {comuna: "Quillón"},
            {comuna: "Quirihue"},
            {comuna: "Ránquil"},
            {comuna: "San Carlos"},
            {comuna: "San Fabián"},
            {comuna: "San Ignacio"},
            {comuna: "San Nicolás"},
            {comuna: "Treguaco"},
            {comuna: "Yungay"}
        ]
      },
      {
        region: "Biobío",
        //"romanNumber": "VIII",
        //"number": "8",
        comunas: [
            {comuna: "Alto Biobío"},
            {comuna: "Antuco"},
            {comuna: "Arauco"},
            {comuna: "Cabrero"},
            {comuna: "Cañete"},
            {comuna: "Chiguayante"},
            {comuna: "Concepción"},
            {comuna: "Contulmo"},
            {comuna: "Coronel"},
            {comuna: "Curanilahue"},
            {comuna: "Florida"},
            {comuna: "Hualpén"},
            {comuna: "Hualqui"},
            {comuna: "Laja"},
            {comuna: "Lebu"},
            {comuna: "Los Álamos"},
            {comuna: "Los Ángeles"},
            {comuna: "Lota"},
            {comuna: "Mulchén"},
            {comuna: "Nacimiento"},
            {comuna: "Negrete"},
            {comuna: "Penco"},
            {comuna: "Quilaco"},
            {comuna: "Quilleco"},
            {comuna: "San Pedro de la Paz"},
            {comuna: "San Rosendo"},
            {comuna: "Santa Bárbara"},
            {comuna: "Santa Juana"},
            {comuna: "Talcahuano"},
            {comuna: "Tirúa"},
            {comuna: "Tomé"},
            {comuna: "Tucapel"},
            {comuna: "Yumbel"}
        ]
      },
      {
        region: "Araucanía",
        //"romanNumber": "IX",
        //"number": "9",
        comunas: [
            {comuna: "Angol"},
            {comuna: "Carahue"},
            {comuna: "Cholchol"},
            {comuna: "Collipulli"},
            {comuna: "Cunco"},
            {comuna: "Curacautín"},
            {comuna: "Curarrehue"},
            {comuna: "Ercilla"},
            {comuna: "Freire"},
            {comuna: "Galvarino"},
            {comuna: "Gorbea"},
            {comuna: "Lautaro"},
            {comuna: "Loncoche"},
            {comuna: "Lonquimay"},
            {comuna: "Los Sauces"},
            {comuna: "Lumaco"},
            {comuna: "Melipeuco"},
            {comuna: "Nueva Imperial"},
            {comuna: "Padre las Casas"},
            {comuna: "Perquenco"},
            {comuna: "Pitrufquén"},
            {comuna: "Pucón"},
            {comuna: "Purén"},
            {comuna: "Renaico"},
            {comuna: "Saavedra"},
            {comuna: "Temuco"},
            {comuna: "Teodoro Schmidt"},
            {comuna: "Toltén"},
            {comuna: "Traiguén"},
            {comuna: "Victoria"},
            {comuna: "Vilcún"},
            {comuna: "Villarrica"}
        ]
      },
      {
        region: "Los Ríos",
        //"romanNumber": "XIV",
        //"number": "14",
        comunas: [
            {comuna: "Corral"},
            {comuna: "Futrono"},
            {comuna: "La Unión"},
            {comuna: "Lago Ranco"},
            {comuna: "Lanco"},
            {comuna: "Los Lagos"},
            {comuna: "Mariquina"},
            {comuna: "Máfil"},
            {comuna: "Paillaco"},
            {comuna: "Panguipulli"},
            {comuna: "Río Bueno"},
            {comuna: "Valdivia"}
        ]
      },
      {
        region: "Los Lagos",
        //"romanNumber": "X",
        //"number": "10",
        comunas: [
            {comuna: "Ancud"},
            {comuna: "Calbuco"},
            {comuna: "Castro"},
            {comuna: "Chaitén"},
            {comuna: "Chonchi"},
            {comuna: "Cochamó"},
            {comuna: "Curaco de Vélez"},
            {comuna: "Dalcahue"},
            {comuna: "Fresia"},
            {comuna: "Frutillar"},
            {comuna: "Futaleufú"},
            {comuna: "Hualaihué"},
            {comuna: "Llanquihue"},
            {comuna: "Los Muermos"},
            {comuna: "Maullín"},
            {comuna: "Osorno"},
            {comuna: "Palena"},
            {comuna: "Puerto Montt"},
            {comuna: "Puerto Octay"},
            {comuna: "Puerto Varas"},
            {comuna: "Puqueldón"},
            {comuna: "Purranque"},
            {comuna: "Puyehue"},
            {comuna: "Queilén"},
            {comuna: "Quellón"},
            {comuna: "Quemchi"},
            {comuna: "Quinchao"},
            {comuna: "Río Negro"},
            {comuna: "San Juan de la Costa"},
            {comuna: "San Pablo"}
        ]
      },
      {
        region: "Aisén del Gral. Carlos Ibáñez del Campo",
        //"romanNumber": "XI",
        //"number": "11",
        comunas: [
            {comuna: "Aisén"},
            {comuna: "Chile Chico"},
            {comuna: "Cisnes"},
            {comuna: "Cochrane"},
            {comuna: "Coihaique"},
            {comuna: "Guaitecas"},
            {comuna: "Lago Verde"},
            {comuna: "O’Higgins"},
            {comuna: "Río Ibáñez"},
            {comuna: "Tortel"}
        ]
      },
      {
        region: "Magallanes y de la Antártica Chilena",
        //"romanNumber": "XII",
        //"number": "12",
        comunas: [
            {comuna: "Antártica"},
            {comuna: "Cabo de Hornos"},
            {comuna: "Laguna Blanca"},
            {comuna: "Natales"},
            {comuna: "Porvenir"},
            {comuna: "Primavera"},
            {comuna: "Punta Arenas"},
            {comuna: "Río Verde"},
            {comuna: "San Gregorio"},
            {comuna: "Timaukel"},
            {comuna: "Torres del Paine"}
        ]
      }
  ]
  

  lastIdPedido = -1;


  constructor(private firebaseSer: FirebaseService,
              private router: Router) { }

  ngOnInit(): void {
    //this.traerCliente();
   // this.getProductosData();
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


    this.datosFormulario(this.datos);
    //this.firebaseSer.setPedido(this.datos);
    //this.router.navigate(['/', 'nosotros']);

  }

  datosFormulario(value: any) {
    console.log(value);
    value.regiones = this.comunas[0].comuna;
    this.formData.emit(value);
  }

  cambioRegion(region:any){
   
    this.comunas = JSON.parse(region);
   console.log(JSON.parse(region)); 
   console.log(this.comunas[0].comuna);
   this.optionSelect=false;

  //  console.log(region.toString());
  //  console.log(JSON.parse(region)); 
  //  console.log(JSON.stringify(region)); 
  //  console.log(region); 


  //   var myobj = JSON.parse(JSON.stringify(region));

  //   console.log(myobj);
   
  }

  validacion(dates:any){

    //Validación caracteres en el campo nombre de la empresa
    var caracteresNombre = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\-., ]{3,50})+$/g;

    if(caracteresNombre.test(dates.nombre ) == false){
      
      return 'El campo "nombre de la empresa" de la empresa no permite tener los caracteres ingresados. Con un mínimo de 3 caracteres.';
    }

    //Validación caracteres en el campo rut de la empresa
    var caracteresRut = /(^[kK0-9\-.]{10,12})+$/g;

    if(caracteresRut.test(dates.rut ) == false){
      
      return 'El campo "RUT de la empresa" no permite tener los caracteres ingresados.';
    }

    //Validación caracteres en el campo giro
    var caracteresGiro = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ\-., ]{3,50})+$/g;

    if(caracteresGiro.test(dates.giro ) == false){
      
      return 'El campo "giro" no permite tener los caracteres ingresados. Con un mínimo de 3 caracteres.';
    }
    
    //Validación de correo
    var correo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if(correo.test(dates.email) == false){
      
      return 'Debe ingresar un correo válido.';
    }

    //Validación region
    if(dates.regiones == ''){
      return 'Seleccione una región.';
    }
    
    //Validación comuna
    if(dates.comunas == ''){
      return 'Seleccione una comuna.';
    }

    //Validación caracteres en el campo calle
    var caracteresCalle = /(^[A-Za-zÁÉÍÓÚáéíóúñÑ., ]{3,50})+$/g;

    if(caracteresCalle.test(dates.calle ) == false){
      
      return 'El campo "Calle" no permite tener los caracteres ingresados. Con un mínimo de 3 caracteres.';
    }

    //Validación caracteres en el campo nuemro de calle
    var caracteresNumCalle = /(^[0-9]{1,7})+$/g;

    if(caracteresNumCalle.test(dates.numCalle ) == false){
      
      return 'El campo "Número de Calle" no permite tener los caracteres ingresados.';
    }

    //Validación caracteres en el campo telefono
    var caracteresTelefono = /(^[0-9]{9,9})+$/g;

    if(caracteresTelefono.test(dates.telefono ) == false){
      
      return 'El campo "Teléfono" no permite tener los caracteres ingresados.';
    }
    
  }

  @HostListener("window:beforeunload", ["$event"]) async unloadHandler(event: Event) {
    console.log("Processing beforeunload...");
    console.log(this.materiales);
    // Do more processing...
    event.returnValue = false;

    await this.getProductosData();

    let cantidadPet = (this.materiales.pet.cantidad == undefined) ? 0 : this.materiales.pet.cantidad;
    let cantidadPead = (this.materiales.pead.cantidad == undefined) ? 0 : this.materiales.pead.cantidad;
    let cantidadPebd = (this.materiales.pebd.cantidad == undefined) ? 0 : this.materiales.pebd.cantidad;
    let cantidadCarton = (this.materiales.carton.cantidad == undefined) ? 0 : this.materiales.carton.cantidad;
    let cantidadAluminio = (this.materiales.aluminio.cantidad == undefined) ? 0 : this.materiales.aluminio.cantidad;

    console.log(cantidadPet);
    console.log(cantidadPead);
    console.log(cantidadPebd);
    console.log(cantidadCarton);
    console.log(cantidadAluminio);
    
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

    console.log(material);
    this.firebaseSer.reservarProducto(material);

    
  }

  /* @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(): void {
   navigator.sendBeacon('logout');
  } */

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

    console.log(this.pet.cantidad);
  }
}
