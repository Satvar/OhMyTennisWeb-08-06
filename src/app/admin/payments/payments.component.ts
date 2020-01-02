import { Component, OnInit } from "@angular/core";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminComponent } from "src/app/model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-payments",
  templateUrl: "./payments.component.html",
  styleUrls: ["./payments.component.scss"]
})
export class PaymentsComponent extends AdminComponent implements OnInit {
  public rowDataCollection: any = [];
  public data: any = [];
  public Fdata: any = [];
  public datanew = [];

  title = "angulardatatables";
  coachcount: any;
  usercount: any;
  courtcount: any;

  dtOptions: DataTables.Settings = {};
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }
  ngOnInit() {
    this.getallcoaches();
    setTimeout(function() {
      $("#datatable").DataTable({
        responsive: true
      });
    }, 310);
  }

  getallcoaches() {
    console.log("[payments.componets.ts--getallcoaches--]");
    this.appService.getAll("/admin/getallcoach").subscribe(response => {
      console.log("response", response);
      if ((response as any).data.coach_list.length > 0) {
        if (response && response["data"]) {
          let dat = (response as any).data.coach_list;
          let data = dat.map(value => {
            return {
              slno: value.Coach_ID,
              name: value.Coach_Fname + " " + value.Coach_Lname
            };
          });
          this.datanew = data;
        }
      }
    });
  }

  getCoachIndividualData(id) {
    // let coachID = CryptoJS.AES.encrypt(id, "").toString();
    // console.log("[payments.component.ts--getCoachIndividualData--] ", coachID);
    if (id) {
      this.router.navigate(["/admin/paymentdetails"], {
        queryParams: { Coach_id: id }
      });
    }
    console.log("[payments.component.ts--] ", id);
  }

  // getallcounts() {
  //   this.appService.getAll("/admin/getallcount").subscribe(response => {
  //     if (response && response["data"]) {
  //       var data = response["data"];
  //       //console.log(data);
  //       this.courtcount = data.courtcount;
  //       this.coachcount = data.coachcount;
  //       this.usercount = data.userscount;
  //     }
  //   });
  // }
}
