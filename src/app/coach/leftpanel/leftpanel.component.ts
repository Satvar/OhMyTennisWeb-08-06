import { Component, OnInit, AfterViewChecked, Input } from "@angular/core";
import { Location } from "@angular/common";
import { BrowserModule, Title, Meta } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { CoachComponent } from "./../../model/coach/coach.component";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";
import * as $ from "jquery";

import { Observable } from "rxjs/Observable";

import { ISubscription } from "rxjs/Subscription";

import "rxjs/add/operator/takeWhile";
import "rxjs/add/observable/timer";
@Component({
  selector: "app-leftpanel",
  templateUrl: "./leftpanel.component.html",
  styleUrls: ["./leftpanel.component.scss"]
})
export class LeftpanelComponent extends CoachComponent implements OnInit {
  public navActiveIndex = 0;
  alive = true;
  public username: any;
  public image = "https://www.w3schools.com/howto/img_avatar.png";
  public res = [];
  public resStage = [];
  tournList = [];
  stageList = [];
  animationList = [];
  message: string;
  //private $timer: ISubscription;
  subs: ISubscription;
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
    // let url: string = this.router.url.substring(
    //   0,
    //   this.router.url.indexOf("?")
    // );
    // console.log(url);
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    if (coach) {
      var coach1 = JSON.parse(coach);
      if (coach1.roleId == 2) {
        this.spinner.show();
        var Coach_Email = {
          Coach_Email: coach1.email
        };
        var coachid = {
          coachId: coach1.id
        };
        this.appService
          .create("/coach/get_coach_by_id", Coach_Email)
          .subscribe((data: any) => {
            //console.log("data", data);
            if (data.isSuccess == true) {
              if (this.alive) {
                Observable.timer(0, 10000) // only fires when component is alive
                  .subscribe(() => {
                    this.getStage(coachid);
                    this.gettournament(coachid);
                    this.getanimation(coachid);
                    //console.log("stage");
                    //this.disactivate();
                    this.spinner.hide();
                  });
              }

              if (data.data.coach_list) {
                this.image = data.data.coach_list[0].Coach_Image;
                if (this.image == null) {
                  this.image =
                    "https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png";
                }
              }
              this.spinner.hide();
            } else {
              this.spinner.hide();
            }
          });
      }
      if (coach1.firstName + " " + coach1.lastName)
        this.username = this.capitalizeFLetter(
          coach1.firstName + " " + coach1.lastName
        );
    }
  }

  private disactivate() {
    //this.subs.unsubscribe();
  }
  getanimation(coachid) {
    this.appService
      .getAll("/course/getAnimationCourseLeft", coachid)
      .subscribe(response => {
        if ((response as any).data.course.length > 0) {
          if (response && response["data"]) {
            this.resStage = (response as any).data.course;
            let animationData = this.resStage.map((value, key) => {
              return {
                title: "Animation-" + (key + 1),
                stage_id: value.id,
                coach_id: value.Coach_Id,
                iclass: "fa fa-th-large",
                style: false,
                path: "/coach/Stage"
              };
            });
            this.animationList = animationData;
            //console.log("data1", this.animationList);
          }
        }
      });
  }

  gettournament(coachid) {
    this.appService
      .getAll("/course/gettournamentcourse", coachid)
      .subscribe(response => {
        if ((response as any).data.course.length > 0) {
          if (response && response["data"]) {
            this.res = (response as any).data.course;
            let tourData = this.res.map(value => {
              return {
                title: value.Tournamentname,
                tourn_id: value.id,
                coach_id: value.Coach_Id,
                iclass: "fa fa-th-large",
                style: false,
                path: "/coach/Tounamentedit"
              };
            });
            this.tournList = tourData;
            //console.log("data1", tourData);
          }
        }
      });
  }

  getStage(coachid) {
    this.appService
      .getAll("/course/getstagecourse", coachid)
      .subscribe(response => {
        if ((response as any).data.course.length > 0) {
          if (response && response["data"]) {
            this.resStage = (response as any).data.course;
            let stageData = this.resStage.map(value => {
              return {
                title: value.Eventname,
                stage_id: value.id,
                coach_id: value.Coach_Id,
                iclass: "fa fa-th-large",
                style: false,
                path: "/coach/Stage"
              };
            });
            this.stageList = stageData;
            //console.log("data1", this.stageList);
          }
        }
      });
  }

  editTournament(id, coachId) {
    event.preventDefault();
    this.spinner.show();
    this.router
      .navigateByUrl("/coach/Tounament", { skipLocationChange: true })
      .then(() => {
        this.router.navigate(["/coach/Tounamentedit/"], {
          queryParams: { tourn_id: id, coach_id: coachId }
        });
      });

    this.spinner.hide();
  }

  editStage(id, coachId) {
    event.preventDefault();
    this.spinner.show();
    this.router
      .navigateByUrl("/coach/Stage", { skipLocationChange: true })
      .then(() => {
        this.router.navigate(["/coach/Stageedit/"], {
          queryParams: { stage_id: id, coach_id: coachId }
        });
      });

    this.spinner.hide();
  }

  editAnimation(event: Event, id, coachId) {
    event.preventDefault();
    this.spinner.show();
    this.router
      .navigateByUrl("/coach/Animation", { skipLocationChange: true })
      .then(() => {
        this.router.navigate(["/coach/Animationedit/"], {
          queryParams: { animation_id: id, coach_id: coachId }
        });
      });

    this.spinner.hide();
  }

  capitalizeFLetter(name) {
    return name[0].toUpperCase() + name.slice(1);
  }

  redirectMenu(link: any) {
    console.log(link);
    alert(link);
  }

  _delete_account() {
    var coach = JSON.parse(localStorage.getItem("onmytennis"));
    if (coach) {
      var coach1 = JSON.parse(coach);
      var emailId = {
        email: coach1.email
      };
      this.spinner.show();

      this.appService
        .create("/user/accountdeletebyemail", emailId)
        .subscribe((data: any) => {
          if (data.isSuccess == true) {
            this.spinner.hide();
            this._setSession("removeItem");
            this._gotoPath("/");
          } else {
            this.spinner.hide();
          }
        });
    }
  }

  leftPanel() {
    return [
      {
        title: "TABLEAU DE BORD",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.DASHBOARD.SELF"),
        iclass: "far far-th-large",
        style: false
      },
      {
        title: "MON COMPTE",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.PROFILE.SELF"),
        iclass: "far far-user-o",
        style: false
      },
      {
        title: "MON CALENDRIER",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.MY_CALENDER.SELF"),
        iclass: "far far-calendar",
        style: false
      },
      {
        title: "MES RESERVATIONS",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.RESERVATION.SELF"),
        iclass: "far far-reser-o",
        style: false
      },
      {
        title: "COURS INDIVIDUEL",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.INDIVIDUAL_COURSE.SELF"),
        iclass: "far far-courindiv",
        style: false
      },
      {
        title: "COURS COLLECTIF <br>ONDEMAND",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.COURSECOLLECTION.SELF"),
        iclass: "far far-demand-o",
        style: true
      },
      {
        title: "COURS COLLECTIF <br> CLUB",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.COURSECLUB.SELF"),
        iclass: "far far-courcollect-o",
        style: true
      },
      {
        title: "STAGE",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.STAGE.SELF"),
        iclass: "far far-stage-o",
        style: false
      },
      {
        title: "TEAM BUILDING",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.TEAMBUILDING.SELF"),
        iclass: "far far-team-o",
        style: false
      },
      {
        title: "ANIMATIONS",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.ANIMATION.SELF"),
        iclass: "far far-animation-o",
        style: false
      },
      {
        title: "TOURNOI",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.TOURNAMENT.SELF"),
        iclass: "far far-tour-o",
        style: false
      },
      {
        title: "COMMENTAIRES",
        path: "/" + this._const("PATH.COACH.SELF"),
        iclass: "far far-comments-o",
        style: false
      },
      {
        title: "SUPPRIMER VOTRE <br> COMPTE",
        path: "/",
        iclass: "far far-sign-out-o",
        style: false
      },
      {
        title: "CHANGER LE MOT DE <br> PASSE",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.CHANGE_PASSWORD.SELF"),
        iclass: "far far-key-o",
        style: false
      },
      {
        title: "DELETE ACCOUNT",
        path:
          "/" +
          this._const("PATH.COACH.SELF") +
          "/" +
          this._const("PATH.COACH.DELETE_ACCOUNT.SELF"),
        iclass: "far far-sign-out-o",
        style: false
      }
    ];
  }
}
