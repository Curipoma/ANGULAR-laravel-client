import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../../../services/auth-user/auth-user.service';
import { TokenService } from '../../../services/auth-user/token.service';
import { CNavService } from '../../../services/components/c-nav.service';
import { UsersService } from '../../../services/db/users.service';
import { User } from '../../../models/User.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  template: ` <ng-template appProfileHost></ng-template> `,
})
export class NavComponent implements OnInit {
  user: User;

  constructor(
    private router: Router,
    private authUserService: AuthUserService,
    private cNavService: CNavService,
    private tokenService: TokenService,
    private usersService: UsersService
  ) {
    this.user = {};
  }

  modeClass(classRemove: string, classAdd: string) {
    var modeBtn: any = document.getElementById('mode');
    localStorage.setItem('theme', classAdd);
    document.documentElement.classList.remove(classRemove);
    document.documentElement.classList.add(classAdd);
    modeBtn.textContent = classAdd;
  }

  mode() {
    var theme: any = localStorage.getItem('theme');
    if (!theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.modeClass('light', 'dark');
      } else {
        this.modeClass('dark', 'light');
      }
    } else {
      if (theme == 'dark') {
        this.modeClass('dark', 'light');
      } else {
        this.modeClass('light', 'dark');
      }
    }
  }

  menu() {
    var menuDrop = document.getElementById('menu');
    menuDrop?.classList.toggle('invisible');
    menuDrop?.classList.toggle('hidden');
  }

  messageLogout(dataMessage: String) {
    var message: any = document.getElementById('message');
    message.classList.add('px-5');
    message.textContent = dataMessage;
  }

  ngOnInit(): void {
    var theme: any = localStorage.getItem('theme');
    var nav: any = document.getElementById('nav');
    var menu: any = document.querySelectorAll('#menu li');

    if (this.tokenService.getToken()) {
      this.user = this.authUserService.getData();
    }
    menu.forEach((e: any) => {
      if (this.tokenService.getToken() && this.user) {
        if (e.id === 'link_auth') {
          e.classList.remove('invisible');
          e.classList.remove('hidden');
          e.classList.add('visible');
          e.classList.add('block');
        }
        if (this.user.rol === 1 && e.id === 'link_admin') {
          e.classList.remove('invisible');
          e.classList.remove('hidden');
          e.classList.add('visible');
          e.classList.add('block');
        }
        if (this.user.rol === 2 && e.id === 'link_client') {
          e.classList.remove('invisible');
          e.classList.remove('hidden');
          e.classList.add('visible');
          e.classList.add('block');
        }
      } else if (e.id === 'link_guest') {
        e.classList.remove('invisible');
        e.classList.remove('hidden');
        e.classList.add('visible');
        e.classList.add('block');
      }
    });

    if (!theme) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.modeClass('light', 'dark');
      } else {
        this.modeClass('dark', 'light');
      }
    } else {
      if (theme == 'light') {
        this.modeClass('dark', 'light');
      } else {
        this.modeClass('light', 'dark');
      }
    }

    nav.addEventListener('click', (e: any): any => {
      if (e.target.id == 'logout') {
        this.usersService
          .logoutUser(this.authUserService.getData().id)
          .subscribe((data: any) => {
            this.messageLogout(data['message'].toString());
          });

        this.tokenService.removeToken();
        this.authUserService.removeCookie();
        this.router.navigate(['login']);
        this.cNavService.logout();
      }
      if (e.target.id == 'mode') {
        this.mode();
      }
    });

    while (true) {
      if (
        document.readyState == 'interactive' ||
        document.readyState == 'complete'
      ) {
        setTimeout(function () {
          var loading: any = document.getElementById('loading');
          loading.classList.add('invisible');
          loading.style.opacity = '0';
        }, 200);
        break;
      }
    }
  }
}
