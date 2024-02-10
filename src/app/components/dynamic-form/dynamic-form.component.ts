import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {JsonFormData} from "../../models/json-form-data.interface";

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent {
  @Input({required: true}) jsonFormData!: JsonFormData;
}
