import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { UserService } from '../../services/User/user.service';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [GoogleSigninButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: SocialUser = {} as SocialUser;
  loggedIn: boolean = false;
  displayNavMobile: boolean = false;


  constructor(private socialAuthServiceConfig: SocialAuthService, private userService:UserService) { }

  ngOnInit() {
    //authState is a custom observable that will run again any time changes are noticed.
    this.socialAuthServiceConfig.authState.subscribe((userResponse: SocialUser) => {
      this.user = userResponse;
      //if login fails, it will return null.
      this.loggedIn = (userResponse != null);
      if(this.loggedIn){
        //adds user if not in db
        this.addUser();
      }
    });
  }
  //login component doesn't account for logging out.
  signOut(): void {
    this.socialAuthServiceConfig.signOut();
  }

  //adds user if not in db
  addUser():void{
    let newUser: User = {
      username: this.user.name,
      pfp: this.user.photoUrl,
      googleId: this.user.id
    };

    this.userService.addUser(newUser).subscribe(response => {
      console.log(response);
      this.userService.currentUser = response;
    });
  }

  getRole():Role|undefined{
    return this.userService.getCurrentUserRole();
  }

  toggleNav(){
    this.displayNavMobile = !this.displayNavMobile;
  }
}
