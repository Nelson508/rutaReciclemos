import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {

  public previsualizacion: string = '';
  public archivos: any = [];
  compra = {
    _id:0,
    titulo: '',
    descripcion: null,
    imagen:null
  }

  flagFinalizar = false;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
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
        this.previsualizacion = imagen.base;
        this.compra.imagen = imagen.base;
      })
      this.archivos.push(archivoCapturado);
      this.flagFinalizar = true;
      
    }
    


  }


  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
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

}
