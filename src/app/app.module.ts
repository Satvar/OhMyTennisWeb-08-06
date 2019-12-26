import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Routes,
  RouterModule,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterState,
  ParamMap
} from "@angular/router";
import {
  FormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormArray
} from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  HttpClientModule,
  HttpClient,
  HttpHeaders,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
/* [ Spinner ] */
import { NgxSpinnerModule } from "ngx-spinner";
/* [ Token Interceptor ] */
import { AuthInterceptor } from "./shared/auth-interceptor";
import { ResponseInterceptor } from "./shared/response-interceptor";
/* [ Service ] */
import { AppService } from "./shared/app.service";
/* [ Constant ] */
import { CONST } from "./shared/app.constant";
/* [ Shared Module ] */
import { AppSharedModule } from "./shared/app.shared.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./pages/header/header.component";
import { FooterComponent } from "./pages/footer/footer.component";
import { HomeComponent } from "./pages/home/home.component";
import { NotFoundComponent } from "./pages/not-found/not-found.component";
// import { TopMenuComponent } from './pages/top-menu/top-menu.component';
import { SocialLoginComponent } from "./pages/social-login/social-login.component";
import { CoachRegisterComponent } from "./pages/coach-register/coach-register.component";
import { UserRegisterComponent } from "./pages/user-register/user-register.component";
import { LoginComponent } from "./pages/login/login.component";
import { ForgotPasswordComponent } from "./pages/forgot-password/forgot-password.component";
import { SetPasswordComponent } from "./pages/set-new-password/set-new-password.component";
import { FullCalendarModule } from "@fullcalendar/angular";
import { NgDatepickerModule } from "ng2-datepicker";
import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
import { OhMyCoachComponent } from "./oh-my-coach/oh-my-coach.component";
import { OhMyCoachDetailComponent } from "./oh-my-coach-detail/oh-my-coach-detail.component";
import { CoachDetailComponent } from "./coach-detail/coach-detail.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { XunkCalendarModule } from "xunk-calendar";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { adapterFactory } from "angular-calendar/date-adapters/date-fns";
import { OWL_DATE_TIME_LOCALE } from "ng-pick-datetime";
import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angular-6-social-login";
import { TopMenuComponent } from "./pages/top-menu/top-menu.component";
import { UsernotificationComponent } from "./usernotification/usernotification.component";
import { UserStageComponent } from "./user-stage/user-stage.component";
import { UserTeambuildingComponent } from "./user-teambuilding/user-teambuilding.component";
import { UserAnimationComponent } from "./user-animation/user-animation.component";
import { UserTournamentComponent } from "./user-tournament/user-tournament.component";
import { UserTournamentDetailComponent } from "./user-tournament-detail/user-tournament-detail.component";
import { UserStageDetailComponent } from "./user-stage-detail/user-stage-detail.component";
import { UserTeambuildingDetailComponent } from "./user-teambuilding-detail/user-teambuilding-detail.component";
import { UserAnimationDetailComponent } from "./user-animation-detail/user-animation-detail.component";
import { AdminloginComponent } from "./admin/adminlogin/adminlogin.component";
import { AdminforgotpasswordComponent } from "./admin/adminforgotpassword/adminforgotpassword.component";
import { ResetpasswordComponent } from "./admin/resetpassword/resetpassword.component";
import { ConceptComponent } from "./pages/concepts/concept/concept.component";

registerLocaleData(localeFr, "fr");

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full"
  },
  {
    path: CONST.PATH.COUCH_DETAIL,
    component: CoachDetailComponent
  },
  {
    path: CONST.PATH.LOGIN,
    component: LoginComponent
  },
  {
    path: CONST.PATH.COACH_REGISTER,
    component: CoachRegisterComponent
  },
  {
    path: CONST.PATH.USER_REGISTER,
    component: UserRegisterComponent
  },
  {
    path: CONST.PATH.FORGET_PASSWORD,
    component: ForgotPasswordComponent
  },
  {
    path: CONST.PATH.SET_NEW_PASSWORD,
    component: SetPasswordComponent
  },
  {
    path: CONST.PATH.OH_MY_COACH,
    component: OhMyCoachComponent
  },
  {
    path: CONST.PATH.OH_MY_COACH_DETAIL,
    component: OhMyCoachDetailComponent
  },
  {
    path: CONST.PATH.STAGE,
    component: UserStageComponent
  },
  {
    path: CONST.PATH.TOUNAMENT,
    component: UserTournamentComponent
  },
  {
    path: CONST.PATH.ANIMATION,
    component: UserAnimationComponent
  },
  {
    path: CONST.PATH.TEAMBUILDING,
    component: UserTeambuildingComponent
  },
  {
    path: CONST.PATH.STAGE_DETAIL,
    component: UserStageDetailComponent
  },
  {
    path: CONST.PATH.TOUNAMENT_DETAIL,
    component: UserTournamentDetailComponent
  },
  {
    path: CONST.PATH.ANIMATION_DETAIL,
    component: UserAnimationDetailComponent
  },
  {
    path: CONST.PATH.TEAMBUILDING_DETAIL,
    component: UserTeambuildingDetailComponent
  },
  {
    path: CONST.PATH.COACH.SELF,
    loadChildren: () =>
      import("./model/coach/coach.module").then(mod => mod.CoachModule)
  },
  {
    path: CONST.PATH.USER.SELF,
    loadChildren: () =>
      import("./model/user/user.module").then(mod => mod.UserModule)
  },
  {
    path: CONST.PATH.ADMINS.SELF,
    component: AdminloginComponent
  },
  {
    path: CONST.PATH.ADMINS.FORGOT.SELF,
    component: AdminforgotpasswordComponent
  },
  {
    path: CONST.PATH.ADMINS.RESET.SELF,
    component: ResetpasswordComponent
  },
  {
    path: CONST.PATH.ADMIN.SELF,
    loadChildren: () =>
      import("./model/admin/admin.module").then(mod => mod.AdminModule)
  },
  {
    path: CONST.PATH.CONCEPTS.CONCEPT.SELF,
    component: ConceptComponent
  },
  {
    path: "**",
    component: HomeComponent
  }
];

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider("1359179340923922")
    }
  ]);
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    SocialLoginComponent,
    LoginComponent,
    CoachRegisterComponent,
    UserRegisterComponent,
    FooterComponent,
    HeaderComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    OhMyCoachComponent,
    CoachDetailComponent,
    TopMenuComponent,
    AdminloginComponent,
    AdminforgotpasswordComponent,
    ResetpasswordComponent,
    UserStageComponent,
    UserTeambuildingComponent,
    UserAnimationComponent,
    UserTournamentComponent,
    UserTournamentDetailComponent,
    UserStageDetailComponent,
    UserTeambuildingDetailComponent,
    UserAnimationDetailComponent,
    OhMyCoachDetailComponent,
    ConceptComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    RouterModule.forRoot(routes),
    AppSharedModule,
    NgxSpinnerModule,
    NgbModule,
    XunkCalendarModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true },
    { provide: OWL_DATE_TIME_LOCALE, useValue: "fr" },
    { provide: AuthServiceConfig, useFactory: getAuthServiceConfigs }
  ],
  bootstrap: [AppComponent],
  exports: [TopMenuComponent]
})
export class AppModule {}
