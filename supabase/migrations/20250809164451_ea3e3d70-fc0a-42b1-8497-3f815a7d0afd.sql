-- Add missing columns to student_registrations table
ALTER TABLE public.student_registrations 
ADD COLUMN IF NOT EXISTS monthly_budget integer,
ADD COLUMN IF NOT EXISTS preferred_start_date date;

-- Update the budget column to be integer instead of text for consistency
-- First, let's safely convert any existing text budget values to integers
UPDATE public.student_registrations 
SET monthly_budget = CASE 
  WHEN budget ~ '^[0-9]+$' THEN budget::integer 
  ELSE NULL 
END
WHERE budget IS NOT NULL AND monthly_budget IS NULL;

-- Comment: The form now collects monthly_budget as integer and preferred_start_date
-- These fields will help match students with appropriate tutors based on budget and timing