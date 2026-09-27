/*
# Create user_profiles table

1. New Tables
- `user_profiles`
  - `id` (uuid, primary key, references auth.users)
  - `email` (text, the user's email from auth)
  - `full_name` (text, user's full name)
  - `age` (integer, user's age)
  - `gender` (text, Male/Female/Other)
  - `state` (text, Indian state)
  - `district` (text, district within state)
  - `occupation` (text, current occupation)
  - `monthly_income` (text, monthly income in rupees as entered)
  - `education` (text, highest education level)
  - `category` (text, General/OBC/SC/ST/EWS)
  - `requirement` (text, what help the user is looking for)
  - `created_at` (timestamp, when profile was first created)
  - `updated_at` (timestamp, when profile was last updated)

2. Security
- Enable RLS on `user_profiles`.
- Owner-scoped CRUD: each authenticated user can only read, insert, update, and delete their own profile row.
- The `id` column defaults to `auth.uid()` so inserts that omit it still satisfy the WITH CHECK policy.

3. Notes
- This is a multi-user app with sign-in. Policies are scoped to `authenticated` with `auth.uid() = id` ownership checks.
- One profile row per user (id = auth user id, no separate unique constraint needed since it's the PK).
*/

CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL DEFAULT '',
  age integer,
  gender text,
  state text,
  district text,
  occupation text,
  monthly_income text,
  education text,
  category text,
  requirement text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON user_profiles;
CREATE POLICY "select_own_profile"
ON user_profiles FOR SELECT
TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON user_profiles;
CREATE POLICY "insert_own_profile"
ON user_profiles FOR INSERT
TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON user_profiles;
CREATE POLICY "update_own_profile"
ON user_profiles FOR UPDATE
TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "delete_own_profile" ON user_profiles;
CREATE POLICY "delete_own_profile"
ON user_profiles FOR DELETE
TO authenticated USING (auth.uid() = id);
