create extension if not exists pgcrypto with schema extensions;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique check (username ~ '^[a-z0-9][a-z0-9_-]{2,29}$'),
  display_name text not null,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.interests (
  id uuid primary key default extensions.gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  slug text not null,
  color text,
  created_at timestamptz not null default now(),
  unique (owner_id, slug)
);

create table public.experiences (
  id uuid primary key default extensions.gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  slug text not null,
  summary text,
  status text not null default 'idea' check (status in ('idea', 'doing', 'done', 'paused')),
  started_on date,
  ended_on date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, slug),
  check (ended_on is null or started_on is null or ended_on >= started_on)
);

create table public.experience_interests (
  owner_id uuid not null references public.profiles (id) on delete cascade,
  experience_id uuid not null references public.experiences (id) on delete cascade,
  interest_id uuid not null references public.interests (id) on delete cascade,
  primary key (experience_id, interest_id)
);

create table public.experience_blocks (
  id uuid primary key default extensions.gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  experience_id uuid not null references public.experiences (id) on delete cascade,
  block_type text not null check (block_type in ('text', 'image', 'gallery', 'file', 'link', 'code', 'reflection')),
  content jsonb not null default '{}'::jsonb,
  position integer not null check (position >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (experience_id, position)
);

create table public.presets (
  id uuid primary key default extensions.gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, slug)
);

create table public.preset_experiences (
  owner_id uuid not null references public.profiles (id) on delete cascade,
  preset_id uuid not null references public.presets (id) on delete cascade,
  experience_id uuid not null references public.experiences (id) on delete cascade,
  position integer not null check (position >= 0),
  custom_title text,
  custom_summary text,
  is_featured boolean not null default false,
  primary key (preset_id, experience_id),
  unique (preset_id, position)
);

create index experiences_owner_status_idx on public.experiences (owner_id, status);
create index experience_blocks_experience_position_idx on public.experience_blocks (experience_id, position);
create index presets_owner_published_idx on public.presets (owner_id, is_published);

alter table public.profiles enable row level security;
alter table public.interests enable row level security;
alter table public.experiences enable row level security;
alter table public.experience_interests enable row level security;
alter table public.experience_blocks enable row level security;
alter table public.presets enable row level security;
alter table public.preset_experiences enable row level security;

create policy "owners manage their profile"
on public.profiles for all to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "owners manage their interests"
on public.interests for all to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "owners manage their experiences"
on public.experiences for all to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "owners manage their experience interests"
on public.experience_interests for all to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "owners manage their experience blocks"
on public.experience_blocks for all to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "owners manage their presets"
on public.presets for all to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

create policy "owners manage their preset experiences"
on public.preset_experiences for all to authenticated
using ((select auth.uid()) = owner_id)
with check ((select auth.uid()) = owner_id);

comment on schema public is 'Weave:ive application data. Public sharing policies are intentionally deferred until preset visibility rules are finalized.';
