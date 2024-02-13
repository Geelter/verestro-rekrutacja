import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatLabel} from "@angular/material/form-field";

@Component({
  selector: 'app-survey-preview-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatLabel,
    MatCardContent,
    MatCardTitle
  ],
  templateUrl: './survey-preview-card.component.html',
  styleUrl: './survey-preview-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SurveyPreviewCardComponent {
  @Input({required: true}) surveyTitle!: string;
}
