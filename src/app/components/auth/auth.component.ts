import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatError, MatFormField} from "@angular/material/form-field";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {SupabaseAuthService} from "../../services/supabase/supabase-auth.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    MatCardHeader,
    MatCard,
    MatCardContent,
    MatError,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  private readonly authService = inject(SupabaseAuthService);

  authForm = new FormGroup({
    email: new FormControl(
      '',
      {nonNullable: true, validators: [Validators.required, Validators.email]}
    ),
    password: new FormControl(
      '',
      {nonNullable: true, validators: Validators.required}
    )
  })

  onSubmit() {
    const {email, password} = this.authForm.value;

    if (email && password) {
      this.authService.signInWithEmail(email, password);
    }
  }
}
