import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ticket } from '../../models/ticket';
import { Category } from '../../models/category';
import { User } from '../../models/user';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ticket-form.component.html',
  styleUrl: './ticket-form.component.css'
})
export class TicketFormComponent {
  constructor(){}
  @Input() user:User | null = {} as User;
  @Input() categories: Category[] = []; 
  @Output() emitTicket = new EventEmitter<Ticket>();

  formTicket:Ticket = {} as Ticket;


  emit(){
    //setting defaults
    this.formTicket.resolution = "";
    this.formTicket.completed = false;
    this.formTicket.authorId = this.user?.googleId!;
    this.formTicket.date = new Date();
    this.emitTicket.emit(this.formTicket);
    this.formTicket = {} as Ticket;
  }
}
