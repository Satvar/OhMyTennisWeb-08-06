import { Component, OnInit } from '@angular/core';
import { UserComponent } from '../model/user/user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Location } from '@angular/common';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})
export class UserdashboardComponent extends UserComponent implements OnInit {

  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(
      activatedRoute,
      router,
      appService,
      location,
      spinner
    );
  }

  ngOnInit() {
    var titile = document.getElementsByClassName("brand");
    if (titile)
      titile[0].innerHTML = 'TABLEAUX DE BORD';
  }

}
