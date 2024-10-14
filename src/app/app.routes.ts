import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { AdminComponent } from './components/admin/admin.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const routes: Routes = [
    {path:"", component:HomeComponent},
    {path:"admin", component:AdminComponent},
    {path:"followed", component:FavoritesComponent},
    {path:":id", component:TicketDetailsComponent}
];
