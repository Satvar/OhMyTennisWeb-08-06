import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var titile = document.getElementsByClassName("brand");
    if (titile)
      titile[0].innerHTML = 'TABLEAUX DE BORD';
  }

}
