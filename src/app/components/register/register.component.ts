import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User.interface';
import { UsersService } from '../../services/db/users.service';
import { TokenService } from '../../services/auth-user/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: User;
  formGroup: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private tokenService: TokenService
  ) {
    this.user = {};
    this.formGroup = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/[a-zA-Z]/),
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/[A-Za-z0-9]/),
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      ],
      password_2: [
        '',
        [
          Validators.required,
          Validators.pattern(/[A-Za-z0-9]/),
          Validators.minLength(10),
          Validators.maxLength(15),
        ],
      ],
      age: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{1,3}\b/),
          Validators.minLength(1),
          Validators.maxLength(3),
        ],
      ],
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
    var form: any = document.getElementById('form');
    form.addEventListener('submit', (): any => {
      if (this.formGroup.valid) {
        this.usersService.addUser(this.user).subscribe(
          (data: any): any => {
            if (data) {
              this.tokenService.handleData(data.token);
              this.router.navigate(['content']);
            } else {
              this.changeStatusInpu(
                'incorrect_input',
                'correct_input',
                'submit',
                ', registration error : /'
              );
            }
          },
          () => {
            this.changeStatusInpu(
              'incorrect_input',
              'correct_input',
              'submit',
              ', registration error : /'
            );
          },
          () => {
            this.formGroup.reset();
            this.router.navigate(['login']);
          }
        );
      } else {
        this.changeStatusInpu(
          'incorrect_input',
          'correct_input',
          'submit',
          ', required fill in all the fields correctly : /'
        );
      }
    });
    form.addEventListener('keyup', (): any => {
      this.changeStatusInpu('', 'incorrect_input', 'submit', '');
      var inputs: any = document.querySelectorAll('#form input');
      inputs.forEach((element: any): any => {
        switch (element.id) {
          case 'name':
            if (this.checkForm(element)) {
              this.user.name = element.value;
            }
            break;
          case 'email':
            if (this.checkForm(element)) {
              this.user.email = element.value;
            }
            break;
          case 'password':
            if (this.checkForm(element)) {
              this.user.password = element.value;
            }
            break;
          case 'password_2':
            var pass1: any = document.getElementById('password');
            if (pass1.value === element.value && pass1.value && element.value) {
              this.changeStatusInpu(
                'correct_input',
                'incorrect_input',
                element.id,
                ' and password one aren iquality'
              );
              if (this.checkForm(element)) {
                this.user.password = element.value;
              }
            } else {
              this.changeStatusInpu(
                'incorrect_input',
                'correct_input',
                element.id,
                " and password one aren't equality"
              );
            }
            break;
          case 'age':
            if (this.checkForm(element)) {
              this.user.age = element.value;
            }
            break;
          default:
            break;
        }
      });
    });
  }
}
