import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import {FirebaseService} from '../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {

  @Input() datosInsercion: any = {
    
    _id: 0,
    datosCliente : {
      nombre:'',
      rut:'',
      giro:'',
     /*  direccion:'', */
      email:'',
      telefono: '',
      regiones: '',
      comunas: '',
      calle: '',
      numCalle: ''
    },
    materiales : {
      pet: {},
      pead: {},
      pebd: {},
      carton: {},
      aluminio: {},
      total: 0,
    },
    comprobante: '',
    fechaCompra:'',
    horaCompra:'' 
  };

  public previsualizacion: string = '';
  public archivos: any = [];
  compra = {
    _id:0,
    titulo: '',
    descripcion: null,
    imagen: ''
  }

 /*  datosInsercion:any = {
    materiales: {},
    datosCliente: {},
    comprobante: ''
  };
 */
  flagFinalizar = false;

  constructor(private sanitizer: DomSanitizer,
              private firebaseSer: FirebaseService,
              private router: Router) { }

  ngOnInit(): void {
  }


  compraFinalizada()
  {
    this.datosInsercion.comprobante = this.compra.imagen;
    console.log(this.datosInsercion);
    /* El método getTimezoneOffset() devuelve la diferencia, 
    en minutos, entre una fecha evaluada en la zona horaria UTC y 
    la misma fecha evaluada en la zona horaria local. 
    Luego se multiplican los minutos por 60000 obteniedo la diferencia horaria en milisegundos */
    let diferenciaZonaHorariaLocal = (new Date()).getTimezoneOffset() * 60000;
    let localTime = (new Date(Date.now() - diferenciaZonaHorariaLocal)).toISOString();
    let fechaCompra = localTime.slice(0, 10);
    let horaCompra = localTime.slice(11, 19);


    console.log(fechaCompra);
    console.log(horaCompra);
    this.datosInsercion.fechaCompra = fechaCompra;
    this.datosInsercion.horaCompra = horaCompra;
    this.firebaseSer.setPedido(this.datosInsercion);

    Swal.fire({
      title: 'Su compra se ha efectuado exitosamente',
      icon: 'success',
      text: `Gracias por gestionar sus reciclos a través de Ruta Reciclemos. Su transferencia será revisada a través del sistema y posteriormente se le enviará la "Factura de su compra" al correo que nos indicó.`,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    }).then(async(result) => {
      if (result.isConfirmed) {
        window.location.reload();
       /*  this.router.navigate(['/', 'productos']); */
      }
    });
  }

  capturarFile(e:any){
    const archivoCapturado = e.target.files[0];

    if(archivoCapturado.type !== 'image/png' && archivoCapturado.type !== 'image/jpg' && archivoCapturado.type !== 'image/jpeg' && archivoCapturado.type !== 'application/pdf'){
      
      Swal.fire({
        title: 'Error, el archivo ingresado no es una imagen',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });
    }else if(archivoCapturado.size > 10485760){

      Swal.fire({
        title: 'Error, la imagen ingresada no puede superar los 10MB',
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      });

    }else{

      

      
  
      this.extraerBase64(archivoCapturado).then( (imagen:any) =>{
        console.log(imagen);
        this.previsualizacion = imagen.base;
        this.compra.imagen = imagen.base;
      })
      this.archivos.push(archivoCapturado);
      this.flagFinalizar = true;
      
    }
    


  }


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      console.log($event);
      // const unsafeImg = window.URL.createObjectURL($event);
      // const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  encodeImageFileAsURL(e:any) {

    const archivoCapturado = e.target.files[0];
    console.log(archivoCapturado)
    if (archivoCapturado.length > 0) {
      var fileToLoad = archivoCapturado;

      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadedEvent:any) {
        var srcData = fileLoadedEvent.target.result; // <--- data: base64

        var newImage = document.createElement('img');
        newImage.src = srcData;
        console.log(srcData);

        
      }
      fileReader.readAsDataURL(fileToLoad);
    }else{
      console.log('no entro')
    }
  }

  
 
}
