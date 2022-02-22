import { Component, OnInit, AfterContentInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { SwiperComponent } from "swiper/angular"
import SwiperCore, { Lazy, Navigation, Pagination } from "swiper"

// for use parallax
declare let require: any;

// install Swiper modules
SwiperCore.use([Lazy, Navigation, Pagination]);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent implements OnInit, AfterContentInit {
  @ViewChild('swiper14', { static: false }) swiper14?: SwiperComponent;

  bg: any = '.block-2__grid__item__image__shadow-1, .block-2__grid__item__image__shadow-2, .block-6__shadow-1, .block-6__shadow-2, .block-7__shadow, .block-9__shadow-1, .block-9__shadow-2, .block-11__shadow-1, .block-11__shadow-2, .block-12__shadow, .block-14__shadow, .block-15__grid__item__image__shadow-1, .block-15__grid__item__image__shadow-2, .block-15__shadow-1, .block-19__shadow-3, .block-19__shadow-4, .block-22__shadow'

  scene: any = []
  vid: any
  vidHtml: any = []
  preHtml: any


  constructor() { }

  ngOnInit(): void { }

  //for use Parallax
  ngAfterContentInit() {
    const Parallax = require('parallax-js');
    console.log(Parallax)
    this.scene = document.querySelectorAll(this.bg)
    for (let sc of this.scene) {
      const parallaxInstance = new Parallax(sc, {
        relativeInput: true,
        clipRelativeInput: true,
        scalarX: 4,
        scalarY: 4
      });
    }

  }

  slideNext() {
    this.swiper14?.swiperRef.slideNext(300);
    console.log(this.swiper14?.swiperRef.$wrapperEl[0].getElementsByClassName('block-14__video').item(this.vid))
  }
  slidePrev() {
    this.swiper14?.swiperRef.slidePrev(300);
  }

  openVideo(val: any) {
    this.vid = val.target.offsetParent.dataset.video
    val.target.parentElement.innerHTML = '<iframe width="100%" height="100%" src="' + this.vid + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>'
  }

}
