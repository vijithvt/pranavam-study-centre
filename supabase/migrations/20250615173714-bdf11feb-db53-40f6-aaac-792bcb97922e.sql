
-- Create the subjects table first
CREATE TABLE public.subjects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL
);

-- School Subjects
INSERT INTO public.subjects (name, category) VALUES
  ('Mathematics', 'school'),
  ('Science', 'school'),
  ('Physics', 'school'),
  ('Chemistry', 'school'),
  ('Biology', 'school'),
  ('Computer Science', 'school'),
  ('Information Technology', 'school'),
  ('English', 'school'),
  ('Hindi', 'school'),
  ('Malayalam', 'school'),
  ('Sanskrit', 'school'),
  ('French', 'school'),
  ('Arabic', 'school'),
  ('German', 'school'),
  ('Spanish', 'school'),
  ('Social Science', 'school'),
  ('History', 'school'),
  ('Geography', 'school'),
  ('Political Science', 'school'),
  ('Economics', 'school'),
  ('Accountancy', 'school'),
  ('Business Studies', 'school'),
  ('Commerce', 'school'),
  ('Psychology', 'school'),
  ('Sociology', 'school'),
  ('Philosophy', 'school'),
  ('Physical Education', 'school'),
  ('Environmental Science', 'school'),
  ('Artificial Intelligence', 'school'),
  ('Statistics', 'school'),
  ('Electronics', 'school'),
  ('Home Science', 'school');

-- Professional Courses
INSERT INTO public.subjects (name, category) VALUES
  ('B.Tech', 'professional'),
  ('B.Sc', 'professional'),
  ('B.A', 'professional'),
  ('B.Com', 'professional'),
  ('LLB', 'professional'),
  ('M.Tech', 'professional'),
  ('M.Sc', 'professional'),
  ('M.A', 'professional'),
  ('M.Com', 'professional');

-- Entrance Exam Preparation
INSERT INTO public.subjects (name, category) VALUES
  ('NEET', 'entrance'),
  ('JEE', 'entrance'),
  ('UPSC', 'entrance'),
  ('PSC', 'entrance'),
  ('Banking', 'entrance'),
  ('SSC', 'entrance'),
  ('Railway', 'entrance'),
  ('CAT', 'entrance'),
  ('CLAT', 'entrance'),
  ('GATE', 'entrance'),
  ('KVPY', 'entrance'),
  ('GRE', 'entrance'),
  ('GMAT', 'entrance'),
  ('SAT', 'entrance'),
  ('IELTS', 'entrance'),
  ('TOEFL', 'entrance');

-- Arts & Music
INSERT INTO public.subjects (name, category) VALUES
  ('Fine Arts', 'arts'),
  ('Drawing & Painting', 'arts'),
  ('Music', 'arts'),
  ('Dance', 'arts'),
  ('Violin (Classical)', 'arts'),
  ('Guitar', 'arts'),
  ('Piano', 'arts'),
  ('Tabla', 'arts'),
  ('Mridangam', 'arts'),
  ('Vocal (Classical)', 'arts');
