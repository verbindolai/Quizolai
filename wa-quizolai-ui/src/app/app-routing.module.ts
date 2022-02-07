import { QuestionFormComponent } from './components/question-form/question-form.component';
import { QuestionDisplayComponent } from './components/question-display/question-display.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [

  {
    path: '',
    component: QuestionDisplayComponent
  },
  {
    path: 'questions',
    component: QuestionDisplayComponent
  },
  {
    path: 'add',
    component: QuestionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
