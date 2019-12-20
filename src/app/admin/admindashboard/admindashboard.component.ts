import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminComponent } from 'src/app/model/admin/admin.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.scss']
})
export class AdmindashboardComponent extends AdminComponent implements OnInit {
  public rowDataCollection: any = [];
  public data: any = [];
  public Fdata: any = [];
  public datanew = [];
//   public datanew = [
//     {slno:'1', name: 'Mark', location: 'Location 1', servicetype:'Individual', paymentstatus:'Success'},
//     {slno:'2', name: 'Kennedy', location: 'Location 2', servicetype:'Individual', paymentstatus:'Re-Schedule'},
//     {slno:'3', name: 'Sara', location: 'Location 3', servicetype:'Group', paymentstatus:'Reject'},
//     {slno:'4', name: 'Antony', location: 'Location 4', servicetype:'Individual', paymentstatus:'Success'},
//     {slno:'5', name: 'John', location: 'Location 5', servicetype:'Group', paymentstatus:'Success'},
//     {slno:'6', name: 'Mariya', location: 'Location 6', servicetype:'Individual', paymentstatus:'Re-Schedule'},
//     {slno:'7', name: 'Srijith', location: 'Location 7', servicetype:'Individual', paymentstatus:'Reject'},
//     {slno:'8', name: 'Stephy', location: 'Location 8', servicetype:'Group', paymentstatus:'Success'},
//     {slno:'9', name: 'Buela', location: 'Location 9', servicetype:'Individual', paymentstatus:'Success'},
//     {slno:'10', name: 'Mark', location: 'Location 10', servicetype:'Individual', paymentstatus:'Re-Schedule'},
//     {slno:'11', name: 'Mark', location: 'Location 11', servicetype:'Group', paymentstatus:'Success'},
//     {slno:'12', name: 'Mark', location: 'Location 12', servicetype:'Individual', paymentstatus:'Re-Schedule'},
//     {slno:'13', name: 'Mark', location: 'Location 13', servicetype:'Group', paymentstatus:'Reject'},
//     {slno:'14', name: 'Mark', location: 'Location 14', servicetype:'Individual', paymentstatus:'Success'},
//     {slno:'15', name: 'Mark', location: 'Location 15', servicetype:'Group', paymentstatus:'Reject'},
// ];
  title = 'angulardatatables';
  coachcount:any;
  usercount:any;
  courtcount:any;

  dtOptions: DataTables.Settings = {};
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
    this.getallbookings();
    this.getallcounts();
    setTimeout(function(){
      $('#datatable').DataTable( {
      responsive: true
      } );
      }, 210);
  }
 
  getallbookings(){
      this.appService.getAll('/admin/getallbookings')
      .subscribe(response => {
        if ((response as any).data.booking_list.length > 0) {
          if (response && response['data']) {
            let dat = (response as any).data.booking_list;
            
            //console.log(dat);
              let data = dat.map(value=>{
                return {
                  "slno":value.booking_Id,
                  "name": value.firstName+' '+value.lastName,
                  "location": value.postalCode,
                  "servicetype" : value.bookingCourse,
                  "paymentstatus" : value.status
                }
              });
              this.datanew = data;
             
          }
        }
      });
    
  }

  getallcounts(){
    this.appService.getAll('/admin/getallcount')
    .subscribe(response => {
      if (response && response['data']) {
          var data = response['data'];
          console.log(data);
        this.courtcount = data.courtcount;
        this.coachcount = data.coachcount;
        this.usercount = data.userscount;
      }
    });
  
}
}
