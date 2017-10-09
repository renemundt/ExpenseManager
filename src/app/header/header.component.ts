import { Component, OnInit } from '@angular/core'
import { AuthService } from '../auth/auth.service'
import { Profile } from '../expenses/expense.models';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    profile: any

    authorizationService: AuthService

    constructor(private authService: AuthService) {
        this.authorizationService = authService
    }

    ngOnInit() {

        if (this.authorizationService.userProfile) {
            this.profile = this.authorizationService.userProfile;
        } else if (this.authorizationService.isAuthenticated()) {
            this.authorizationService.getProfile((err, profile) => {
                this.profile = profile;
            });
        }
    }

}
