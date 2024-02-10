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
  defaultValue: string | number | boolean;
  choices?: string[];
  type: string;
  options?: JsonFormControlOptions;
  validators: JsonFormValidators;
}
export interface JsonFormData {
  title: string;
  controls: JsonFormControl[];
}
