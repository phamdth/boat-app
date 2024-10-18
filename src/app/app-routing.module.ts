import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BoatListComponent } from './boat-list/boat-list.component';
import { AddBoatComponent } from './add-boat/add-boat.component';
import { EditBoatComponent } from './edit-boat/edit-boat.component';
import { BoatDetailComponent } from './boat-detail/boat-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'boats', component: BoatListComponent },
  { path: 'add-boat', component: AddBoatComponent },
  { path: 'edit-boat/:id', component: EditBoatComponent },
  { path: 'boat/:id', component: BoatDetailComponent },
  { path: '**', redirectTo: '/boats' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
