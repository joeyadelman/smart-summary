create table summaries (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users(id),
  anonymous_id text,
  document_name text not null,
  content jsonb not null,
  constraint user_or_anonymous check (
    (user_id is not null and anonymous_id is null) or
    (user_id is null and anonymous_id is not null)
  )
);

-- Add indexes
create index idx_summaries_user_id on summaries(user_id);
create index idx_summaries_anonymous_id on summaries(anonymous_id);