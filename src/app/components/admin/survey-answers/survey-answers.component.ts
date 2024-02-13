import {Component, inject} from '@angular/core';
import {SupabaseDatabaseService} from "../../../services/supabase/supabase-database.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, filter, map, switchMap, take, throwError} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";
import {DeleteSubmissionDialogComponent} from "../../delete-submission-dialog/delete-submission-dialog.component";

@Component({
  selector: 'app-survey-answers',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatIcon,
    MatIconButton,
    MatCardContent,
    MatDivider
  ],
  templateUrl: './survey-answers.component.html',
  styleUrl: './survey-answers.component.scss'
})
export class SurveyAnswersComponent {
  private readonly databaseService = inject(SupabaseDatabaseService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  surveySubmissions: {id: number, answers: {question: string, answer: string}[]}[] | undefined;

  showDeleteDialogFor(submissionID: number) {
    this.dialog.open(DeleteSubmissionDialogComponent, {
      width: '250px'
    }).afterClosed().pipe(
      filter(result => result == true),
      switchMap(() => this.databaseService.deleteSurveyAnswersFor(submissionID)),
    ).subscribe(() => {
      this.surveySubmissions = this.surveySubmissions?.filter(value => value.id !== submissionID)
    })
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(
      map(params => +params['id']),
      switchMap(surveyID => this.databaseService.fetchSurveyAnswersFor(surveyID)),
      take(1),
      catchError(error => {
        this.router.navigate(['/admin', 'surveys', 'list']);
        return throwError(() => new Error(error))
      })
    ).subscribe(surveySubmissions =>
      this.surveySubmissions = surveySubmissions
    )
  }
}
