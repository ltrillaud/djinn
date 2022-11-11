import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss']
})
export class LogoutPageComponent implements OnInit {
  title = ''
  subTitle = ''
  version = ''
  redirect = ''

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // inject dialog parameters with route parameters
    const routeData = this.activatedRoute.snapshot.data['logoutPage']
    this.title = routeData.title
    this.subTitle = routeData.subTitle
    this.version = routeData.version
    this.redirect = routeData.redirect
    console.log(`  logoutPageComp.ts ngOnInit redirect(${this.redirect})`)
  }
}
