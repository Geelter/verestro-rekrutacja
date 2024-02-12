import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {Database} from "../../models/supabase";

const options = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
};

const supabaseUrl = 'https://crjaywdqkcpvqooaxgbq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyamF5d2Rxa2NwdnFvb2F4Z2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MjUzODQsImV4cCI6MjAyMzEwMTM4NH0.1B9tuzp1HsMiCbWAeXMvMsGxnPV1_syc2lm38YFG8oo';

@Injectable({
  providedIn: 'root'
})
export class SupabaseClientService {
  readonly client: SupabaseClient;

  constructor() {
    this.client = createClient<Database>(
      supabaseUrl,
      supabaseKey,
      options
    );
  }
}
