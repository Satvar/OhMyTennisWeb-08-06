import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "../shared/app.service";
import { AppComponent } from "../app.component";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Location } from "@angular/common";
import { FullCalendarComponent } from "@fullcalendar/angular";
import dayGridView from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import * as moment from "moment";
//import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as _ from "underscore";
import * as $ from "jquery";
import * as L from "leaflet";
@Component({
  selector: "app-oh-my-coach-detail-new",
  templateUrl: "./oh-my-coach-detail-new.component.html",
  styleUrls: ["./oh-my-coach-detail-new.component.scss"]
})
export class OhMyCoachDetailNewComponent implements OnInit {
  public Ville: any = null;
  public service = new Array();
  public profileImage: any = "";
  public eventList: any = {};

  public selectedCity: any = null;
  public alertMsg: any = {
    type: "",
    msg: "",
    show: false
  };
  public min = new Date();
  public calender = [];
  calendarPlugins = [dayGridView, interactionPlugin];
  public UserAviablility: any = [];
  calendarOptions = {
    format: "DD-MM-YYYY",
    firstWeekdaySunday: false
  };

  public timeslot = {
    description: "",
    session: "",
    availability: ""
  };

  map: any;
  mapvalues: any;
  lat: any;
  lang: any;
  curentlat: any;
  curentlang: any;
  co_or_gps: any;
  numbers = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ];
  public booking = {
    Coach_ID: "",
    user_Id: "",
    payment_Id: 0,
    status: "",
    bookingDate: "",
    bookingCourse: "",
    amount: "",
    coach_Email: "",
    user_Email: "",
    coach_Name: "",
    user_Name: "",
    paymentStatus: "",
    session: [],
    bookingDateRange: ""
  };

  //public str: any = null;

  public course = localStorage.getItem("Course");

  public coach_detail = {
    Coach_Fname: "",
    Coach_ID: "",
    Coach_Lname: "",
    Coach_Email: "",
    Coach_Phone: "",
    InstagramURL: "",
    FacebookURL: "",
    TwitterURL: "",
    Coach_Description: "",
    Coach_Experience: "",
    Coach_Rayon: "",
    Coach_Price: "",
    Coach_Services: "",
    Coach_PriceX10: "",
    Coach_Bank_Name: "",
    Coach_Bank_ACCNum: "",
    Branch_Code: "",
    Coach_Bank_City: "",
    Coach_payment_type: "",
    Coach_transport: "",
    Coach_Image:
      "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png",
    Coach_Resume: "",
    ResumeName: ""
  };

  public course_demand = {
    Price_2pl_1hr: "",
    Price_3pl_1hr: "",
    Price_4pl_1hr: "",
    Price_5pl_1hr: "",
    Price_6pl_1hr: "",
    person: ""
  };

  public book_coach = {
    P_CoachId: "",
    P_CourseId: "",
    P_Date: "",
    P_Hour: "",
    P_UserId: "",
    P_Amount: "",
    P_Remarks: ""
  };

  public moment_date: any;
  public temps: string = "";
  public Video: any;
  public Clubcourse: any;
  public resumeURL: any;
  public applicationtype: any;
  public Description: any;
  public slot: any;
  public slides: any;
  public slidecnt: any;
  public session = [];
  public bookArray = [];
  public bookingDate: any;
  public Indiv_1hr: any;
  public Indiv_10hr: any;
  public location: any;
  public pincode: any;
  public price: any;
  public setCoachName: any;
  public Amt = 0;
  public person = "";
  public book_person = 0;
  public booked_user = [];
  public allocate_person = "";
  public availablity: any;
  public is10Hr = false;
  public step_2 = false;
  public step_3 = false;
  public showclub = false;
  public Timeslotdata = {
    Start_Date: "",
    Coach_ID: "",
    Course: ""
  };

  public courseActive = "";

  constructor(
    public sanitizer: DomSanitizer,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public appService: AppService,
    public Location: Location,
    public spinner: NgxSpinnerService
  ) {
    this.slidecnt = 4;
  }

  ngAfterViewInit() {
    var datas = this.UserAviablility;
    $(".mapsection")
      .delay(1000)
      .fadeIn(500);
  }

  @ViewChild("calendar", { static: false })
  calendarComponent: FullCalendarComponent;

  ngOnInit() {
    this.spinner.show();
    if (window.innerWidth > 1024) {
      this.slidecnt = 4;
    } else if (window.innerWidth > 768) {
      this.slidecnt = 3;
    } else {
      this.slidecnt = 2;
    }

    this.couchdetail();
  }

  transform(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  couchdetail() {
    this.spinner.show();
    const coachID: string = this.activatedRoute.snapshot.queryParamMap.get(
      "id"
    );
    const coachId = {
      id: coachID
    };
    if (coachID != "") {
      this.setCoachName = localStorage.getItem("sendCoachDetails");
      this.appService
        .create("/coach/getcoachdetailbyid", coachId)
        .subscribe(async response => {
          if (response && response["data"]) {
            this.coach_detail = response.data.coach_list[0];
            this.profileImage = this.transform(this.coach_detail.Coach_Image);
            console.log(
              "oh-my-coach-detail-new.component.ts - line 237",
              this.coach_detail
            );
            this.service = this.coach_detail.Coach_Services.split(",");
            console.log(
              "oh-my-coach-detail-new.component.ts - line 242",
              this.service[0].length
            );
            this.spinner.hide();
          }
        });
    } else {
      this.router.navigate(["ohmycoachnew"], {
        queryParams: {}
      });
    }

    const courseSegment: string = this.activatedRoute.snapshot.queryParamMap.get(
      "course"
    );

    if (courseSegment != "") {
      this.courseActive = courseSegment;
    }
    this.appService
      .getAll("/course/getindividualcourse", coachID)
      .subscribe(response => {
        if ((response as any).data.course.length > 0) {
          if (response && response["data"]) {
            var dat = (response as any).data.course[0];
            this.price = dat.Price_min;
            this.Indiv_1hr = dat.Price_min;
            this.Indiv_10hr = dat.Price_max;
            this.Video = dat.Video;
            this.Description = dat.Description;
            this.pincode = dat.Postalcode;
            this.location = dat.Location;
            this.mapvalues = eval("[" + dat.coordonnees_gps + "]");
            this.lat = this.mapvalues[0].toFixed(3);
            this.lang = this.mapvalues[1].toFixed(3);
            this.mapintigration(this.mapvalues);
            this.appService
              .getAll("/city/" + dat.Postalcode)
              .subscribe(response => {
                // tslint:disable-next-line:no-string-literal
                if (response && response["data"]) {
                  // tslint:disable-next-line:no-string-literal
                  this.selectedCity = (response as any).data.city_list;
                }
              });
          }
        }
        this.couchdetail();
        // this.spinner.hide();
      });
  }

  displayLoadedMap(latitude, longitude, radius) {
    console.log("latitude - " + latitude);
    console.log("longitude - " + longitude);
    if (this.map) {
      console.log("Got longitude - " + longitude);
      this.map.remove();
      $("#map").html("");
      $(".map-frame").empty();
      $('<div id="map" style="height: 385px;"></div>').appendTo(".map-frame");
    }

    this.mapvalues = eval("[" + latitude + "," + longitude + "]");
    this.lat = latitude;
    this.lang = longitude;
    console.log("Map Values" + this.mapvalues);

    this.map = L.map("map", {
      center: this.mapvalues,
      zoom: 15
    });
    //return;

    //Adding the Circle to the Map

    L.circle([this.lat, this.lang], {
      color: "orange",
      fillColor: "#FFA500",
      fillOpacity: 0.5,
      radius: radius * 10
    }).addTo(this.map);

    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 25
      }
    );

    tiles.addTo(this.map);
    var greenIcon = L.icon({
      iconUrl: "../assets/images/marker-icon.png",
      iconSize: [38, 95],
      iconAnchor: [22, 94]
    });

    L.marker([this.lat, this.lang], { icon: greenIcon }).addTo(this.map);
    //.openPopup();
  }

  eventListDetails() {}

  download() {
    if (this.coach_detail.Coach_Resume) {
      var blob = this.dataURLtoBlob(this.coach_detail.Coach_Resume);
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = this.coach_detail.ResumeName;
      link.click();
    }
  }

  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(",");
    var mime = arr[0].match(/:(.*?);/)[1];
    var bstr = window.atob(arr[1]);
    var n = bstr.length;
    var u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime
    });
  }

  enable10h() {
    this.price = this.Indiv_10hr;
    this.is10Hr = true;
    $("#amount").html("Totale: €" + " " + this.price);
    this.hide10h();
  }

  hide10h() {
    $("#10hrposter").hide();
  }

  openURL() {
    window.open(this.Video);
  }

  _showAlertMessage(c: string, t: string): void {
    $(".alert-dismissible").show();
    this.alertMsg.type = c;
    this.alertMsg.msg = t;
    this.alertMsg.show = true;

    setTimeout(function() {
      $(".alert-dismissible").hide();
    }, 3000);
  }

  _closeAlertMessage(e) {
    if (e) {
      this.alertMsg.type = "";
      this.alertMsg.msg = "";
      this.alertMsg.show = false;
    }
  }

  mapintigration(mappoint) {
    this.map = L.map("map", {
      center: mappoint,
      zoom: 16
    });

    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 25
      }
    );

    tiles.addTo(this.map);
    var greenIcon = L.icon({
      iconUrl: "../assets/images/marker-icon.png"
    });

    L.marker(mappoint, { icon: greenIcon })
      .addTo(this.map)
      .openPopup();
  }

  gotoCouch(ser, res) {
    if (localStorage.getItem("onmytennis") !== null) {
      var data = JSON.stringify(res);
      localStorage.setItem("Coach", data);
      localStorage.setItem("Course", ser);
      this.router.navigate(["/coachdetail"]);
    } else {
      this.router.navigate(["/login"]);
    }
  }
}
