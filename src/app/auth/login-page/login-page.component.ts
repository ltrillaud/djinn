import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  title = ''
  subTitle = ''
  version = ''
  redirect = ''
  username = ''
  password = ''

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // inject dialog parameters with route parameters
    const routeData = this.activatedRoute.snapshot.data['loginPage']
    this.title = routeData.title
    this.subTitle = routeData.subTitle
    this.version = routeData.version
    this.redirect = routeData.redirect
    this.username = routeData.username
    this.password = routeData.password
    console.log(`   loginPageComp.ts ngOnInit redirect(${this.redirect}) autoUsername(${this.username})`)
  }
}
