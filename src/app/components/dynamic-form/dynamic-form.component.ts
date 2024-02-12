import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {JsonSurveyData} from "../../models/json-form-data.interface";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSlider, MatSliderThumb} from "@angular/material/slider";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatListOption, MatSelectionList} from "@angular/material/list";

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatCheckbox,
    MatSlideToggle,
    MatSlider,
    MatSliderThumb,
    MatCard,
    MatCardHeader,
    MatButton,
    MatRadioGroup,
    MatRadioButton,
    MatSelectionList,
    MatListOption,
    MatCardTitle,
    MatCardContent
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
  @Input({required: true}) jsonFormData!: JsonSurveyData;
  @Output() formSubmitted = new EventEmitter<AbstractControl>();

  private readonly formBuilder = inject(FormBuilder);
  dynamicForm: FormGroup = this.formBuilder.group({});

  private createForm(formData: JsonSurveyData) {
    console.log('createForm');
    console.log(formData);

    formData.questions.forEach(control => {
      const validators: ValidatorFn[] = [];

      for (const [key, value] of Object.entries(control.questionValidators)) {
        switch (key) {
          case 'min':
            validators.push(Validators.min(value));
            break;
          case 'max':
            validators.push(Validators.max(value));
            break;
          case 'minLength':
            validators.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validators.push(Validators.maxLength(value));
            break;
          case 'required':
            validators.push(Validators.required);
            break;
          case 'requiredTrue':
            validators.push(Validators.requiredTrue);
            break;
          case 'email':
            validators.push(Validators.email);
            break;
          case 'pattern':
            validators.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            validators.push(Validators.nullValidator)
            break;
          default:
            break;
        }
      }

      if (control.questionType == 'multiple-choice') {
        this.dynamicForm.addControl(
          control.questionControlName,
          this.formBuilder.control([])
        )
      } else {
        this.dynamicForm.addControl(
          control.questionControlName,
          this.formBuilder.control(control.defaultValue, validators)
        );
      }
    })
  }

  onSubmit() {
    this.formSubmitted.emit(this.dynamicForm.value);
  }

  ngOnInit() {
    this.createForm(this.jsonFormData);
  }
}
