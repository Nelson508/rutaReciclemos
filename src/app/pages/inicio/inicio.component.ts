import { Component, OnInit } from '@angular/core';

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

  hover: boolean = false;

  constructor() { }

  ngOnInit(): void {}

  /* agregarTexto(aux: number){
    this.mostrarTexto1 = (aux==1) ? !this.mostrarTexto1: false;
    this.mostrarTexto2 = (aux==2) ? !this.mostrarTexto2: false;
    this.mostrarTexto3 = (aux==3) ? !this.mostrarTexto3: false;
    this.mostrarTexto4 = (aux==4) ? !this.mostrarTexto4: false;
    this.mostrarTexto5 = (aux==5) ? !this.mostrarTexto5: false;
  } */


  hoverStateIn(aux: any){
    this.mostrarTexto1 = (aux==1) ? true: false;
    this.mostrarTexto2 = (aux==2) ? true: false;
    this.mostrarTexto3 = (aux==3) ? true: false;
    this.mostrarTexto4 = (aux==4) ? true: false;
    this.mostrarTexto5 = (aux==5) ? true: false;
  }

  hoverStateOut(){
    this.mostrarTexto1 = false;
    this.mostrarTexto2 = false;
    this.mostrarTexto3 = false;
    this.mostrarTexto4 = false;
    this.mostrarTexto5 = false;
  }

}

