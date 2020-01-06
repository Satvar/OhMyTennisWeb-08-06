import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminComponent } from "src/app/model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
// import * as Stripe from "stripe";
// const stripe = new Stripe("pk_test_ppbf90Eyy5PuXBdNQNLpxVuz00e719Y31R");

@Component({
  selector: "app-paymentdetails",
  templateUrl: "./payment-details.component.html",
  styleUrls: ["./payment-details.component.scss"]
})
export class PaymentdetailsComponent extends AdminComponent implements OnInit {
  public res = {
    Coach_Fname: "",
    Coach_Lname: "",
    Coach_Email: "",
    Coach_Phone: "",
    InstagramURL: "",
    FacebookURL: "",
    TwitterURL: "",
    Coach_Description: "",
    Coach_Rayon: "",
    Coach_Price: "",
    Coach_Services: "",
    Coach_PriceX10: "",
    Coach_Bank_Name: "",
    Coach_Bank_ACCNum: "",
    Branch_Code: "",
    Coach_Bank_City: "",
    Coach_Image:
      "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png",
    Coach_Resume: ""
  };
  public rowDataCollection: any = [];
  public data: any = [];
  public Fdata: any = [];
  public datanew = [];
  //public image: Blob;

  title = "angulardatatables";
  coachcount: any;
  usercount: any;
  courtcount: any;
  public response: any;
  public filename: string = "";
  dtOptions: DataTables.Settings = {};
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService,
    private sanitizer: DomSanitizer
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

  transform(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  getIndividualCoaches() {
    var selectedServicesList = [];
    var myFile;
    const id = this.activatedRoute.snapshot.queryParamMap.get("Coach_id");
    var Coach_id = {
      Coach_id: id
    };
    this.spinner.show();
    this.appService
      .create("/admin/getcoachbyid", Coach_id)
      .subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
        this.response = data.data.coach_list[0];
        this.res = data.data.coach_list[0];
        if (this.res.Coach_Image == null) {
          myFile =
            "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png";
        } else {
          myFile = this.transform(this.res.Coach_Image);
        }
        this.res.Coach_Image = myFile;
        selectedServicesList = data.data.coach_list[0].Coach_Services.split(
          ","
        );

        this.appService.getAll("/course/getcourse").subscribe(response => {
          if ((response as any).data.course.length > 0) {
            if (response && response["data"]) {
              let dat = (response as any).data.course;
              let servData = [];
              for (let i = 0; i < dat.length; i++) {
                for (let j = 0; j <= selectedServicesList.length; j++) {
                  if (dat[i].Course_Shotname == selectedServicesList[j]) {
                    servData.push({
                      id: dat[i].Course_ID,
                      service: dat[i].CourseName,
                      shortName: dat[i].Course_Shotname,
                      coachID: id
                    });
                  }
                }
              }
              this.datanew = servData;
            }
          }
        });
      });
  }

  paidDetails(id, coachID, shortName) {
    if (id && coachID && shortName) {
      this.router.navigate(["/admin/paiddetails"], {
        queryParams: { id: id, Coach_id: coachID, short: shortName }
      });
    }
  }

  goBack() {
    this.router.navigate(["/admin/payments"], {
      queryParams: {}
    });
  }

  connect() {
    this.setConnect(this.appService);
  }

  setConnect(appService) {
    var data = this.response;
    console.log("[payment-details.component.ts]--connect");
    (<any>window).Stripe.bankAccount.createToken(
      {
        country: "US",
        currency: "USD",
        routing_number: "111000025",
        account_number: "000123456789",
        account_holder_name: "Jane Austen",
        account_holder_type: "individual"
      },
      function(status, response) {
        console.log(
          "[payment-details.component.ts]--stripeResponseHandler",
          status,
          response
        );

        var res = {
          status: status,
          response: response
        };
        appService
          .create("/admin/createcustomerac", res)
          .subscribe(response => {
            console.log(response);
          });
      }
    );
  }
  // stripeResponseHandler(status, response) {
  //   console.log(
  //     "[payment-details.component.ts]--stripeResponseHandler",
  //     status,
  //     response
  //   );
  //   if (response.error) {

  //   } else {
  //     var token = response.id;
  // this.appService.getAll("/course/getcourse").subscribe(response => {
  //   console.log("1");
  // });

  //     console.log(
  //       "[payment-details.component.ts]--stripeResponseHandler",
  //       token
  //     );
  //   }
  // }
}
