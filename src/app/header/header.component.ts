import { Component, OnInit } from '@angular/core'
import { AuthService } from '../auth/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ AuthService ]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
