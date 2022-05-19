import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { DomSanitizer } from '@angular/platform-browser';
import {FirebaseService} from '../../services/firebase.service';
import Swal from 'sweetalert2';
//import { QuillModule } from 'ngx-quill'
//import Quill from 'quill';
//import { QuillType } from 'quill';
//import QuillType from 'quill';




@Component({
  selector: 'app-informaciones',
  templateUrl: './informaciones.component.html',
  styleUrls: ['./informaciones.component.css']
})
export class InformacionesComponent implements OnInit {

  @Input() desactivado:boolean = false;

  public previsualizacion: string = '';
  public archivos: any = [];
  public loading: boolean = false;
  nuevaImg: any;
  galeria: any = [];
  max_Id: number=0;

  publicacion = {
    _id:0,
    titulo: '',
    descripcion: '',
    imagen:''
  }

  // galeria = [
  //   {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-1.jpg',
  //    titulo: 'Ruta Reciclemos lanza App a Play Store.',
  //   descripcion: 'Se lograron más de 1.000 descargas en la primera semana.'
  //   },
  //   {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-2.jpg',
  //    titulo: 'Ruta Reciclemos amplía su zona de recolección junto con su horario.',
  //   descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit 2'
  //   },
  //   {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-3.jpg',
  //    titulo: '5 entretenidas formas de reutilizar tus botellas plasticas.',
  //   descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit 3'
  //   },
  //   {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-4.jpg',
  //    titulo: '¿Por qué es importante lavar bien nuestros envases ?',
  //   descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit 4'
  //   },
  //   {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-5.jpg',
  //    titulo: 'Las piñas de Perú',
  //   descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit 5'
  //   },
  //   {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-6.jpg',
  //    titulo: 'Encuentran polimero cancerigeno en platano',
  //   descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit 6'
  //   }
  // ] 
  modalReference: NgbModalRef = this.modalService.open('');
  closeResult = '';

  modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      
     
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      ['link'],                         // link and image, video ['link', 'image', 'video']
     
      // ['blockquote', 'code-block'],

      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      // [{ 'direction': 'rtl' }],                         // text direction
      //['clean'],                                         // remove formatting button      
     
      //[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    
    ]        
  }
  constructor(private modalService: NgbModal,
              private sanitizer: DomSanitizer,
              private firebaseSer: FirebaseService) { }

  ngOnInit() {
    this.modalReference.close();
    this.traerInformacion();
   
    
    /* const quill = new Quill('#editor-container', {
      modules: {
        toolbar: {
          container: '#toolbar-toolbar'
        }
      },
      placeholder: 'Compose an epic...',
      theme: 'snow'
    }); */

    /* const quill = new Quill('editor', {
      
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block']                       // link and image, video
        ]
                
      }
    }); */
    
  }

  open(content:any) {
    this.previsualizacion = '';
    this.modalReference = this.modalService.open(content,{ size: 'md' });
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

  async traerInformacion(){
    
    let valores = await this.firebaseSer.getInformaciones();
    //console.log(valores);

    this.galeria = valores; 

    this.ultimoId();
    //console.log(this.max_Id);
  }

  changedEditor(e:EditorChangeContent | EditorChangeSelection){
    
    //console.log('editor got changed',e);
    //this.editorContent = e.editor.root.innerHTML;
  }

  capturarFile(e:any){
    const archivoCapturado = e.target.files[0];
    this.extraerBase64(archivoCapturado).then( (imagen:any) =>{
      this.previsualizacion = imagen.base;
      this.publicacion.imagen = imagen.base;
      console.log(imagen.base);
    })
    this.archivos.push(archivoCapturado);


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

  async ultimoId(){
    let largo = Object.keys(this.galeria).length;

    //console.log(this.galeria);
  
    for (let i = 0; i < largo; i++) {     

      this.max_Id = this.galeria[i]['_id'];   
     // console.log(this.max_Id);
    }

  }

  nuevoRegistro(){

    console.log('maximo id:'+ this.max_Id);

    let nuevoId = this.max_Id + 1;

    let consulta = this.firebaseSer.setInformaciones(nuevoId, this.publicacion);

    this.modalReference.close();

    this.max_Id = nuevoId;

    this.galeria.push(this.publicacion);

    console.log('nuevo id:'+this.max_Id);
    
  }


  async guardarCambios(values: any){
    /* console.log('Form values', values)
    console.log('Id', values._id)
    console.log('Titulo', values.titulo)
    console.log('Descripcion', values.descripcion) */
    //console.log('Imagen', values.imagen)
    //console.log('Previsualizacion', this.previsualizacion)

    try {
      this.loading = true;
      if(this.previsualizacion != ''){
        values.imagen = this.previsualizacion;
        //this.galeria[values._id].imagen = values.imagen;
      }
      await this.firebaseSer.updateInformaciones(values);
      await this.traerInformacion();
      //this.galeria[values._id].titulo =  values.titulo;
      //this.galeria[values._id].descripcion =  values.descripcion;
      this.modalReference.close();
      this.loading = false;
      
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);
    }


    // try {
    //   this.loading = true;
    //   const formularioDeDatos = new FormData();
    //   this.archivos.forEach((archivo:any) => {
    //     formularioDeDatos.append('files', archivo);
    //     console.log(archivo);
    //   })

 
      

    //   this.firebaseSer.updateInformaciones(this.publicacion._id, this.publicacion);
    //   this.modalReference.close();
    //   this.loading = false;



    //   // formularioDeDatos.append('_id', 'MY_ID_123')
    //   this.rest.post(`http://localhost:3001/upload`, formularioDeDatos)
    //     .subscribe(res => {
    //       this.loading = false;
    //       console.log('Respuesta del servidor', res);

    //     }, () => {
    //       this.loading = false;
    //       alert('Error');
    //     })


    // } catch (e) {
    //   this.loading = false;
    //   console.log('ERROR', e);
    // }

  }

  
  eliminarRegistro = async(id:number) => {

    Swal.fire({
      title: 'Está segura que desea eliminar esta publicación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar'
    }).then(async(result) => {
      if (result.isConfirmed) {

        await this.firebaseSer.eliminarInformacion(id);
        await this.traerInformacion();
        //this.galeria[id].eliminado = true;
      }
    })

    

    //console.log(eliminado);

    //INICIO SWAL FIREE
  //   Swal.fire({
  //     icon: 'success',
  //     title:'Inicio exitoso',
  //     text:'Bienvenida',
  //     confirmButtonText:
  //     ' Gracias <i class="fa fa-thumbs-up"></i>'
  //     // showClass: {
  //     //   popup: 'animate__animated animate__fadeInDown'
  //     // },
  //     // hideClass: {
  //     //   popup: 'animate__animated animate__fadeOutUp'
  //     // }
      
      
      
  //   });
  }
  

}
