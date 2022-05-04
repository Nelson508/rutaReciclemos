import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbAlert} from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import {FirebaseService} from '../../services/firebase.service'
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  accesso = {
    usuario: 'Admin',
    pass: 'Trans-1x7/Z1',
  }
  //variables de login
  dathax: any;
  encrypted: string = '';
  decrypted: string = '';
  TT: string = '';

  status: any;

  constructor(private firebaseSer: FirebaseService,
              private router: Router) { }

  ngOnInit(
    
  ){
    
  }


  async Ingresar()
  {

    


    //this.getUserData();
    await this.firebaseSer.getData().then( data =>
      {
        this.dathax = data;

      });
      
    //dathax almacena toda la  user informacion proveniente from BD
    const usr:string = this.dathax['1']['user'];
    this.encrypted = this.dathax['1']['pass'];
    this.TT = this.dathax['1']['T'];
    
    await this.decryptUsingAES256();
    


    

    if(this.accesso.usuario == usr && ('"'+this.accesso.pass+'"') == this.decrypted)
    {
      //https://sweetalert2.github.io/#examples
 
      //TOKEN CREATION
      
      this.status = this.dathax['1']['key'];
      

      localStorage.setItem("tk", JSON.stringify(this.status));
      let status = localStorage.getItem("tk");
    
      if(status)
        {
          status = JSON.parse(status);
          console.log(status);
        }else{
          console.log('nada oiga')
        }

        this.firebaseSer.getKey().then( data =>
          {
            let key = data['key'];
            console.log('KEY:' + key)
            
          });
  
      

      

      //TOKEN CREATION


      //INICIO SWAL FIREE
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
      this.router.navigate(['/', 'administracion'])

    }else{
      Swal.fire({
        icon: 'error',
        title:'Claves invalidas',
        text:'Intente nuevamente',
        confirmButtonText:
        'Aceptar <i class="fa fa-thumbs-up"></i>',
        
        
      });
    }

    //FIN SWALFIREE
  }


 

  decryptUsingAES256() {
    let _key = CryptoJS.enc.Utf8.parse(this.TT);
    let _iv = CryptoJS.enc.Utf8.parse(this.TT);


    this.decrypted = CryptoJS.AES.decrypt(
      this.encrypted, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
  }

  


  
  

}
