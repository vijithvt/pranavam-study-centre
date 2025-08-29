-- Add resume_url and documents_url columns to tutor_registrations table
ALTER TABLE public.tutor_registrations 
ADD COLUMN resume_url TEXT,
ADD COLUMN documents_urls TEXT[];

-- Create storage bucket for tutor documents
INSERT INTO storage.buckets (id, name, public) VALUES ('tutor-documents', 'tutor-documents', false);

-- Create storage policies for tutor documents
CREATE POLICY "Tutors can upload their own documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'tutor-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Tutors can view their own documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'tutor-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admin can view all tutor documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'tutor-documents' AND EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
));

CREATE POLICY "Admin can delete tutor documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'tutor-documents' AND EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
));