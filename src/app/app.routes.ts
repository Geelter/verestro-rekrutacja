import {Routes} from '@angular/router';
import {unauthenticatedGuard} from "./guards/unauthenticated.guard";
import {authenticatedGuard} from "./guards/authenticated.guard";
import {sessionResolver} from "./resolvers/session.resolver";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate: [unauthenticatedGuard],
    loadComponent: () => import('./components/auth/auth.component').then(
      m => m.AuthComponent
    )
  },
  {
    path: 'surveys',
    canActivate: [unauthenticatedGuard],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        resolve: { hasSession: sessionResolver },
        loadComponent: () => import('./components/survey-list/survey-list.component').then(
          m => m.SurveyListComponent
        )
      },
      {
        path: 'fill/:id',
        loadComponent: () => import('./components/fill-survey/fill-survey.component').then(
          m => m.FillSurveyComponent
        )
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [authenticatedGuard],
    children: [
      {
        path: '',
        redirectTo: 'surveys',
        pathMatch: 'full'
      },
      {
        path: 'surveys',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'create',
            loadComponent: () => import('./components/admin/survey-create/survey-create.component').then(
              m => m.SurveyCreateComponent
            )
          },
          {
            path: 'list',
            resolve: { hasSession: sessionResolver },
            loadComponent: () => import('./components/survey-list/survey-list.component').then(
              m => m.SurveyListComponent
            )
          },
          {
            path: 'edit/:id',
            loadComponent: () => import('./components/admin/survey-edit/survey-edit.component').then(
              m => m.SurveyEditComponent
            )
          },
          {
            path: ':id/submissions',
            loadComponent: () => import('./components/admin/survey-answers/survey-answers.component').then(
              m => m.SurveyAnswersComponent
            )
          }
        ]
      }
    ]
  }
];
