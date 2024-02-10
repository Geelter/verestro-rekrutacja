import {ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {JsonFormData} from "../../models/json-form-data.interface";
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    ReactiveFormsModule],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {
  @Input({required: true}) jsonFormData!: JsonFormData;
  @Output() formSubmitted = new EventEmitter<AbstractControl>();

  private readonly formBuilder = inject(FormBuilder);
  dynamicForm: FormGroup = this.formBuilder.group({});

  private createForm(formData: JsonFormData) {
    formData.controls.forEach(control => {
      const validators = [];

      for (const [key, value] of Object.entries(control.validators)) {
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

      this.dynamicForm.addControl(
        control.name,
        this.formBuilder.control(control.value, validators)
      );
    })
  }

  onSubmit() {
    this.formSubmitted.emit(this.dynamicForm.value);
  }

  ngOnInit() {
    this.createForm(this.jsonFormData);
  }
}
