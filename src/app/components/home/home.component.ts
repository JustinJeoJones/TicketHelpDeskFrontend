import { Component } from '@angular/core';
import { TicketFormComponent } from '../ticket-form/ticket-form.component';
import { TicketsService } from '../../services/Ticket/tickets.service';
import { Ticket } from '../../models/ticket';
import { CategoriesService } from '../../services/Category/categories.service';
import { Category } from '../../models/category';
import { UserService } from '../../services/User/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicketFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  allTickets: Ticket[] = [];
  allCategories: Category[] = [];
  priorityOrder: string[] = ["Critical", "High", "Medium", "Low"];

  constructor(private userService: UserService, private ticketService: TicketsService, private categoryService:CategoriesService){}

  ngOnInit(){
    this.getTickets();
    this.getCategories();
  }

  getTickets(){
    this.ticketService.getAllTickets().subscribe(response => {
      this.allTickets = response;
      console.log(response);
    })
  }

  getTicketsByPriority():Ticket[]{
    return this.allTickets.sort((a, b) => {
      return this.priorityOrder.indexOf(a.priority) - this.priorityOrder.indexOf(b.priority);
    });
  }

  getCategories(){
    this.categoryService.getAllCategories().subscribe(response =>{
      console.log(response);
      this.allCategories = response;
    })
  }

  getCurrentUser():User|null{
    return this.userService.currentUser;
  }

  addTicket(t:Ticket){
    this.ticketService.addTicket(t).subscribe(response => {
      this.getTickets();
    });
  }
}
