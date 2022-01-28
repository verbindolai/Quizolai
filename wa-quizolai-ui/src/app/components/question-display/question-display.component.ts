import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { IQuestion } from "../../../../../wa-quizolai-shared"


@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent implements OnInit {

  displayedColumns: string[] = ['author', 'question', 'answers', 'category', 'tags', 'date', 'actions'];
  dataSource: IQuestion[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe({
      next: (questions: IQuestion[]) => {
        this.dataSource = questions;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
