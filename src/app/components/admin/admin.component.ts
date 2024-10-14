import { Component } from '@angular/core';
import { UserService } from '../../services/User/user.service';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { RolesService } from '../../services/Role/roles.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  constructor(private userService:UserService, private roleService: RolesService){}
  allUsers:User[] = [];
  filter:string = "";

  ngOnInit(){
    this.getUsers();
  }
  getUsers(){
    this.userService.getAllUsers().subscribe(response => {
      this.allUsers = response;
    })
  }

  getFiltered(){
    return this.allUsers.filter(u => u.googleId.includes(this.filter) || u.username.toLowerCase().includes(this.filter.toLowerCase()))
  }
  getRole():Role|undefined{
    return this.userService.getCurrentUserRole();
  }

  updateRole(u:User, role:number){
    u.roleId = role;
    this.userService.updateUser(u).subscribe(response => {
      this.getUsers();
    });
  }
}
