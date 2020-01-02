import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminComponent } from "src/app/model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

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
  public image: Blob;

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

  // dataURItoBlob(dataURI) {
  //   var binary = atob(dataURI.split(",")[1]);
  //   var array = [];
  //   for (var i = 0; i < binary.length; i++) {
  //     array.push(binary.charCodeAt(i));
  //   }
  //   return new Blob([new Uint8Array(array)], {
  //     type: "image/jpg"
  //   });
  // }

  transform(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  getIndividualCoaches() {
    var selectedServicesList = [];
    // var selectedTransportList = [];
    // var selectedPaymentList = [];
    var myFile;
    const id = this.activatedRoute.snapshot.queryParamMap.get("Coach_id");
    //console.log(id);
    var Coach_id = {
      Coach_id: id
    };
    this.spinner.show();
    this.appService
      .create("/admin/getcoachbyid", Coach_id)
      .subscribe((data: any) => {
        //console.log("[pament-details.ts--getIndividualCoaches]", data);
        if (data.isSuccess == true) {
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
        // console.log(data);
        this.response = data.data.coach_list[0];
        this.res = data.data.coach_list[0];
        if (this.res.Coach_Image == null) {
          myFile =
            "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png";
        } else {
          myFile = this.transform(this.res.Coach_Image);
        }
        //console.log(myFile);
        this.res.Coach_Image = myFile;

        // this.filename = data.data.coach_list[0].ResumeName;
        selectedServicesList = data.data.coach_list[0].Coach_Services.split(
          ","
        );

        this.appService.getAll("/course/getcourse").subscribe(response => {
          console.log("response", response);
          if ((response as any).data.course.length > 0) {
            if (response && response["data"]) {
              let dat = (response as any).data.course;
              let data = dat.map(value => {
                return selectedServicesList.map(value1 => {
                  console.log(value1);
                  if (value.Course_Shotname === value1) {
                    return {
                      slno: value.Course_ID,
                      name: value.CourseName
                    };
                  }
                });
              });
              console.log(data);
              this.datanew = data;
            }
          }
        });
        // let serviceDataConst = [
        //   {
        //     slno: 1,
        //     name: 'CoursIndividuel'
        //   },
        //   {
        //     slno: 2,
        //     name: 'CoursCollectifOndemand'
        //   },
        //   {
        //     slno: 3,
        //     name: 'CoursCollectifClub'
        //   },
        //   {
        //     slno: 4,
        //     name: 'Stage'
        //   },
        //   {
        //     slno: 5,
        //     name: 'Tournoi'
        //   },
        //   {
        //     slno: 6,
        //     name: 'TeamBuilding'
        //   },
        //   {
        //     slno: 7,
        //     name: 'Animation'
        //   }
        // ]
        // selectedTransportList = data.data.coach_list[0].Coach_transport.split(
        //   ","
        // );
        // selectedPaymentList = data.data.coach_list[0].Coach_payment_type.split(
        //   ","
        // );
        console.log("[pament-details.components.ts]", selectedServicesList);
        // if (selectedServicesList.length > 0) {
        //   for (var i = 0; i < selectedServicesList.length; i++) {
        //     if (selectedServicesList[i] !== "") {
        //       var element = <HTMLInputElement>(
        //         document.getElementById(selectedServicesList[i])
        //       );
        //       //element.checked = true;
        //     }
        //   }
        // }

        // if (selectedTransportList.length > 0) {
        //   for (var i = 0; i < selectedTransportList.length; i++) {
        //     if (selectedTransportList[i] !== "") {
        //       var ele = <HTMLInputElement>(
        //         document.getElementById(selectedTransportList[i])
        //       );
        //       ele.checked = true;
        //     }
        //   }
        // }
        // if (selectedPaymentList.length > 0) {
        //   for (var i = 0; i < selectedPaymentList.length; i++) {
        //     if (selectedPaymentList[i] !== "") {
        //       var elem = <HTMLInputElement>(
        //         document.getElementById(selectedPaymentList[i])
        //       );
        //       elem.checked = true;
        //     }
        //   }
        // }
      });
  }

  getCoachIndividualData(id) {
    // let coachID = CryptoJS.AES.encrypt(id, "").toString();
    // console.log("[payments.component.ts--getCoachIndividualData--] ", coachID);
    if (id) {
      this.router.navigate(["/admin/paymentdetails"], {
        queryParams: { coach_id: id }
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
