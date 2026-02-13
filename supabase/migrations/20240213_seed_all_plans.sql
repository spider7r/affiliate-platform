
-- 1. Create table if not exists (Fixes 'relation does not exist' error)
create table if not exists public.plans (
  id uuid default gen_random_uuid() primary key,
  name text not null unique, -- Added unique constraint for ON CONFLICT
  price numeric not null,
  currency text default 'USD',
  interval text default 'month',
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Safe to re-run)
alter table public.plans enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where policyname = 'Plans are viewable by everyone' and tablename = 'plans') then
    create policy "Plans are viewable by everyone" on public.plans for select using ( true );
  end if;
end $$;

-- 2. Seed Plans (STARTER, GROWTH, ENTERPRISE)
-- Using ON CONFLICT to update if exists, or Insert if new.
INSERT INTO public.plans (name, price, currency, interval)
VALUES 
  ('STARTER', 29.00, 'USD', 'month'),
  ('GROWTH', 49.00, 'USD', 'month'),
  ('ENTERPRISE', 99.00, 'USD', 'month')
ON CONFLICT (name) DO UPDATE 
SET price = EXCLUDED.price, 
    currency = EXCLUDED.currency, 
    interval = EXCLUDED.interval;

-- Optional: Delete old plans if you want strict cleanup (Careful if linked to users!)
-- DELETE FROM public.plans WHERE name NOT IN ('STARTER', 'GROWTH', 'ENTERPRISE');
