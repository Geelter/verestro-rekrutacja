export interface JsonQuestionValidators {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}
interface JsonQuestionControlOptions {
  min?: number;
  max?: number;
  step?: number;
}
export interface JsonSurveyQuestion {
  questionLabel: string;
  questionControlName: string;
  defaultValue: string | number | boolean;
  questionChoices?: string[];
  questionType: string;
  questionControlOptions?: JsonQuestionControlOptions;
  questionValidators: JsonQuestionValidators;
}
export interface JsonSurveyData {
  title: string;
  questions: JsonSurveyQuestion[];
}
