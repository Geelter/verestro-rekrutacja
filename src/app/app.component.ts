import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AbstractControl} from "@angular/forms";
import {DynamicFormComponent} from "./components/dynamic-form/dynamic-form.component";
import {AsyncPipe} from "@angular/common";
import {FormEditorComponent} from "./components/form-editor/form-editor.component";
import {AuthComponent} from "./components/auth/auth.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {SupabaseAuthService} from "./services/supabase/supabase-auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DynamicFormComponent, AsyncPipe, FormEditorComponent, AuthComponent, MatToolbar, MatIcon, MatIconButton, MatButton, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(SupabaseAuthService);

  title = 'verestro-rekrutacja';
  isUserAuthenticated: boolean = false;

  onFormSubmitted(value: AbstractControl) {
    console.log(value);
  }

  onSignIn() {
    this.router.navigate(['/auth']);
  }

  onSignOut() {
    this.authService.signOut();
  }

  ngOnInit() {
    this.authService.authChanges((event, session) => {
      this.isUserAuthenticated = !!session;
    });
  }
}
