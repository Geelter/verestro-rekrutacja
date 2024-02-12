import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {SupabaseClientService} from "./supabase-client.service";
import {AuthChangeEvent, Session} from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root'
})
export class SupabaseAuthService {
  private readonly supabase = inject(SupabaseClientService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);

  async getSession() {
    const data = await this.supabase.client.auth.getSession();

    return data.data.session;
  }

  async signInWithEmail(email: string, password: string) {
    const { data, error } =
      await this.supabase.client.auth.signInWithPassword({ email: email, password: password});

    if (error) {
      this.snackBar.open(error.message, '', {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      });
      return;
    }

    // this.router.navigate(['/browser']);
  }

  async signOut() {
    const { error } = await this.supabase.client.auth.signOut();

    if (error) {
      this.snackBar.open(error.message, '', {
        duration: 3000,
        horizontalPosition: "end",
        verticalPosition: "top"
      });
      return;
    }

    // this.router.navigate(['/auth', 'signin']);
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.client.auth.onAuthStateChange(callback);
  }
}
