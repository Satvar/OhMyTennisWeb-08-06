import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../shared/app.service";
import { AppComponent } from "../../app.component";
/* [ Spinner ] */
import { NgxSpinnerService } from "ngx-spinner";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-cms",
  templateUrl: "./cms.component.html",
  styleUrls: ["./cms.component.scss"]
})
export class CmsComponent extends AppComponent implements OnInit {
  public response = {
    menu_name: "",
    endpoint: "",
    seo_keyword: "",
    description: "",
    photo: "",
    details: "",
    created_date: ""
  };
  public myFile: any;
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
    this.getIndividualCmsPage();
  }

  transform(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  getIndividualCmsPage() {
    const endpoint: string = this.activatedRoute.snapshot.paramMap.get(
      "endpoint"
    );
    const id: string = this.activatedRoute.snapshot.paramMap.get("cmsId");
    console.log(endpoint, id);
    if (endpoint && id) {
      this.appService
        .getAll("/admin/cms/getCmsData/" + endpoint + "/" + id)
        .subscribe(res => {
          this.response = (res as any).data.cms_list[0];
          this.myFile = this.transform(this.response["photo"]);
          this.response.photo = this.myFile;
          console.log(this.myFile);
        });
    }
  }

  /* [ Banner Image ] */
  // bannerImage() {
  //   this.bannerImageSources.push({
  //     url: "./assets/images/cours-particuliers-de-tennis.jpg"
  //   });
  // }
}
