import { IQuestionAnswer } from './../../../../../../wa-quizolai-shared/interface/question.interface.d';
import { Component, OnInit, Attribute, Input, EventEmitter, Output } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChip, MatChipInputEvent} from '@angular/material/chips';


@Component({
  selector: 'app-chip-input',
  templateUrl: './chip-input.component.html',
  styleUrls: ['./chip-input.component.css']
})
export class ChipInputComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER] as const;

  @Input()
  chips:  IQuestionAnswer[] = [];

  @Output()
  chipsChange = new EventEmitter<IQuestionAnswer[]>();

  constructor(@Attribute('label') public label: string, @Attribute('placeholder') public placeholder: string, @Attribute('required') public required: boolean) {
  }

  ngOnInit(): void {
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '');

    if (value) {
      this.chips.push({answer: value, correct: false});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(answer : IQuestionAnswer): void {
    const index = this.chips.indexOf(answer);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }
}
