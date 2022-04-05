import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {
  
  eyes = false;
  constructor() { }

  ngOnInit(): void {
  }

  changeEyes()
  {
    var aux = this.eyes;
    this.eyes = !aux;
  }

}
