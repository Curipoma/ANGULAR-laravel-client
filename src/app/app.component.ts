import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'client';

  ngOnInit(): void {
    var scrollPos: number = 0;
    var router_outlet: any = document.getElementById('router_outlet');
    window.addEventListener('scroll', () => {
      if (document.body.getBoundingClientRect().top > scrollPos) {
        router_outlet.classList.remove('-translate-y-40');
        router_outlet.classList.add('translate-y-0');
        scrollPos = document.body.getBoundingClientRect().top;
      } else {
        router_outlet.classList.remove('translate-y-0');
        router_outlet.classList.add('-translate-y-40');
        scrollPos = document.body.getBoundingClientRect().top;
      }
    });
  }
}
