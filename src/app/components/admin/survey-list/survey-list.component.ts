import {Component, inject, OnInit} from '@angular/core';
import {SupabaseDatabaseService} from "../../../services/supabase/supabase-database.service";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {AsyncPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatLabel} from "@angular/material/form-field";
import {filter, switchMap, take} from "rxjs";
import {SurveyPreviewCardComponent} from "../../survey-preview-card/survey-preview-card.component";
import {MatDialog} from "@angular/material/dialog";
import {DeleteSurveyDialogComponent} from "../../delete-survey-dialog/delete-survey-dialog.component";

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [
    MatButton,
    AsyncPipe,
    MatProgressSpinner,
    MatLabel,
    SurveyPreviewCardComponent
  ],
  templateUrl: './survey-list.component.html',
  styleUrl: './survey-list.component.scss'
})
export class SurveyListComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly databaseService = inject(SupabaseDatabaseService);
  private readonly dialog = inject(MatDialog);

  surveyMetadata: {id: number, title: string}[] | undefined;

  onCreateSurvey() {
    this.router.navigate(['/admin', 'surveys', 'create']);
  }

  onEditSurvey(surveyID: number) {
    this.router.navigate(['/admin', 'surveys', 'edit', surveyID]);
  }

  showDeleteDialogFor(surveyID: number) {
    this.dialog.open(DeleteSurveyDialogComponent, {
      width: '250px'
    }).afterClosed().pipe(
      filter(result => result == true),
      switchMap(() => this.databaseService.deleteSurvey(surveyID)),
    ).subscribe(() => {
      this.surveyMetadata = this.surveyMetadata?.filter(value => value.id !== surveyID)
    })
  }

  ngOnInit() {
    this.databaseService.fetchAllSurveys()
      .pipe(
        take(1)
      ).subscribe(surveyMetadata =>
        this.surveyMetadata = surveyMetadata
      );
  }
}
