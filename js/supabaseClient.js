(function () {
    const url = "https://ahstdxgglfgjfeuurkqg.supabase.co";

    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFoc3RkeGdnbGZnamZldXVya3FnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1NTY1ODIsImV4cCI6MjEwNDEzMjU4Mn0.4i7i3_w0n6VvrAXHduUMRKQPCQ6cR2SzAy7XCYtnUJY";

    if (!window.supabaseClient) {
        window.supabaseClient = window.supabase.createClient(url, key);
    }
})();