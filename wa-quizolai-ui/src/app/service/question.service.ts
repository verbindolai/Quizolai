import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IQuestion } from "../../../../wa-quizolai-shared"


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<IQuestion[]> {
    return this.http.get('http://localhost:50000/questions') as Observable<IQuestion[]>;
  }
}
