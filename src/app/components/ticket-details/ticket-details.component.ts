import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from '../../services/Ticket/tickets.service';
import { Ticket } from '../../models/ticket';
import { CommentsService } from '../../services/Comment/comments.service';
import { Comment } from '../../models/comment';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/User/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ticket-details',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './ticket-details.component.html',
  styleUrl: './ticket-details.component.css'
})
export class TicketDetailsComponent {
  commentForm:Comment = {} as Comment;
  displayTicket:Ticket = {} as Ticket;
  comments:Comment[] = [];
  constructor(private route:ActivatedRoute, private ticketService:TicketsService, private commentService: CommentsService, private userService:UserService){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let id:number = Number(params.get("id"));
      this.getTicket(id);
      this.getComments(id);
    })
  }

  getTicket(id:number){
    this.ticketService.getTicketById(id).subscribe(response => {
      this.displayTicket = response;
    })
  }

  getComments(id:number){
    this.commentService.getAllComments(id).subscribe(response => {
      this.comments = response;
    })
  }

  addComment(){
    this.commentForm.authorId = this.userService.currentUser?.googleId!;
    this.commentForm.date = new Date();
    this.commentForm.ticketId = this.displayTicket.id;
    this.commentService.addComment(this.commentForm).subscribe(response => {
      this.getTicket(this.displayTicket.id);
      this.getComments(this.displayTicket.id);
    })
    this.commentForm = {} as Comment;
  }

  setResolved(){
    this.displayTicket.completed = true;
    this.ticketService.updateTicket(this.displayTicket).subscribe(response => {
      console.log(response);
    })
  }
}
