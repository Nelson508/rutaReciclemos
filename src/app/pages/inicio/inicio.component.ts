import { Component, OnInit } from '@angular/core';

import {FirebaseService} from '../../services/firebase.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent implements OnInit {
  mostrarTexto1 = false;
  mostrarTexto2 = false;
  mostrarTexto3 = false;
  mostrarTexto4 = false;
  mostrarTexto5 = false;
  //variables para suma total de materiales reciclados
  dathax:any;
  SUMPET: number = 0;
  SUMPEAD: number = 0;
  SUMPEBD:number = 0;
  SUMCARTON:number = 0;
  SUMLATAS:number = 0;
  pet = {
    valor: 0,
    tipo: ''
  }

  pead = {
    valor: 0,
    tipo: ''
  }

  pebd= {
    valor: 0,
    tipo: ''
  }
  carton= {
    valor:0,
    tipo: ''
  }
  latas= {
    valor: 0,
    tipo:''
  }

  constructor(private firebaseSer: FirebaseService) { }

  async ngOnInit()
  {
   await  this.obtenerRutasCompletadas();
  }

  /* agregarTexto(aux: number){
    this.mostrarTexto1 = (aux==1) ? !this.mostrarTexto1: false;
    this.mostrarTexto2 = (aux==2) ? !this.mostrarTexto2: false;
    this.mostrarTexto3 = (aux==3) ? !this.mostrarTexto3: false;
    this.mostrarTexto4 = (aux==4) ? !this.mostrarTexto4: false;
    this.mostrarTexto5 = (aux==5) ? !this.mostrarTexto5: false;
  } */


  hoverStateIn(aux: any){
    this.mostrarTexto1 = (aux==1) ? true : false;
    this.mostrarTexto2 = (aux==2) ? true : false;
    this.mostrarTexto3 = (aux==3) ? true : false;
    this.mostrarTexto4 = (aux==4) ? true : false;
    this.mostrarTexto5 = (aux==5) ? true : false;
  }

  hoverStateOut(){
    this.mostrarTexto1 = false;
    this.mostrarTexto2 = false;
    this.mostrarTexto3 = false;
    this.mostrarTexto4 = false;
    this.mostrarTexto5 = false;
  }

  public touchDown(aux: number) {
    this.mostrarTexto1 = (aux==1) ? !this.mostrarTexto1 : false;
    this.mostrarTexto2 = (aux==2) ? !this.mostrarTexto2 : false;
    this.mostrarTexto3 = (aux==3) ? !this.mostrarTexto3 : false;
    this.mostrarTexto4 = (aux==4) ? !this.mostrarTexto4 : false;
    this.mostrarTexto5 = (aux==5) ? !this.mostrarTexto5 : false;
  }

  /* public touchLeave() {
    this.mostrarTexto1 = false;
    this.mostrarTexto2 = false;
    this.mostrarTexto3 = false;
    this.mostrarTexto4 = false;
    this.mostrarTexto5 = false;
  }
  
  public touchUp() {
    this.mostrarTexto1 = false;
    this.mostrarTexto2 = false;
    this.mostrarTexto3 = false;
    this.mostrarTexto4 = false;
    this.mostrarTexto5 = false;
  } */


  async obtenerRutasCompletadas()
  {
   await this.firebaseSer.getRutasCompletadas().then(
     data =>
      {
        this.dathax = data;
        console.log(data);
        let largo = Object.keys(this.dathax).length;
        
         for (let i = 1; i < largo; i++) {

          
          
          this.SUMPET +=  parseFloat(this.dathax[i].kilosreciclaje1);
          this.SUMPEAD += parseFloat(this.dathax[i].kilosreciclaje2);
          this.SUMPEBD += parseFloat(this.dathax[i].kilosreciclaje3);
          this.SUMCARTON += parseFloat(this.dathax[i].kilosreciclaje4);
          this.SUMLATAS += parseFloat(this.dathax[i].kilosreciclaje5);

          this.SUMPET = Math.round((this.SUMPET + Number.EPSILON) * 100) / 100;
          this.SUMPEAD = Math.round((this.SUMPEAD + Number.EPSILON) * 100) / 100;
          this.SUMPEBD = Math.round((this.SUMPEBD + Number.EPSILON) * 100) / 100;
          this.SUMCARTON = Math.round((this.SUMCARTON + Number.EPSILON) * 100) / 100;
          this.SUMLATAS = Math.round((this.SUMLATAS + Number.EPSILON) * 100) / 100;
          
          //console.log(this.info[i]);
          // let total = this.pet + this.pead + this.pebd + this.carton + this.latas;
          //console.log(PET,PEAD,PEBD,carton,latas);
          
          //console.log(total);
          

         
          // console.log('PET:' +this.SUMPET + 'PEAD: ' + this.SUMPEAD + 'PEBD: ' +this.SUMPEBD + 'Carton: ' + this.SUMCARTON + 'Latas:' + this.SUMLATAS)
          //asignacion de variables
          
          this.pet.valor = this.SUMPET;
          if(this.SUMPET> 1001)
          {
            this.pet.tipo = 'TONS'
            this.pet.valor = this.pet.valor/1000;
            this.pet.valor = Math.round((this.pet.valor + Number.EPSILON) * 100) / 100;
          }else{
            this.pet.tipo = 'KG'
          }


          this.pead.valor = this.SUMPEAD;
          if(this.SUMPEAD > 1001)
          {
            this.pead.tipo = 'TONS';
            this.pead.valor = this.pead.valor/1000;
            this.pead.valor = Math.round((this.pead.valor + Number.EPSILON) * 100) / 100;
          }else{
            this.pead.tipo = 'KG'
          }

          this.pebd.valor = this.SUMPEBD;
          if(this.SUMPEBD > 1001)
          {
            this.pebd.tipo = 'TONS';
            this.pebd.valor = this.pebd.valor/1000;
            this.pebd.valor = Math.round((this.pebd.valor + Number.EPSILON) * 100) / 100;
          }else{
            this.pebd.tipo = 'KG'
          }

          this.carton.valor = this.SUMCARTON;
          if(this.SUMCARTON > 1001)
          {
            this.carton.tipo = 'TONS';
            this.carton.valor = this.carton.valor/1000;
            this.carton.valor = Math.round((this.carton.valor + Number.EPSILON) * 100) / 100;
          }else{
            this.carton.tipo = 'KG';
          }

          this.latas.valor = this.SUMLATAS;
          if(this.SUMLATAS > 1001)
          {
            this.latas.tipo = 'TONS'
            this.latas.valor =this.latas.valor/1000;
            this.latas.valor = Math.round((this.latas.valor + Number.EPSILON) * 100) / 100;
          }else{
            this.latas.tipo = 'KG';
          }
          
          

        }

        
        
      }
    )

   
    

  }
}

