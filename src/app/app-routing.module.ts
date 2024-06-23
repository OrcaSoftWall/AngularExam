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
import { MenuComponent } from './menu/menu.component';
import { AddMenuItemComponent } from './add-menu-item/add-menu-item.component';
import { GuestsComponent } from './guests/guests.component';
import { EditGuestComponent } from './edit-guest/edit-guest.component';
import { GuestBookComponent } from './guest-book/guest-book.component';
import { BrideGroomIntroComponent } from './bride-groom-intro/bride-groom-intro.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { GalleryUploadComponent } from './gallery-upload/gallery-upload.component';
import { GalleryDisplayComponent } from './gallery-display/gallery-display.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'bride-groom', component: BrideGroomIntroComponent },
  { path: 'event-details/:id', component: EventDetailsComponent, canActivate: [AuthGuardService],data: { roles: ['groom', 'bride', 'organizer', 'guest'] } },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuardService],data: { roles: ['groom', 'bride', 'organizer', 'guest'] } },
  { path: 'add-menu-item', component: AddMenuItemComponent, canActivate: [AuthGuardService], data: { roles: ['groom', 'bride', 'organizer'] } },
  { path: 'add-event', component: AddEventComponent, canActivate: [AuthGuardService], data: { roles: ['groom', 'bride', 'organizer'] } },
  { path: 'edit-event/:id', component: AddEventComponent, canActivate: [AuthGuardService], data: { roles: ['groom', 'bride', 'organizer'] } },
  { path: 'guests', component: GuestsComponent, canActivate: [AuthGuardService],data: { roles: ['groom', 'bride', 'organizer', 'guest'] } },
  { path: 'edit-guest', component: EditGuestComponent, canActivate: [AuthGuardService],data: { roles: ['groom', 'bride', 'organizer', 'guest'] } },
  { path: 'guest-book', component: GuestBookComponent, canActivate: [AuthGuardService],data: { roles: ['groom', 'bride', 'organizer', 'guest'] } },
  { path: 'gallery-upload', component: GalleryUploadComponent, canActivate: [AuthGuardService],data: { roles: ['groom', 'bride', 'organizer', 'guest'] } },
  { path: 'gallery-display', component: GalleryDisplayComponent, canActivate: [AuthGuardService],data: { roles: ['groom', 'bride', 'organizer', 'guest'] } },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
