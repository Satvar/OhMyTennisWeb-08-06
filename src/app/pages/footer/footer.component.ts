import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public slides = [
    {img: '../../assets/images/partner_img1.png'},
    {img: '../../assets/images/partner_img2.png'},
    {img: '../../assets/images/partner_img3.png'},
    {img: '../../assets/images/partner_img4.png'},
    {img: '../../assets/images/partner_img1.png'},
    {img: '../../assets/images/partner_img2.png'}
  ];
  public slideConfig: any = {
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true
  };

  constructor() { }

  ngOnInit() {
  }

}
