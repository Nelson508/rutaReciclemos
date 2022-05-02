import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbAlert} from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import {FirebaseService} from '../../services/firebase.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  accesso = {
    usuario: '',
    pass: '',
  }

  dathax: any;

  constructor(private firebaseSer: FirebaseService) { }

  ngOnInit(
    
  ){
    
  }


  async Ingresar()
  {

    console.log(this.accesso.usuario +' '+ this.accesso.pass);


    //this.getUserData();
    await this.firebaseSer.getData().then( data =>
      {
        // console.log('then: ' + data['1']['pass'] + data['1']['user'] );
        this.dathax = data;

      });
      
    // console.log(`datita : ${this.dathax}`);
    const usr:string = this.dathax['1']['user'];
    const pss:string = this.dathax['1']['pass'];
    console.log('U: ' + usr + 'P: ' + pss);
    

    if(this.accesso.usuario == usr && this.accesso.pass == pss)
    {
      // alert('entrooo');https://sweetalert2.github.io/#examples
      //https://jasonwatmore.com/post/2020/07/20/nodejs-hash-and-verify-passwords-with-bcrypt
      //https://www.code-sample.com/2019/10/angular-10-9-8-7-password-encryption.html
      //https://www.youtube.com/watch?v=YptxFewWxqQ&ab_channel=TechClubTajamar
      console.log("exito");
      Swal.fire({
        icon: 'success',
        title:'Inicio exitoso',
        text:'Bienvenida',
        confirmButtonText:
        ' Gracias <i class="fa fa-thumbs-up"></i>'
        // showClass: {
        //   popup: 'animate__animated animate__fadeInDown'
        // },
        // hideClass: {
        //   popup: 'animate__animated animate__fadeOutUp'
        // }
        
        
        
      });

      this.accesso.usuario = '';
      this.accesso.pass = '';
    }else{
      Swal.fire({
        icon: 'error',
        title:'Claves invalidas',
        text:'Intente nuevamente',
        confirmButtonText:
    ' Me vale mierdas <i class="fa fa-thumbs-up"></i>',
        
        
      });
    }
  }


  async getUserData()
  {
  
  // this.firebaseSer.getUData().subscribe(
  //   res => {
  //     console.log(res);

  //   }
  // )
  await this.firebaseSer.getUData();
  console.log('LoginSide: ' + this.dathax);
  
  
    
  }


  
  

}
