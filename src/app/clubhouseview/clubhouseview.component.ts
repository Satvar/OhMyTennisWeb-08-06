import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../shared/app.service";
import { NgxSpinnerService } from "ngx-spinner";
import { AppComponent } from "../app.component";
import { Location } from "@angular/common";
import * as moment from "moment";
declare var ol: any;
@Component({
  selector: "app-clubhouseview",
  templateUrl: "./clubhouseview.component.html",
  styleUrls: ["./clubhouseview.component.scss"]
})
export class ClubhouseviewComponent extends AppComponent implements OnInit {
  public res = {
    court_id: "",
    court_name: "",
    incharge_name: "",
    court_email: "",
    court_phone: "",
    court_postal_code: "",
    court_address: "",
    courtfile: "",
    coordonnees_gps: ""
  };
  constructor(
    activatedRoute: ActivatedRoute,
    router: Router,
    appService: AppService,
    location: Location,
    spinner: NgxSpinnerService
  ) {
    super(activatedRoute, router, appService, location, spinner);
  }
  map: any;
  ngOnInit() {
    this.spinner.show();
    var club = JSON.parse(localStorage.getItem("Club"));
    var court_id = {
      court_id: club.court_id
    };
    console.log(court_id);
    this.appService
      .create("/admin/getclubbyid", court_id)
      .subscribe((data: any) => {
        //console.log(data)
        if (data.isSuccess == true) {
          this.res = data.data.club_list[0];

          // console.log(this.res['coordonnees_gps']);
          // this.map = new ol.Map({
          //   target: 'map',
          //   layers: [
          //     new ol.layer.Tile({
          //       source: new ol.source.OSM()
          //     })
          //   ],
          //   view: new ol.View({
          //     center: ol.proj.fromLonLat([48.6753515056, 2.04828313772]),
          //     zoom: 8
          //   })
          // });

          //     map = new OpenLayers.Map("mapdiv");
          // map.addLayer(new OpenLayers.Layer.OSM());

          // var lonLat = new OpenLayers.LonLat( -0.1279688 ,51.5077286 )
          //       .transform(
          //         new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
          //         map.getProjectionObject() // to Spherical Mercator Projection
          //       );

          // var zoom=16;

          // var markers = new OpenLayers.Layer.Markers( "Markers" );
          // map.addLayer(markers);

          // markers.addMarker(new OpenLayers.Marker(lonLat));

          // map.setCenter (lonLat, zoom);
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
  }

  getCourt() {}
}
