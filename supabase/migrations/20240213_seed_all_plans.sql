
-- Seed multiple plans into the plans table
-- This uses ON CONFLICT pattern to avoid duplicates or updates existing ones

-- We only want Starter, Pro, and Premium (Monthly)

do $$
begin
    if not exists (select 1 from public.plans where name = 'Starter') then
        insert into public.plans (name, price, currency, interval) values ('Starter', 29.00, 'USD', 'month');
    end if;

    if not exists (select 1 from public.plans where name = 'Pro') then
        insert into public.plans (name, price, currency, interval) values ('Pro', 49.00, 'USD', 'month');
    end if;

    if not exists (select 1 from public.plans where name = 'Premium') then
        insert into public.plans (name, price, currency, interval) values ('Premium', 99.00, 'USD', 'month');
    end if;
end $$;
