
-- Add status column to student_registrations table
ALTER TABLE student_registrations 
ADD COLUMN status text NOT NULL DEFAULT 'new';

-- Add status column to tutor_registrations table  
ALTER TABLE tutor_registrations 
ADD COLUMN status text NOT NULL DEFAULT 'new';

-- Add comments column for admin notes on student registrations
ALTER TABLE student_registrations 
ADD COLUMN admin_comments text;

-- Add comments column for admin notes on tutor registrations
ALTER TABLE tutor_registrations 
ADD COLUMN admin_comments text;

-- Add updated_at column to track when status was last changed
ALTER TABLE student_registrations 
ADD COLUMN updated_at timestamp with time zone DEFAULT now();

ALTER TABLE tutor_registrations 
ADD COLUMN updated_at timestamp with time zone DEFAULT now();
