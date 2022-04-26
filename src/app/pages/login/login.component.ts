import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbAlert} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  accesso = {
    usuario: '',
    pass: ''
  }

  constructor() { }

  ngOnInit(): void {
  }


  Ingresar()
  {

    console.log(this.accesso.usuario +'pennywyse'+ this.accesso.pass);
    let aux1= 'admin'
    let aux2= 'pass'

    if(this.accesso.usuario === aux1 && this.accesso.pass === aux2)
    {
      alert('entrooo');
      console.log("exito");
    }
  }
  

}
