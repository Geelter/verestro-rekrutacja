import {Component} from '@angular/core';

interface ControlType {
  label: string,
  value: string
}

@Component({
  selector: 'app-form-editor',
  standalone: true,
  imports: [],
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
}
