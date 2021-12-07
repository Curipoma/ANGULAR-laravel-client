import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/db/users.service';
import { AuthUserService } from '../../services/auth-user/auth-user.service';
import { CNavService } from '../../services/components/c-nav.service';
import { User } from '../../models/User.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  user: User;
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private authUserService: AuthUserService,
    private cNavService: CNavService,
    private router: Router
  ) {
    this.user = {};
    this.formGroup = this.formBuilder.group({
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
        this.usersService.loginUser(this.user).subscribe(
          (data: any): any => {
            this.formGroup.reset();
            this.user = this.authUserService.handleData(data);
            this.cNavService.login();
            if (this.user.rol == 1) {
              this.router.navigateByUrl('/films');
            } else {
              this.router.navigateByUrl('/content');
            }
          },
          () => {
            this.changeStatusInpu(
              'incorrect_input',
              'correct_input',
              'submit',
              ', wrong values'
            );
          }
        );
      } else {
        this.changeStatusInpu(
          'incorrect_input',
          'correct_input',
          'submit',
          ', required fill in all the fields correctly'
        );
      }
    });
    form.addEventListener('keyup', (e: any): any => {
      this.changeStatusInpu(
        '',
        'incorrect_input',
        'submit',
        'required fill in all the fields correctly'
      );
      var inputs: any = document.querySelectorAll('#form input');
      inputs.forEach((element: any): any => {
        switch (element.id) {
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
          default:
            break;
        }
      });
    });
  }
}
