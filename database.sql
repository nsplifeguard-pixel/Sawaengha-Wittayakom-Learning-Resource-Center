-- ตัวอย่าง PostgreSQL/Supabase schema
create table if not exists resources (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 category_id uuid,
 location text,
 description text,
 owner text,
 opening_time time,
 closing_time time,
 status text default 'active',
 views integer default 0,
 qr_code text,
 lat numeric,
 lng numeric,
 created_at timestamptz default now()
);

create table if not exists students (
 id uuid primary key default gen_random_uuid(),
 student_code text unique not null,
 name text not null,
 grade text,
 room text,
 email text,
 phone text,
 status text default 'active',
 created_at timestamptz default now()
);

create table if not exists activities (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 date date,
 start_time time,
 end_time time,
 location text,
 teacher_id uuid,
 capacity integer default 0,
 description text,
 status text default 'open',
 created_at timestamptz default now()
);
