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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { OverviewComponent } from './components/overview/overview.component';
import { UserQuestionsComponent } from './components/user-questions/user-questions.component';
import { QuestionDetailDialogComponent } from './components/question-detail-dialog/question-detail-dialog.component';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    QuestionDisplayComponent,
    QuestionFormComponent,
    AddQuestionDialogComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SidenavComponent,
    OverviewComponent,
    UserQuestionsComponent,
    QuestionDetailDialogComponent,

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
        FontAwesomeModule,
        MatProgressSpinnerModule,
        AuthModule.forRoot({
            ...env.auth,
            httpInterceptor: {
                allowedList: [
                    {
                        uri: `${env.dev.serverUrl}/api/question`,
                        httpMethod: 'POST'
                    },
                    {
                        uri: `${env.dev.serverUrl}/api/questions`,
                        httpMethod: 'POST'
                    },
                    {
                        uri: `${env.dev.serverUrl}/api/question/*`,
                        httpMethod: 'DELETE'
                    },
                    {
                        uri: `${env.dev.serverUrl}/api/question/*`,
                        httpMethod: 'PUT'
                    },
                    {
                        uri: `${env.dev.serverUrl}/api/questions/user/*`,
                        httpMethod: 'GET'
                    }
                ]
            }
        }),
        MatExpansionModule,
        MatSelectModule,

    ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
