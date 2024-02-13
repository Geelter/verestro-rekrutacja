import {Component, inject} from '@angular/core';
import {SupabaseDatabaseService} from "../../services/supabase/supabase-database.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, map, switchMap, throwError} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {DynamicFormComponent} from "../dynamic-form/dynamic-form.component";

@Component({
  selector: 'app-fill-survey',
  standalone: true,
  imports: [
    AsyncPipe,
    DynamicFormComponent
  ],
  templateUrl: './fill-survey.component.html',
})
export class FillSurveyComponent {
  private readonly databaseService = inject(SupabaseDatabaseService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly surveyData$ = this.activatedRoute.params.pipe(
    map(params => +params['id']),
    switchMap(surveyID => this.databaseService.fetchSurveyForID(surveyID)),
    catchError(error => {
      this.router.navigate(['/surveys', 'list']);
      return throwError(() => new Error(error))
    })
  )

  onSurveySubmitted(surveyID: number, submission: {question: string, answer: unknown}[]) {
    this.databaseService.submitSurveyAnswers(surveyID, submission).subscribe(() =>
      this.router.navigate(['/surveys', 'list'])
    )
  }
}
