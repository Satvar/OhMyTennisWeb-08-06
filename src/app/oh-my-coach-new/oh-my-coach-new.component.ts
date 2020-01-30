import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from "../app.component";
import { Location } from "@angular/common";
//import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as _ from "underscore";

@Component({
  selector: "app-oh-my-coach-new",
  templateUrl: "./oh-my-coach-new.component.html",
  styleUrls: ["./oh-my-coach-new.component.scss"]
})
export class OhMyCoachNewComponent extends AppComponent implements OnInit {
  public min = new Date();
  public date: any = "";
  public respon: any;
  public search: any = {
    individual: false,
    ondemand: false,
    collectifclub: false,
    date: "",
    session: "",
    ville: "",
    rayon: "",
    course: ""
  };
  public service: any;

  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

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
    // let d = new Date();
    // //let day = new Date(d);
    // var nextDay = new Date(d);
    // nextDay.setDate(d.getDate() + 1);
    // let year = d.getFullYear();
    // let month =
    //   d.getMonth() + 1 < 10 ? "0" + d.getMonth() + 1 : d.getMonth() + 1;
    // this.search.date = nextDay + "/" + month + "/" + year;
    // console.log(this.search);
    this.getcoach();
    //this.findCoach();
  }

  getcoach() {
    this.spinner.show();
    var date = sessionStorage.getItem("Date");
    var postal = sessionStorage.getItem("Ville");

    const ville = {
      ville: sessionStorage.getItem("Ville"),
      date: sessionStorage.getItem("Date")
    };

    if (postal == null) {
      var pcode = localStorage.getItem("onmytennis");
      if (pcode) {
        var postalCode = JSON.parse(JSON.parse(pcode));
        this.search.ville = postalCode.postalCode;
      }
    } else {
      this.search.ville = sessionStorage.getItem("Ville");
    }
    //this.search.ville = sessionStorage.getItem('Ville');
    this.search.date = sessionStorage.getItem("Date");
    this.date = sessionStorage.getItem("Date");
    this.appService
      .getAll("/coach/searchByCoach", this.search)
      .subscribe(data => {
        if (data && data["data"]) {
          this.allItems = (data as any).data.coach_list;
          //console.log(this.respon)
          this.spinner.hide();
          this.setPage(1);
        }
      });
  }

  findCoach(search) {
    this.spinner.show();
    localStorage.setItem("Course", search.course);
    if (this.date != "") search.date = this.formatDate(this.date);
    this.appService.getAll("/coach/findyourCoach", search).subscribe(data => {
      if (data && data["data"]) {
        this.respon = (data as any).data.coach_list;
        this.spinner.hide();
      }
    });
  }

  removeLastComma(str) {
    return str.replace(/,(\s+)?$/, "");
  }

  // transform(image) {
  //   //return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  //   var decodeData = window.btoa(image);
  //   return decodeData;
  // }

  // cutString(s, n) {
  //   // var cut = s.indexOf(" ", n);
  //   // if (cut == -1) return s;
  //   return s.substring(0, n);
  // }

  onFilterChange(eve: any) {
    console.log(eve);
    this.search.individual = !this.search.individual;
  }

  searchByCoach(search) {
    //event.preventDefault();
    this.spinner.show();

    let getSearchObj = {
      date: "",
      course: "",
      ville: "",
      rayon: ""
    };

    if (search.ville != "") {
      getSearchObj.ville = search.ville;
      let selectorVilleID = document.querySelector("#ville") as HTMLElement;
      selectorVilleID.style.border = "";
    } else {
      let villeID = document.getElementById("ville") as HTMLElement;
      villeID.setAttribute("tabIndex", "-1");
      villeID.focus();
      let selectorVilleID = document.querySelector("#ville") as HTMLElement;
      selectorVilleID.style.border = "1px solid red";

      this.spinner.hide();
      window.scroll({
        top: 600,
        left: 0,
        behavior: "smooth"
      });
      return;
    }
    //localStorage.setItem("Course", search.course);
    if (search.date != "" && search.date != null) {
      getSearchObj.date = this.formatDate(search.date);
    }
    let getCourseData = "";
    if (this.search.individual) {
      getCourseData += "CoursIndividuel";
    }
    if (search.ondemand) {
      getCourseData += "CoursCollectifOndemand";
    }
    if (search.collectifclub) {
      getCourseData += "CoursCollectifClub";
    }
    if (getCourseData) {
      getSearchObj.course = this.removeLastComma(getCourseData);
    }

    if (search.rayon) {
      getSearchObj.rayon = search.rayon;
    }
    console.log(getSearchObj);
    this.appService
      .getAll("/coach/searchByCoach", getSearchObj)
      .subscribe(data => {
        if ((data as any).isSuccess == true) {
          this.allItems = (data as any).data.coach_list;
          this.spinner.hide();
          if (this.allItems.length > 0) {
            this.pager.totalPages = this.allItems.length;
            this.setPage(1);
          } else {
            this.pager.totalPages = this.allItems.length;
            this.pagedItems = [];
            this.setPage(1);
          }
          window.scroll({
            top: 400,
            left: 0,
            behavior: "smooth"
          });
        }
      });
  }

  getPager(totalItems: number, currentPage: number = 1, pageSize: number = 4) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  setPage(page: number) {
    //console.log("page ", page);
    //console.log("this.pager.totalPages ", this.pager.totalPages);
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
    window.scroll({
      top: 400,
      left: 0,
      behavior: "smooth"
    });
    //console.log("set page ", this.pagedItems);
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
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
