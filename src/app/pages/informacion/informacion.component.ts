import { Component, OnInit } from '@angular/core';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css'],
  styles: [`
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
    `]
})
export class InformacionComponent implements OnInit {
  //Información útil que explico porque soy muy amable
  //Se envia la variable Informacion a menu al comienzo del HTML y de esta manera se activa 
  //la letra verde ya que el menu es componente que se renderiza 
  Informacion = 'active';
  
  eyes = false;

  galeria: any = [];
  arrayVacio: boolean = true;
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
  // ]  //fin galera

  closeResult = '';
  constructor(private modalService: NgbModal,
              private firebaseSer: FirebaseService) { }

  ngOnInit(): void {
    this.traerInformacion();
  }

  changeEyes()
  {
    var aux = this.eyes;
    this.eyes = !aux;
  }

  // openDialog()
  // {
  //   this.dialogRef.open(ModalComponent);
  // }
  open(content:any) {
    this.modalService.open(content,{ size: 'md' }).result.then((result) => {
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
    console.log(valores);

    if (valores != null) {
      this.arrayVacio = false;
      this.galeria = valores; 
    } 

  }


}
