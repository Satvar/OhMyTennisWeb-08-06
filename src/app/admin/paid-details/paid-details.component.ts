import { Component, OnInit } from "@angular/core";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminComponent } from "src/app/model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-paiddetails",
  templateUrl: "./paid-details.component.html",
  styleUrls: ["./paid-details.component.scss"]
})
export class PaidComponent extends AdminComponent implements OnInit {
  public data: any = [];
  public datanew = [];

  title = "angulardatatables";
  dtOptions: DataTables.Settings = {};

  public coachId: string = "";
  public short: string = "";
  public courseId: string = "";

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
    this.getIndividualCoaches();
    setTimeout(function() {
      $("#datatable").DataTable({
        responsive: true
      });
    }, 310);
  }

  getIndividualCoaches() {
    this.coachId = this.activatedRoute.snapshot.queryParamMap.get("Coach_id");
    this.short = this.activatedRoute.snapshot.queryParamMap.get("short");
    this.courseId = this.activatedRoute.snapshot.queryParamMap.get("id");
    var dataJson = {
      coach_id: this.coachId,
      course_short_name: this.short,
      course_id: this.courseId
    };
    this.spinner.show();
    this.appService
      .create("/admin/getbookinganduserdetails", dataJson)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
        this.appService.getAll("/admin/getservice").subscribe(response => {
          if ((response as any).data.service_list.length > 0) {
            if (response && response["data"]) {
              let service_list = (response as any).data.service_list;
              console.log(service_list);
              let dat = (data as any).data.payment;
              this.data = dat.map(value => {
                //console.log("value.BookedCourse", value.BookedCourse);

                return {
                  slno: value.UserID,
                  name: value.UserFirstname + " " + value.UserLastname,
                  bookedID: value.BookedID,
                  bookedCourse: value.BookedCourse,
                  amount: value.Amount
                };
              });
              this.datanew = this.data;
            }
          }
        });
      });
  }

  goBack(coachID) {
    if (coachID) {
      this.router.navigate(["/admin/paymentdetails"], {
        queryParams: { Coach_id: coachID }
      });
    }
  }
}
