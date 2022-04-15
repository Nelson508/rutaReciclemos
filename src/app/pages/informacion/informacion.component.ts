import { Component, OnInit } from '@angular/core';

import { ModalComponent } from '../modal/modal.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  
  eyes = false;
  galeria = [
    {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-1.jpg',
     titulo: 'Reciclando pinturas',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit 1'
    },
    {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-2.jpg',
     titulo: 'Frutas ',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit 2'
    },
    {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-3.jpg',
     titulo: 'Ocupando las manos',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit 3'
    },
    {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-4.jpg',
     titulo: 'Jugo de manzana',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit 4'
    },
    {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-5.jpg',
     titulo: 'Las piñas de Perú',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit 5'
    },
    {imagen: 'https://bootstrapious.com/i/snippets/sn-gallery/img-6.jpg',
     titulo: 'Platanitos',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit 6'
    }
  ]  //fin galera

  closeResult = '';
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
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


  

  

  







}
