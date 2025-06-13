
-- Add missing columns to student_registrations table
ALTER TABLE student_registrations 
ADD COLUMN budget text,
ADD COLUMN tutor_gender text,
ADD COLUMN syllabus text,
ADD COLUMN urgency text,
ADD COLUMN languages text;
