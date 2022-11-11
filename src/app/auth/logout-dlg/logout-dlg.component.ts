import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-logout-dlg',
  templateUrl: './logout-dlg.component.html',
  styleUrls: ['./logout-dlg.component.scss']
})
export class LogoutDlgComponent implements OnInit {
  @Input() title = 'No Title'
  @Input() subTitle = 'No Sub Title'
  @Input() version = '0.0.0'
  @Input() redirect = '/'

  loading = false
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(`       logoutDlg.ts onInit`)
  }

  async onConnect(): Promise<void> {
    this.loading = true
    await this.router.navigateByUrl(this.redirect)
    this.loading = false
  }
}
