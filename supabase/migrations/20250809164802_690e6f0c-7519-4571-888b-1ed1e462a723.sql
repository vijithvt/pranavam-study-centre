-- Enable RLS on subjects table since it's exposed to PostgREST
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to subjects (needed for the form)
CREATE POLICY "Anyone can view subjects" ON public.subjects
  FOR SELECT USING (true);

-- Comment: Subjects are reference data that should be publicly readable for the student registration form