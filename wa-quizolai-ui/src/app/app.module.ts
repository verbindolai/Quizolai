import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { QuestionDisplayComponent } from './components/question-display/question-display.component';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddQuestionDialogComponent } from './components/add-question-dialog/add-question-dialog.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSliderModule} from "@angular/material/slider";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AuthModule, AuthHttpInterceptor} from "@auth0/auth0-angular";
import { environment as env } from '../environments/environment';
import { LoginButtonComponent } from './components/general/login-button/login-button.component';
import { LogoutButtonComponent } from './components/general/logout-button/logout-button.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QuestionDisplayComponent,
    QuestionFormComponent,
    AddQuestionDialogComponent,
    LoginButtonComponent,
    LogoutButtonComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatChipsModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor:{
        allowedList: [`${env.dev.serverUrl}/api/questions`]
      }
    }),

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
