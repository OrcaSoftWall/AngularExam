import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { firebaseConfig } from '../environments/firebase.config';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEventComponent } from './add-event/add-event.component';
import { FormsModule } from '@angular/forms';

import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './google-map/google-map.component';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MenuComponent } from './menu/menu.component';
import { AddMenuItemComponent } from './add-menu-item/add-menu-item.component';
import { CommonModule } from '@angular/common';
import { GuestsComponent } from './guests/guests.component';
import { EditGuestComponent } from './edit-guest/edit-guest.component';
// import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    EventDetailsComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AddEventComponent,
    MapComponent,
    MenuComponent,
    AddMenuItemComponent,
    GuestsComponent,
    EditGuestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule, 
    RouterModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
