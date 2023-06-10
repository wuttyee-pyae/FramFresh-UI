import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';

import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FruitDetailComponent } from './pages/fruit-detail/fruit-detail.component';
import { HttpConfigInterceptor } from './httpconfig.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FruitDetailComponent
  ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    MdbCheckboxModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatAutocompleteModule
  ],
   exports: [
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
