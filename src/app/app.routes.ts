import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';

export const routes: Routes = [
    {path:"", component:HomeComponent},
    {path:":id", component:TicketDetailsComponent}
];
