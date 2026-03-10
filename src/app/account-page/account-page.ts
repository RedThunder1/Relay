import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-account-page',
  imports: [],
  templateUrl: './account-page.html',
  styleUrl: './account-page.css',
})
export class AccountPage implements OnInit {

  identifier!: HTMLInputElement;
  password!: HTMLInputElement;
  submit!: HTMLInputElement;
  errorPanel!: HTMLDivElement;
  http = inject(HttpClient)

  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  isValidEmail = (email: any) => this.emailRegex.test(email);

  ngOnInit(): void {
    this.identifier = <HTMLInputElement>document.getElementById('account_identifier')
    this.password = <HTMLInputElement>document.getElementById('account_password')
    this.submit = <HTMLInputElement>document.getElementById('account_form_submit')
    this.errorPanel = <HTMLDivElement>document.getElementById('error_message_panel');
  }

  onLogin(e: PointerEvent) {
    e.preventDefault()
    if (this.identifier.value == '' || this.password.value == '') {
      //show error
      this.errorPanel.style.opacity = '1';
      this.errorPanel.innerText = 'You must provide a username and password';
      setTimeout(() => {
        this.errorPanel.style.opacity = '';
      },5000)
      return
    }

    this.http.post('http://localhost:3000/login', {identifier: this.identifier.value, password: this.password.value}).subscribe()
  }

  onCreateAccount(e: PointerEvent): void {
    e.preventDefault()
    let identifier: HTMLInputElement = (document.getElementById('account_identifier') as HTMLInputElement)
    let email: HTMLInputElement = (document.getElementById('account_email')!! as HTMLInputElement)
    let password: HTMLInputElement = (document.getElementById('account_password')!! as HTMLInputElement)
    let password_confirm: HTMLInputElement = (document.getElementById('account_confirm')!! as HTMLInputElement)

    //Check if all fields are filled
    if (email.value == '' || password_confirm.value == '' || password.value == '' || identifier.value == '') {
      this.errorPanel!!.style.opacity = '1';
      this.errorPanel!!.innerText = 'You must fill in all fields';
      setTimeout(() => {
        this.errorPanel!!.style.opacity = '';
      },5000)
      return
    }

    //Check if email formatted correctly
    if (!this.isValidEmail(email.value)) {
      this.errorPanel!!.style.opacity = '1';
      this.errorPanel!!.innerText = 'Enter valid email!';
      setTimeout(() => {
        this.errorPanel!!.style.opacity = '';
      },5000)
      return
    }

    //Check if passwords match
    if (password.value !== password_confirm.value) {
      this.errorPanel!!.style.opacity = '1';
      this.errorPanel!!.innerText = 'Passwords must match!';
      setTimeout(() => {
        this.errorPanel!!.style.opacity = '';
      },5000)
      return
    }

    this.http.post('http://localhost:3000/createaccount', {email: email.value, identifier: identifier.value, password: password.value}).subscribe()


  }

  loadCreateAccount(): void {
    const panel = '<h2>Create Account</h2><form id="account_panel_form"><input type="email" placeholder="email" class="account_form_input" id="account_email">' +
      '<input type="text" placeholder="username" class="account_form_input" id="account_identifier"><input type="password" placeholder="password" class="account_form_input" id="account_password">' +
      '<input type="password" placeholder="confirm password" class="account_form_input" id="account_confirm"></form>';


    document.getElementById('account_panel')!!.style.width = '400px';
    document.getElementById('account_panel_info')!.style.width = '0';
    let panelCont = document.getElementById('account_panel_login')!
    panelCont.style.width = '400px';
    panelCont.innerHTML = panel;
    let submit = document.createElement('input');
    submit.type = 'submit';
    submit.id = 'account_form_submit';
    submit.value = 'Login';
    submit.addEventListener('click', (e) => {
      this.onCreateAccount(e)
    })
    document.getElementById("account_panel_form")?.appendChild(submit)

  }
}
