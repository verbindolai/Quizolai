import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-question-detail-dialog',
  templateUrl: './question-detail-dialog.component.html',
  styleUrls: ['./question-detail-dialog.component.css']
})
export class QuestionDetailDialogComponent implements OnInit {


  questionJson = '';

  constructor( @Inject(MAT_DIALOG_DATA) public inputData : any ) { }

  ngOnInit(): void {
    this.questionJson = JSON.stringify(this.inputData, null, 2);
  }

}
