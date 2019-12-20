import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Location } from '@angular/common';
import { BrowserModule, Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AppService } from '../../shared/app.service';
import {AdminComponent} from '../../model/admin/admin.component';
/* [ Spinner ] */
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-adminleftpanel',
  templateUrl: './adminleftpanel.component.html',
  styleUrls: ['./adminleftpanel.component.scss']
})
export class AdminleftpanelComponent extends AdminComponent implements OnInit {

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
  }

  leftPanel() {
    return [{
      title : 'TABLEAUX DE BORD',
      path: '/' + this._const('PATH.ADMIN.SELF') + '/' + this._const('PATH.ADMIN.DASHBOARD.SELF'),
      iclass: 'fa fa-th-large',
      style: false,
    },{
      title : 'LES SERVICE',
      path: '/' + this._const('PATH.ADMIN.SELF') + '/' + this._const('PATH.ADMIN.ADMINSERVICE.SELF'),
      iclass: 'fa fa-cogs',
      style: false,
    }, {
      title : 'COURT DE TENNIS',
      path: '/' + this._const('PATH.ADMIN.SELF') + '/' + this._const('PATH.ADMIN.CLUBLIST.SELF'),
      iclass: 'fa fa-map-marker',
      style: false,
    
    }, {
      title : 'ENTRAÎNEURS',
      path: '/' + this._const('PATH.ADMIN.SELF') + '/' + this._const('PATH.ADMIN.COACHLIST.SELF'),
      iclass: 'fa fa-users',
      style: false,
    }, {
      title : 'PERSPECTIVES',
      path: '/' + this._const('PATH.ADMIN.SELF') + '/' + this._const('PATH.ADMIN.PROSPECTUSLIST.SELF'),
      iclass: 'fa fa-users',
      style: false,
    
    }, {
      title : 'ADMINLIST',
      path: '/' + this._const('PATH.ADMIN.SELF') + '/' + this._const('PATH.ADMIN.ADIMLIST.SELF'),
      iclass: 'fa fa-users',
      style: false,
    
    }];
  }
  
}
