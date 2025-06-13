
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admin can view all student registrations" ON public.student_registrations;
DROP POLICY IF EXISTS "Anyone can insert student registrations" ON public.student_registrations;

-- Create new policies that allow public insertion but admin-only viewing
CREATE POLICY "Anyone can insert student registrations" 
  ON public.student_registrations 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Admin can view all student registrations" 
  ON public.student_registrations 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admin can update student registrations" 
  ON public.student_registrations 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );
