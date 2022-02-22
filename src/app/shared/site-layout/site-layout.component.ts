import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {
  app_header: any
  app_header__floating: any
  submenu: any
  triangle: any
  body: any
  el: any
  width: any

  links = [
    { url: 'https://www.it-lance.com.ua/ru/#our-services', name: 'НАШИ УСЛУГИ' },
    { url: 'https://www.it-lance.com.ua/ru/articles/one-c.html', name: 'СТАТЬИ' },
    { url: 'https://www.it-lance.com.ua/ru/#information', name: 'ИНФОРМАЦИЯ' },
    { url: 'https://www.it-lance.com.ua/ru/about/history.html', name: 'О НАС' },
    { url: 'https://www.it-lance.com.ua/ru/contact.html', name: 'КОНТАКТЫ' }
  ]

  links1 = [
    { url: 'https://www.it-lance.com.ua/ru/outsourcing.html', name: 'IT аутсорсинг' },
    { url: 'https://www.it-lance.com.ua/ru/automation-of-accounting-in-the-enterprise.html', name: '1С:Підприємство. Автоматизация учета на предприятии' },
    { url: 'https://www.it-lance.com.ua/ru/web-development.html', name: 'WEB разработка' },
    { url: 'https://www.it-lance.com.ua/ru/security-systems.html', name: 'Разработка ПО' },
    { url: 'https://www.it-lance.com.ua/ru/ip-telephony.html', name: 'Внедрение и поддержка IP телефонии' },
    { url: 'https://www.it-lance.com.ua/ru/low-current-networks.html', name: 'Проектирование и монтаж слаботочных сетей' },
    { url: 'https://www.it-lance.com.ua/ru/creation-and-support-of-corporate-networks.html', name: 'Создание и поддержка корпоративных сетей' }
  ]

  links2 = [
    { url: 'https://www.it-lance.com.ua/ru/about/history.html', name: 'История IT-LANCE' },
    { url: 'https://www.it-lance.com.ua/ru/about/reviews.html', name: 'Отзывы' },
    { url: 'https://www.it-lance.com.ua/ru/about/thanks.html', name: 'Благодарности' },
  ]

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.app_header = document.getElementById("app_header")
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.app_header__floating = this.app_header.offsetTop
    if (window.pageYOffset > this.app_header__floating) {
      this.app_header.classList.add("app-header__floating")
    } else {
      this.app_header.classList.remove("app-header__floating")
    }
  }

  onMobileMenu() {
    document.documentElement.style.setProperty('--mobile-menu-radius', Math.round(Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight) * 1) + 'px')
    this.body = document.body.classList
    this.body.length === 0 ? this.body.add("mobile-menu-opened") : this.body.remove("mobile-menu-opened")

  }

  onMouseEnter(ev: any): void {
    if (ev.target.getElementsByTagName("ul").length != 0) {
      clearTimeout(0)
      this.submenu = ev.target.getElementsByTagName("ul")[0] //for app-header__navigation__submenu
      this.submenu.getElementsByTagName("div")[0].style.left = `${ev.target.offsetWidth / 2 + 16}px` //for .app - header__navigation__submenu__triangle
      this.submenu.style.display = "block"
      setTimeout(() => {
        this.submenu.classList.add("visible");
      }, 50)
    }
  }

  onMouseLeave(ev: any): void {
    if (ev.target.getElementsByTagName("ul").length != 0) {
      this.submenu = ev.target.getElementsByTagName("ul")[0]
      this.submenu.classList.remove("visible")
      setTimeout(() => {
        this.submenu.style.display = "none"
      }, 300)
      this.submenu.getElementsByTagName("div")[0].style.left = '0' //for .app-header__navigation__submenu__triangle
    }
  }

  logout(event: Event) {
    event.preventDefault() //убрали перезагрузку страницы
    //this.auth.logout()
    this.router.navigate(['/'])
    //this.sidenav.close()
  }

}
