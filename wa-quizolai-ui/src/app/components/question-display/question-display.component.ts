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
        console.log(questions);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  deleteQuestion(question: IQuestion) {
    console.log(question);
    if (confirm("Are you sure you want to delete this question?")) {
      this.questionService.deleteQuestion(question._id).subscribe({
        next: (deletedQuestion: IQuestion) => {
          this.dataSource = this.dataSource.filter(q => q._id !== deletedQuestion._id);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  editQuestion(question: IQuestion) {
    console.log(question);
  }

}
