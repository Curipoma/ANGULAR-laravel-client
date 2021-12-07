import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CFilmService } from '../../../../services/components/c-film.service';
import { FilmsService } from '../../../../services/db/films.service';
import { Films } from '../../../../models/films.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  formGroup: FormGroup;
  film: Films;
  constructor(
    private cFilmService: CFilmService,
    private filmsService: FilmsService,
    private formBuilder: FormBuilder
  ) {
    this.film = {};
    this.formGroup = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/[A-Za-z0-9]/),
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      price: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
      duration: ['', [Validators.required]],
      filmvideo: ['', [Validators.required]],
    });
  }

  changeStatusInpu(
    classAdd: string,
    classRemove: string,
    identf: string,
    data: string
  ): void {
    var input: any = document.getElementById(`${identf}`);
    var messageInput: any = document.getElementById(`message_${identf}`);
    if (input) {
      input.classList.add(classAdd);
      input.classList.remove(classRemove);
    }
    if (messageInput) {
      messageInput.textContent = `${identf} ${data}`;
      messageInput.classList.add(`message_${classAdd}`);
      messageInput.classList.remove(`message_${classRemove}`);
    }
  }

  checkForm(element: any): boolean {
    var errors: any = this.formGroup.get(element.id)?.errors;
    if (errors) {
      if (errors.minlength) {
        this.changeStatusInpu(
          'incorrect_input',
          'correct_input',
          element.id,
          'only has 3 words'
        );
      }
      if (errors.maxlength) {
        this.changeStatusInpu(
          'incorrect_input',
          'correct_input',
          element.id,
          'has more that 50 words'
        );
      }
      if (errors.pattern) {
        this.changeStatusInpu(
          'incorrect_input',
          'correct_input',
          element.id,
          'not a correct data'
        );
      }
      return false;
    } else {
      this.changeStatusInpu(
        'correct_input',
        'incorrect_input',
        element.id,
        'is spelled correctly'
      );
      return true;
    }
  }

  ngOnInit(): void {
    var formCreateFilm: any = document.getElementById('formCreateFilm');

    formCreateFilm.onchange = (e: any) => {
      switch (e.target.name) {
        case 'name':
          if (this.checkForm(e.target)) {
            this.film.name = e.target.value;
          }
          break;
        case 'price':
          if (this.checkForm(e.target)) {
            this.film.price = e.target.value;
          }
          break;
        case 'duration':
          if (this.checkForm(e.target)) {
            this.film.duration = e.target.value;
          }
          break;
        case 'filmvideo':
          if (this.checkForm(e.target)) {
            let filmFile: File = <File>e.target.files[0];
            // this.film.video_url = filmFile;

            let form = new FormData();
            form.append('image', filmFile);

            console.log(form);
            this.filmsService.addFilm(form).subscribe((data: any) => {
              console.log(data);
            });
          }
          break;
        default:
          break;
      }
    };
    formCreateFilm.onsubmit = () => {
      if (this.formGroup.valid) {
        console.log(this.film);
        this.filmsService.addFilm(this.film).subscribe((data: any) => {
          console.log(data);
        });
      }
    };
  }
}
