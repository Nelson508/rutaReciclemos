import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  classy = 'active'
  @Input() Nosotros:any;
  @Input() Informacion:any;
  @Input() Productos:any;

  constructor() { }

  ngOnInit(): void {
  }

}
