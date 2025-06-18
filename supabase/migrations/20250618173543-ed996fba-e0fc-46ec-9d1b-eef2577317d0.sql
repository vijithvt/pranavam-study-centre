
-- Add specialization column to student_registrations table
ALTER TABLE public.student_registrations 
ADD COLUMN specialization text;

-- Add comment to explain the field
COMMENT ON COLUMN public.student_registrations.specialization IS 'Stores the specific specialization chosen for entrance exams or arts/music categories';
