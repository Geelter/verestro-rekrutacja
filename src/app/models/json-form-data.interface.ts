interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}
interface JsonFormControl {
  name: string;
  label: string;
  value: string | number | boolean;
  type: string;
  options?: JsonFormControlOptions;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  controls: JsonFormControl[];
}
