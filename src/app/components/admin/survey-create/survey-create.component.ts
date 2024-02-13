import {Component, inject} from '@angular/core';
import {FormEditorComponent} from "../../form-editor/form-editor.component";
import {JsonSurveyData} from "../../../models/json-form-data.interface";
import {SupabaseDatabaseService} from "../../../services/supabase/supabase-database.service";
import {take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-survey-create',
  standalone: true,
  imports: [
    FormEditorComponent
  ],
  templateUrl: './survey-create.component.html',
})
export class SurveyCreateComponent {
  private readonly databaseService = inject(SupabaseDatabaseService);
  private readonly router = inject(Router);

  surveyConfigSubmitted(surveyConfig: JsonSurveyData) {
    this.databaseService.createSurvey(surveyConfig).pipe(
      take(1)
    ).subscribe(() => this.router.navigate(['/admin', 'surveys', 'list']));
  }
}
