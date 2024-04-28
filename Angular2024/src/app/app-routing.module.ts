// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// import { LoginComponent } from './login/login.component';
// import { RegisterComponent } from './register/register.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { EventDetailsComponent } from './event-details/event-details.component';
// import { AddEventComponent } from './add-event/add-event.component';
// import { AuthGuardService } from './auth/auth.guard';

// const routes: Routes = [
//   { path: '', component: HomeComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'event-details/:id', component: EventDetailsComponent, canActivate: [AuthGuardService] },
//   { path: 'add-event', component: AddEventComponent },
//   { path: 'edit-event/:id', component: AddEventComponent },
//   { path: '**', redirectTo: '/404' },
//   // { path: '404', component: ErrorComponent },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}


import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AddEventComponent } from './add-event/add-event.component';
import { AuthGuardService } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'event-details/:id', component: EventDetailsComponent, canActivate: [AuthGuardService],data: { roles: ['groom', 'bride', 'organizer', 'guest'] } },
  { path: 'add-event', component: AddEventComponent, canActivate: [AuthGuardService], data: { roles: ['groom', 'bride', 'organizer'] } },
  { path: 'edit-event/:id', component: AddEventComponent, canActivate: [AuthGuardService], data: { roles: ['groom', 'bride', 'organizer'] } },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
