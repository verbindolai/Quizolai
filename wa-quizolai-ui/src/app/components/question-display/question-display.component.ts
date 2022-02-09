import {Component, OnInit} from '@angular/core';
import {QuestionService} from 'src/app/service/question.service';
import {IQuestion} from "../../../../../wa-quizolai-shared"
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddQuestionDialogComponent} from "../add-question-dialog/add-question-dialog.component";
import {IQuestionFormInput} from "../question-form/question-form.component";
import {MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent implements OnInit {

  displayedColumns: string[] = ['author', 'question', 'answers', 'category', 'tags', 'difficulty', 'date', 'actions'];
  dataSource: IQuestion[] = [];
  dataLoading = false;

  constructor(private questionService: QuestionService, private _snackBar: MatSnackBar, public dialog: MatDialog) {
  }

  getStringsFromQuestionAnswerArray = QuestionDisplayComponent.getStringsFromQuestionAnswerArray;

  ngOnInit(): void {
    this.dataLoading = true;
    this.questionService.getQuestions().subscribe({
      next: (questions: IQuestion[]) => {
        this.dataSource = questions;
      },
      error: (err) => {
        this.dataLoading = false;
        this._snackBar.open("Error loading questions", "Close", {
          duration: 2000,
        });
      },
      complete: () => {
        this.dataLoading = false;
      }
    });
  }

  deleteQuestion(question: IQuestion) {
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

  openDialog(data?: any): void {
    const dialogRef = this.dialog.open(AddQuestionDialogComponent, {
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const question: IQuestionFormInput = {
          author: result.author,
          question: result.question,
          answers: result.answers,
          category: result.category,
          difficulty: result.difficulty,
          tags: result.tags,
          id: result.id
        }

        let index = this.dataSource.findIndex(q => q._id === question.id);
        if (index !== -1) {
          const newQuestion = Object.assign({}, this.dataSource[index], question);
          this.questionService.updateQuestion(newQuestion._id, newQuestion).subscribe({
            next: (updatedQuestion: IQuestion) => {
              const newData = [...this.dataSource];
              newData[index] = updatedQuestion;
              this.dataSource = newData;
            },
            error: (err) => {
              this._snackBar.open("Error updating question", "Close", {
                duration: 2000,
              });
            }
          });

        } else {
          this._snackBar.open("Error updating question", "Close", {
            duration: 2000,
          });
        }
      }
    });

  }


  editQuestion(question: IQuestion) {
    this.openDialog(AddQuestionDialogComponent.getQuestionFormInputFromIQuestion(question));
  }

  static getStringsFromQuestionAnswerArray(answers: IQuestion['answers']): string[] {
    return answers.map(answer => answer.answer);
  }

}
