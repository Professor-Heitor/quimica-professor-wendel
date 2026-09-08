if (!window.supabase) {
    const SUPABASE_URL = "https://ahstdxgglfgjfeuurkqg.supabase.co";
    const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoc3RkeGdnbGZnamZldXVya3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1NTY1ODIsImV4cCI6MjEwNDEzMjU4Mn0.4i7i3_w0n6VvrAXHduUMRKQPCQ6cR2SzAy7XCYtnUJY";

    window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}