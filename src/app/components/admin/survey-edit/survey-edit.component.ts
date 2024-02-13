import {Component, inject} from '@angular/core';
import {FormEditorComponent} from "../form-editor/form-editor.component";
import {AsyncPipe} from "@angular/common";
import {SupabaseDatabaseService} from "../../../services/supabase/supabase-database.service";
import {ActivatedRoute, Router} from "@angular/router";
import {JsonSurveyData} from "../../../models/json-form-data.interface";
import {catchError, map, switchMap, take, throwError} from "rxjs";

@Component({
  selector: 'app-survey-edit',
  standalone: true,
  imports: [
    FormEditorComponent,
    AsyncPipe
  ],
  templateUrl: './survey-edit.component.html',
})
export class SurveyEditComponent {
  private readonly databaseService = inject(SupabaseDatabaseService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly surveyData$ = this.activatedRoute.params.pipe(
    map(params => +params['id']),
    switchMap(surveyID => this.databaseService.fetchSurveyForID(surveyID)),
    catchError(error => {
      this.router.navigate(['/admin', 'surveys', 'list']);
      return throwError(() => new Error(error))
    })
  )

  surveyConfigSubmitted(surveyID: number, surveyConfig: JsonSurveyData) {
    this.databaseService.updateSurvey(surveyID, surveyConfig).pipe(
      take(1)
    ).subscribe(() => this.router.navigate(['/admin', 'surveys', 'list']));
  }
}
