-- Database Setup Script for CRUST & BITE
-- Run this in the Supabase SQL Editor (https://yinhlshtdknojbaqfxax.supabase.co)

-- 1. Create the orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id bigint generated always as identity primary key,
  customer_name text,
  phone text,
  item_summary text,
  items jsonb,
  subtotal int,
  packaging int default 5,
  total int,
  payment_status text default 'pending',
  order_status text default 'new',
  maps_link text,
  manual_address text,
  created_at timestamp default now()
);

-- 2. Create the products table for live catalog synchronization
CREATE TABLE IF NOT EXISTS public.products (
  id bigint primary key,
  name text not null,
  category text not null,
  description text,
  image text,
  price numeric not null,
  availability boolean default true,
  veg boolean default true,
  popular boolean default false,
  variants jsonb,
  created_at timestamp default now()
);

-- 3. Enable Supabase Realtime for orders and products tables
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table products;

-- 4. Enable Row Level Security (RLS)
alter table public.orders enable row level security;
alter table public.products enable row level security;

-- 5. Policies for Orders
create policy "Allow customer insert" on public.orders for insert with check (true);
create policy "Allow admin read orders" on public.orders for select using (true);
create policy "Allow admin update orders" on public.orders for update using (true);

-- 6. Policies for Products (Live Menu Synchronization)
create policy "Allow public read products" on public.products for select using (true);
create policy "Allow public insert products" on public.products for insert with check (true);
create policy "Allow public update products" on public.products for update using (true);
