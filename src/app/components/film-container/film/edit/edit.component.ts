import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FilmsService } from '../../../../services/db/films.service';
import { CFilmService } from '../../../../services/components/c-film.service';
import { Films } from '../../../../models/films.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  formGroup: FormGroup;
  form: FormData;
  film: Films;

  constructor(
    private filmsService: FilmsService,
    private cFilmService: CFilmService,
    private formBuilder: FormBuilder
  ) {
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
      filmcover: ['', [Validators.required]],
    });
    this.form = new FormData();
    this.film = {};
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
    if (this.cFilmService.id != undefined) {
      this.filmsService.getFilm(this.cFilmService.id).subscribe((data: any) => {
        this.film = data[0];
        this.formGroup.patchValue({
          name: this.film.name,
          price: this.film.price,
          duration: this.film.duration,
        });
      });
    }

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
            this.form.append('filmvideo', <File>e.target.files[0]);
          }
          break;
        case 'filmcover':
          if (this.checkForm(e.target)) {
            this.form.append('filmcover', <File>e.target.files[0]);
          }
          break;
        default:
          break;
      }
    };
    formCreateFilm.onsubmit = () => {
      if (!this.formGroup.errors) {
        this.form.append('film', JSON.stringify(this.film));
        this.filmsService
          .updateFilm(this.cFilmService.id, this.form)
          .subscribe((data: any) => {
            console.log(data);
            if (data) {
              this.cFilmService.loadIndex();
            }
          });
      }
    };
  }
}
