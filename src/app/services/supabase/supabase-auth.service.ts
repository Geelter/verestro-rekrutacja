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

  private readonly SNACKBAR_DURATION = 3000;
  private readonly SNACKBAR_VERTICAL_POSITION = 'bottom';
  private readonly SNACKBAR_HORIZONTAL_POSITION = 'center';

  async getSession() {
    const data = await this.supabase.client.auth.getSession();

    return data.data.session;
  }

  async signInWithEmail(email: string, password: string) {
    const { data, error } =
      await this.supabase.client.auth.signInWithPassword({ email: email, password: password});

    if (error) {
      this.showSnackBar(error.message);
      return;
    }

    this.router.navigate(['/admin']);
  }

  async signOut() {
    const { error } = await this.supabase.client.auth.signOut();

    if (error) {
      this.showSnackBar(error.message);
      return;
    }

    this.router.navigate(['/auth']);
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.client.auth.onAuthStateChange(callback);
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, '', {
      duration: this.SNACKBAR_DURATION,
      horizontalPosition: this.SNACKBAR_HORIZONTAL_POSITION,
      verticalPosition: this.SNACKBAR_VERTICAL_POSITION
    })
  }
}
