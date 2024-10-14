import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TicketsService } from '../../services/Ticket/tickets.service';
import { Ticket } from '../../models/ticket';
import { CommentsService } from '../../services/Comment/comments.service';
import { Comment } from '../../models/comment';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/User/user.service';
import { DatePipe } from '@angular/common';
import { User } from '../../models/user';
import { FavoritesService } from '../../services/Favorite/favorites.service';
import { Favorite } from '../../models/favorite';

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
  favorites:Favorite[] = [];
  constructor(private route:ActivatedRoute, private ticketService:TicketsService, private commentService: CommentsService, private userService:UserService, private favoriteService:FavoritesService){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      let id:number = Number(params.get("id"));
      this.getTicket(id);
      this.getComments(id);
      this.getFavorites();
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
    this.displayTicket.resolverId = this.userService.currentUser?.googleId!;
    this.ticketService.updateTicket(this.displayTicket).subscribe(response => {
      console.log(response);
    })
  }

  canUserHelp():boolean{
    let current:User = this.userService.currentUser!;
    if(current?.googleId == this.displayTicket.authorId){
      return true;
    }
    else if(current.role?.roleName == "Admin" || current.role?.roleName == "IT"){
      return true;
    }
    else{
      return false;
    }
  }

  favoriteTicket(){
    let newFavorite:Favorite = {} as Favorite;
    newFavorite.ticketId = this.displayTicket.id;
    newFavorite.userId = this.userService.currentUser?.googleId!;
    this.favoriteService.addFavorite(newFavorite).subscribe(response => {
      this.getFavorites();
    });
  }

  getFavorites(){
    this.favoriteService.getAllFavorites(this.userService.currentUser?.googleId!).subscribe(response => {
      this.favorites = response;
    })
  }

  isFavoritedByUser():boolean{
    if(this.favorites.findIndex(f => f.ticketId == this.displayTicket.id) != -1){
      return true;
    }
    else{
      return false;
    }
  }
}
