-- Table to log every scheme search / recommendation request
create table if not exists search_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  occupation text,
  annual_income text,
  education text,
  category text,
  age text,
  gender text,
  requirement text,
  recommended_schemes jsonb,   -- array of {id, name, matchScore}
  created_at timestamptz default now()
);

-- Enable row-level security
alter table search_history enable row level security;

-- Users can insert their own search history
create policy "Users can insert their own search history"
  on search_history for insert
  with check (auth.uid() = user_id);

-- Users can view their own search history (optional, e.g. for a "my history" page later)
create policy "Users can view their own search history"
  on search_history for select
  using (auth.uid() = user_id);

-- Note: the admin backend uses the SERVICE ROLE key, which bypasses RLS entirely,
-- so it can read all rows across all users regardless of these policies.
