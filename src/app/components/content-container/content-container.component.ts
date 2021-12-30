import { Component, OnInit } from '@angular/core';

import { AuthUserService } from '../../services/auth-user/auth-user.service';
import { User } from '../../models/User.interface';

import { CContentService } from '../../services/components/c-content.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentContainerComponent implements OnInit {
  user: User;
  title: string = 'Films';
  constructor(
    private authUserService: AuthUserService,
    private cContentService: CContentService
  ) {
    this.user = {};
  }
  main(): void {
    this.cContentService.loadMain();
  }
  ngOnInit(): void {
    this.user = this.authUserService.getData();
  }
}
