import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IQuestion } from "@quizolai-shared/interface/question.interface";
import {IQuestionFormInput} from "../components/question-form/question-form.component";


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  //Questions

  getQuestions(): Observable<IQuestion[]> {
    return this.http.get('http://localhost:50000/api/questions') as Observable<IQuestion[]>;
  }

  getQuestionsFromUser(userId: string): Observable<IQuestion[]> {
    return this.http.get('http://localhost:50000/api/questions/user/' + userId) as Observable<IQuestion[]>;
  }

  addQuestions(questions : IQuestionFormInput[]) {
    return this.http.post('http://localhost:50000/api/questions', questions) as Observable<IQuestion[]>;
  }

  downloadCSV(questions: IQuestion[]) {
    return this.http.post('http://localhost:50000/api/questions/getcsv', questions, {observe: "response", responseType: 'blob' as 'json'});
  }


  //Question

  deleteQuestion(id: string) {
    return this.http.delete('http://localhost:50000/api/question/id/' + id) as Observable<IQuestion>;
  }

  addQuestion(question: IQuestionFormInput) {
    return this.http.post('http://localhost:50000/api/question', question) as Observable<IQuestion>;
  }

  updateQuestion(id: string, question: IQuestionFormInput) {
    return this.http.put('http://localhost:50000/api/question/id/' + id, question) as Observable<IQuestion>;
  }

  getQuestion(id: string): Observable<IQuestion> {
    return this.http.get('http://localhost:50000/api/question/id/' + id) as Observable<IQuestion>;
  }

  getRandomQuestion(): Observable<IQuestion> {
    return this.http.get('http://localhost:50000/api/question/random') as Observable<IQuestion>;
  }

}
