import {ResolveFn} from '@angular/router';
import {inject} from "@angular/core";
import {SupabaseAuthService} from "../services/supabase/supabase-auth.service";

export const sessionResolver: ResolveFn<boolean> = async (route, state) => {
  const authService = inject(SupabaseAuthService);

  const session = await authService.getSession();

  return !!session;
};
