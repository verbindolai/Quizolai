import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IQuestion } from "../../../../wa-quizolai-shared"
import {IQuestionFormInput} from "../components/question-form/question-form.component";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<IQuestion[]> {
    return this.http.get('http://localhost:50000/api/questions') as Observable<IQuestion[]>;
  }

  deleteQuestion(id: string) {
    return this.http.delete('http://localhost:50000/api/question/' + id) as Observable<IQuestion>;
  }

  addQuestion(question: IQuestionFormInput) {
    return this.http.post('http://localhost:50000/api/question', question) as Observable<IQuestion>;
  }
  addQuestions(questions : IQuestionFormInput[]) {
    return this.http.post('http://localhost:50000/api/questions', questions) as Observable<IQuestion[]>;
  }

  updateQuestion(id: string, question: IQuestionFormInput) {
    return this.http.put('http://localhost:50000/api/question/' + id, question) as Observable<IQuestion>;
  }

}
