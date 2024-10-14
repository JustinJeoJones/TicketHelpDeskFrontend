import { Component } from '@angular/core';
import { UserService } from '../../services/User/user.service';
import { FavoritesService } from '../../services/Favorite/favorites.service';
import { TicketsService } from '../../services/Ticket/tickets.service';
import { Ticket } from '../../models/ticket';
import { Favorite } from '../../models/favorite';
import { CategoriesService } from '../../services/Category/categories.service';
import { Category } from '../../models/category';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { User } from '../../models/user';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {

  tickets:Ticket[] = [];
  favorites:Favorite[] = [];
  allCategories:Category[] = [];
  priorityOrder: string[] = ["Critical", "High", "Medium", "Low"];
  
  showAll:boolean = false;
  constructor(private userService:UserService,private categoryService:CategoriesService, private favoritesService:FavoritesService, private ticketService:TicketsService){}

  ngOnInit(){
    this.getFavorites();
    this.getTickets();
    this.getCategories();
  }

  getTickets(){
    this.ticketService.getAllTicketsByFavs(this.userService.currentUser?.googleId!).subscribe(response => {
      this.tickets = response;
    })
  }

  getFavorites(){
    this.favoritesService.getAllFavorites(this.userService.currentUser?.googleId!).subscribe(response => {
      this.favorites = response;
    })
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(response =>{
      console.log(response);
      this.allCategories = response;
    })
  }

  toggleDisplayTicket(){
    this.showAll = !this.showAll;
  }

  getTicketsByCategories(category:string):Ticket[]{
    return this.tickets.filter(t => t.category.category1.toLowerCase() === category.toLowerCase())
  }

  getTicketsByPriority(tickets:Ticket[]):Ticket[]{
    if(this.isItOrAdmin()){
      return tickets.sort((a, b) => {
        return this.priorityOrder.indexOf(a.priority) - this.priorityOrder.indexOf(b.priority);
      });
    }
    else{
      return tickets.filter(t => t.authorId == this.getCurrentUser()?.googleId).sort((a, b) => {
        return this.priorityOrder.indexOf(a.priority) - this.priorityOrder.indexOf(b.priority);
      });
    }
  }

  isItOrAdmin():boolean{
    let role: string = this.userService.getCurrentUserRole()?.roleName!;
    if(role == "Admin" || role == "IT"){
      return true;
    }
    else{
      return false;
    }
  }

  displayTicket(t:Ticket):boolean{
    if(this.showAll == true){
      return true;
    }
    else{
      return t.completed == false;
    }
  }

  getCurrentUser():User|null{
    return this.userService.currentUser;
  }
}
