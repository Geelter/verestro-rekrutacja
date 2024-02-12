import {FormArray, FormControl, FormGroup} from "@angular/forms";

export interface SurveyForm {
  title: FormControl<string>;
  questions: FormArray<FormGroup<QuestionGroup>>
}

export interface QuestionGroup {
  questionLabel: FormControl<string>;
  questionControlName: FormControl<string>;
  questionType: FormControl<string>;
  questionChoices: FormArray<FormControl<string>>;
  questionControlOptions: FormGroup<QuestionControlOptionsGroup>;
  questionValidators: FormGroup<QuestionValidatorsGroup>
}

export interface QuestionControlOptionsGroup {
  min: FormControl<number>;
  max: FormControl<number>;
  step: FormControl<number>;
}

export interface QuestionValidatorsGroup {
  min: FormControl<number | null>;
  max: FormControl<number | null>;
  minLength: FormControl<number | null>;
  maxLength: FormControl<number | null>;
  required: FormControl<boolean>;
  requiredTrue: FormControl<boolean>;
  email: FormControl<boolean>;
  pattern: FormControl<string | null>;
  nullValidator: FormControl<boolean>;
}
