import { Component, OnInit } from '@angular/core';
import { Films } from '../../models/films.interface';
import { FilmsService } from '../../services/db/films.service';
import { AuthUserService } from '../../services/auth-user/auth-user.service';
import { User } from '../../models/User.interface';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  allFilms: Films[];
  user: User;
  title: string = 'Films';
  constructor(
    private filmsService: FilmsService,
    private authUserService: AuthUserService
  ) {
    this.allFilms = [];
    this.user = {};
  }

  ngOnInit(): void {
    this.user = this.authUserService.getData();
    this.filmsService.getAllFilms().subscribe((data: any): any => {
      this.allFilms = data;
    });
  }
}
