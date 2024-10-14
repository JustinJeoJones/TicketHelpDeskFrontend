import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private socialAuthServiceConfig: SocialAuthService){}
  title = 'helpdeskFrontend';
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;

  ngOnInit(){
    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
      this.user = userResponse;
      //if login fails, it will return null.
      this.loggedIn = (userResponse != null);
    });
  }
}
