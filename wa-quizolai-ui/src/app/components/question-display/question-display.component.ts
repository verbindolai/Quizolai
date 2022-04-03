import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionService} from 'src/app/service/question.service';
import {IQuestion} from "../../../../../wa-quizolai-shared"
import {MatSnackBar} from "@angular/material/snack-bar";
import {AddQuestionDialogComponent} from "../add-question-dialog/add-question-dialog.component";
import {IQuestionFormInput} from "../question-form/question-form.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "@auth0/auth0-angular";
import {UserService} from "../../service/user.service";
import {QuestionDetailDialogComponent} from "../question-detail-dialog/question-detail-dialog.component";
import {MatTable} from "@angular/material/table";


@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.css']
})
export class QuestionDisplayComponent implements OnInit {

  displayedColumns: string[] = ['author', 'question', 'category', 'difficulty', 'actions', 'info'];

  @ViewChild('questionTable') questionTable!: MatTable<IQuestion>;

  @Input() dataSource: IQuestion[] = [];
  @Input() dataLoading = false;
  canEdit = false;


  categoryFilterString: string = "";
  authorFilterString: string = "";
  questionFilterString: string = "";

  filteredData: IQuestion[] = [];


  constructor(private questionService: QuestionService, private _snackBar: MatSnackBar, public dialog: MatDialog, public auth: AuthService, public userService: UserService) {


  }

  getStringsFromQuestionAnswerArray = QuestionDisplayComponent.getStringsFromQuestionAnswerArray;

  ngOnInit(): void {
    this.userService.canEdit().then((canEdit) => {
      this.canEdit = canEdit;
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

  openInfoDialog(question: any) {
    this.dialog.open(QuestionDetailDialogComponent, {
      data: question
    });
  }

  editQuestion(question: IQuestion) {
    this.openDialog(AddQuestionDialogComponent.getQuestionFormInputFromIQuestion(question));
  }

  static getStringsFromQuestionAnswerArray(answers: IQuestion['answers']): string[] {
    return answers.map(answer => answer.answer);
  }

  resetFilters() {
    this.questionTable.dataSource = this.dataSource;
    this.categoryFilterString = "";
    this.authorFilterString = "";
    this.questionFilterString = "";
  }

  applyFilter() {
    console.log(this.categoryFilterString);
    this.filteredData = this.dataSource.filter((question) => {

      if (this.categoryFilterString) {
        if (question.category.toLowerCase().indexOf(this.categoryFilterString.toLowerCase()) === -1) {
          console.log("Category filter failed");
          return false;
        }
      }

      if (this.authorFilterString) {
        if (question.author.toLowerCase().indexOf(this.authorFilterString.toLowerCase()) === -1) {
          return false;
        }
      }

      if (this.questionFilterString) {
        if (question.question.toLowerCase().indexOf(this.questionFilterString.toLowerCase()) === -1) {
          return false;
        }
      }

      return true;
    });

    this.questionTable.dataSource = this.filteredData;
  }
}
