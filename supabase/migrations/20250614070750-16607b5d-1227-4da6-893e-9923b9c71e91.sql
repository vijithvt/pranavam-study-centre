
-- STUDENT REGISTRATIONS TABLE

-- Add university, branch, and custom_subjects for higher education
ALTER TABLE public.student_registrations
  ADD COLUMN IF NOT EXISTS university text,
  ADD COLUMN IF NOT EXISTS branch text,
  ADD COLUMN IF NOT EXISTS custom_subjects text;

-- TUTOR REGISTRATIONS TABLE

-- Add whatsapp (and make phone not nullable if relevant)
ALTER TABLE public.tutor_registrations
  ADD COLUMN IF NOT EXISTS whatsapp text;

-- Add specialization after qualification
ALTER TABLE public.tutor_registrations
  ADD COLUMN IF NOT EXISTS specialization text;
