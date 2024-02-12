import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JsonSurveyQuestion, JsonSurveyData} from "../../models/json-form-data.interface";
import {FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatListOption, MatSelectionList} from "@angular/material/list";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatDivider} from "@angular/material/divider";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {SurveyForm, QuestionGroup, QuestionControlOptionsGroup, QuestionValidatorsGroup} from "../../models/survey-form.interface";

interface ControlType {
  label: string,
  value: string
}

@Component({
  selector: 'app-form-editor',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatLabel,
    MatListOption,
    MatRadioButton,
    MatRadioGroup,
    MatSelectionList,
    MatSlideToggle,
    MatSlider,
    MatSliderThumb,
    ReactiveFormsModule,
    MatDivider,
    MatSelect,
    MatOption,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './form-editor.component.html',
  styleUrl: './form-editor.component.scss'
})
export class FormEditorComponent {
  readonly controlTypes: ControlType[] = [
    {label: 'Text', value: 'text'},
    {label: 'Password', value: 'password'},
    {label: 'Email', value: 'email'},
    {label: 'Number', value: 'number'},
    {label: 'Search', value: 'search'},
    {label: 'Tel', value: 'tel'},
    {label: 'Url', value: 'url'},
    {label: 'Textarea', value: 'textarea'},
    {label: 'Checkbox', value: 'checkbox'},
    {label: 'Toggle', value: 'toggle'},
    {label: 'Range', value: 'range'},
    {label: 'Single Choice', value: 'radio'},
    {label: 'Multiple Choice', value: 'multiple-choice'},
  ];

  // Default form state
  surveyForm = new FormGroup<SurveyForm>({
    title: new FormControl('New Survey', {nonNullable: true, validators: [Validators.required]}),
    questions: new FormArray<FormGroup>([], [Validators.required, Validators.minLength(1)])
  });

  addQuestion() {
    this.surveyForm.controls.questions.push(this.createQuestion());
  }

  private createQuestion(jsonSurveyQuestion: JsonSurveyQuestion | null = null): FormGroup<QuestionGroup> {
    const newQuestion = new FormGroup<QuestionGroup>({
      questionLabel: new FormControl(
        jsonSurveyQuestion?.questionLabel ?? '',
        {nonNullable: true, validators: [Validators.required]}
      ),
      questionControlName: new FormControl(
        jsonSurveyQuestion?.questionControlName ?? '',
        {nonNullable: true, validators: [Validators.required]}
      ),
      questionType: new FormControl(
        jsonSurveyQuestion?.questionType ?? 'text',
        {nonNullable: true, validators: [Validators.required]}
      ),
      questionValidators: new FormGroup<QuestionValidatorsGroup>({
        min: new FormControl(
          jsonSurveyQuestion?.questionValidators.min ?? null
        ),
        max: new FormControl(
          jsonSurveyQuestion?.questionValidators.max ?? null
        ),
        minLength: new FormControl(
          jsonSurveyQuestion?.questionValidators.minLength ?? null
        ),
        maxLength: new FormControl(
          jsonSurveyQuestion?.questionValidators.maxLength ?? null
        ),
        required: new FormControl(
          jsonSurveyQuestion?.questionValidators.required ?? false,
          {nonNullable: true}
        ),
        requiredTrue: new FormControl(
          jsonSurveyQuestion?.questionValidators.requiredTrue ?? false,
          {nonNullable: true}
        ),
        email: new FormControl(
          jsonSurveyQuestion?.questionValidators.email ?? false,
          {nonNullable: true}
        ),
        pattern: new FormControl(
          jsonSurveyQuestion?.questionValidators.pattern ?? ''
        ),
        nullValidator: new FormControl(
          jsonSurveyQuestion?.questionValidators.nullValidator ?? false,
          {nonNullable: true}
        )
      }),
      questionChoices: this.createQuestionChoicesArray(jsonSurveyQuestion?.questionChoices),
      questionControlOptions: new FormGroup<QuestionControlOptionsGroup>({
        min: new FormControl(
          jsonSurveyQuestion?.questionControlOptions?.min ?? 0,
          {nonNullable: true, validators: [Validators.required]}
        ),
        max: new FormControl(
          jsonSurveyQuestion?.questionControlOptions?.max ?? 10,
          {nonNullable: true, validators: [Validators.required]}
        ),
        step: new FormControl(
          jsonSurveyQuestion?.questionControlOptions?.step ?? 1,
          {nonNullable: true, validators: [Validators.required]}
        )
      })
    });

    if (jsonSurveyQuestion?.questionType !== 'radio' && jsonSurveyQuestion?.questionType !== 'multiple-choice') {
      newQuestion.controls.questionChoices.disable();
    }

    if (jsonSurveyQuestion?.questionType !== 'range') {
      newQuestion.controls.questionControlOptions.disable();
    }

    return newQuestion;
  }

  private createQuestionChoicesArray(choices: string[] | undefined): FormArray<FormControl<string>> {
    let formArray = new FormArray<FormControl<string>>([
      new FormControl(
        '',
        {nonNullable: true, validators: [Validators.required]}
      ),
      new FormControl(
        '',
        {nonNullable: true, validators: [Validators.required]}
      )
    ], [Validators.minLength(2)]);

    if (choices) {
      formArray.clear();
      choices.forEach(choice => formArray.push(new FormControl(
        choice,
        {nonNullable: true, validators: [Validators.required]}
      )))
    }

    return formArray;
  }

  removeQuestionAt(index: number) {
    this.surveyForm.controls.questions.removeAt(index);
  }
}
