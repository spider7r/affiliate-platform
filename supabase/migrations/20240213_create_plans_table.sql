
-- Create plans table
create table if not exists public.plans (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price numeric not null,
  currency text default 'USD',
  interval text default 'month',
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS
alter table public.plans enable row level security;

create policy "Plans are viewable by everyone"
  on public.plans for select
  using ( true );

-- Seed default data
insert into public.plans (name, price, currency)
select 'Pro Plan', 49.00, 'USD'
where not exists (
    select 1 from public.plans where name = 'Pro Plan'
);
