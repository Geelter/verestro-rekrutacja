import {inject, Injectable} from '@angular/core';
import {SupabaseClientService} from "./supabase-client.service";
import {from, of, retry, switchMap, throwError} from "rxjs";
import {Tables} from "../../models/supabase";
import {JsonSurveyData} from "../../models/json-form-data.interface";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SupabaseDatabaseService {
  private readonly supabase = inject(SupabaseClientService);
  private readonly snackBar = inject(MatSnackBar);

  private readonly SNACKBAR_DURATION = 3000;
  private readonly SNACKBAR_VERTICAL_POSITION = 'bottom';
  private readonly SNACKBAR_HORIZONTAL_POSITION = 'center';

  fetchAllSurveys() {
    return from(
      this.supabase.client
        .from('surveys')
        .select()
        .returns<Tables<'surveys'>[]>()
    ).pipe(
      switchMap((result) => {
        if (result.error) {
          this.showSnackBar(result.error.message);
          return throwError(() => new Error(result.error.message));
        }
        const fetchedSurveys = result.data.map(
          (value) => {
            return {
              id: value.id,
              title: value.title
            }
          }
        );
        return of(fetchedSurveys);
      }),
      retry({ count: 2, delay: 1000 })
    );
  }

  fetchSurveyForID(id: number) {
    return from(
      this.supabase.client
        .from('surveys')
        .select()
        .eq('id', id)
        .returns<Tables<'surveys'>[]>()
    ).pipe(
      switchMap((result) => {
        if (result.error) {
          this.showSnackBar(result.error.message);
          return throwError(() => new Error(result.error.message));
        } else if (!result.data[0]) {
          const errorMessage = 'No survey for specified ID';
          this.showSnackBar(errorMessage);
          return throwError(() => new Error(errorMessage));
        }
        const fetchedSurvey = {
          id: result.data[0].id,
          title: result.data[0].title,
          jsonSurveyData: result.data[0].survey_configuration!.valueOf() as JsonSurveyData
        }
        return of(fetchedSurvey);
      }),
      retry({ count: 2, delay: 1000 })
    )
  }

  submitSurveyAnswers(surveyID: number, surveyAnswers: {question: string, answer: unknown}[]) {
    return from(
      this.supabase.client
        .from('submittedSurveys')
        .insert({survey_id: surveyID, answers: surveyAnswers})
    ).pipe(
      switchMap((result) => {
        if (result.error) {
          this.showSnackBar(result.error.message);
          return throwError(() => new Error(result.error.message));
        }
        return of(null);
      })
    )
  }

  createSurvey(surveyData: JsonSurveyData) {
    return from(
      this.supabase.client
        .from('surveys')
        .insert({ title: surveyData.title, survey_configuration: surveyData })
    ).pipe(
      switchMap((result) => {
        if (result.error) {
          this.showSnackBar(result.error.message);
          return throwError(() => new Error(result.error.message));
        }
        return of(null);
      }),
      retry({ count: 2, delay: 1000 }),
    );
  }

  updateSurvey(surveyID: number, surveyData: JsonSurveyData) {
    return from(
      this.supabase.client
        .from('surveys')
        .update({ title: surveyData.title, survey_configuration: surveyData })
        .eq('id', surveyID)
    ).pipe(
      switchMap((result) => {
        if (result.error) {
          this.showSnackBar(result.error.message);
          return throwError(() => new Error(result.error.message));
        }
        return of(null);
      }),
      retry({ count: 2, delay: 1000 })
    );
  }

  deleteSurvey(surveyID: number) {
    return from(
      this.supabase.client
        .from('surveys')
        .delete()
        .eq('id', surveyID)
    ).pipe(
      switchMap((result) => {
        if (result.error) {
          this.showSnackBar(result.error.message);
          return throwError(() => new Error(result.error.message));
        }
        return of(null);
      }),
      retry({ count: 2, delay: 1000 })
    )
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: this.SNACKBAR_DURATION,
      horizontalPosition: this.SNACKBAR_HORIZONTAL_POSITION,
      verticalPosition: this.SNACKBAR_VERTICAL_POSITION
    });
  }
}
