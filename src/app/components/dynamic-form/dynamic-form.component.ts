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

  onSubmit() {
    this.formSubmitted.emit(this.dynamicForm.value);
  }

  ngOnInit() {
    console.log(this.jsonFormData);
    console.log(this.dynamicForm);
  }
}
