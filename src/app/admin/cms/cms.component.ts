import { Component, OnInit } from "@angular/core";
import { AppService } from "../../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AdminComponent } from "src/app/model/admin/admin.component";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-cms",
  templateUrl: "./cms.component.html",
  styleUrls: ["./cms.component.scss"]
})
export class CmsComponent extends AdminComponent implements OnInit {
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
    this.getAllCms();
    // setTimeout(function() {
    //   $("#datatable").DataTable({
    //     responsive: true
    //   });
    // }, 310);
  }

  getAllCms() {
    this.appService.getAll("/admin/cms/getCms").subscribe(response => {
      if ((response as any).data.cms_list.length > 0) {
        if (response && response["data"]) {
          let dat = (response as any).data.cms_list;
          let data = dat.map(value => {
            return {
              title: value.menu_name,
              seo_keyword: value.seo_keyword,
              photo: value.photo,
              id: value.id
            };
          });
          this.datanew = data;
        }
      }
    });
  }

  getCmsIndividualData(id) {
    if (id) {
      this.router.navigate(["/admin/cms/view"], {
        queryParams: { id: id }
      });
    }
  }
}
