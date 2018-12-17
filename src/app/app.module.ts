import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MobileListComponent } from './mobile-list/mobile-list.component';
import { MobileDetailComponent } from './mobile-detail/mobile-detail.component';
import { FiltersComponent } from './mobile-list/filters/filters.component';
import { HttpClientModule } from '@angular/common/http';
import { MobileItemComponent } from './mobile-list/mobile-item/mobile-item.component';
import { CheckboxComponent } from './mobile-list/filters/checkbox/checkbox.component';
import { ModalComponent } from './mobile-list/filters/modal/modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { MobileService } from './mobile-list/mobile.service';
import { HomeComponent } from './home/home.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MobileListComponent,
    MobileDetailComponent,
    FiltersComponent,
    MobileItemComponent,
    CheckboxComponent,
    ModalComponent,
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxSpinnerModule,
    AppRoutingModule
    // FontAwesomeModule
  ],
  providers: [MobileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
