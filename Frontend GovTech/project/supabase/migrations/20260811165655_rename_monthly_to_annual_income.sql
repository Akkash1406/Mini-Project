/*
# Rename monthly_income to annual_income in user_profiles

1. Changes
- Renamed column `monthly_income` to `annual_income` to reflect annual income collection.
- Column type remains text (user enters annual income in rupees).

2. Security
- No RLS policy changes. Existing policies remain intact.

3. Notes
- Uses a DO block to check if the old column exists before renaming, making it idempotent.
- No data loss: existing values are preserved under the new column name.
*/

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'monthly_income'
  ) THEN
    ALTER TABLE user_profiles RENAME COLUMN monthly_income TO annual_income;
  END IF;
END $$;
