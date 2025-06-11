
-- Set admin role for pranavamonline@gmail.com
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'pranavamonline@gmail.com';

-- If the profile doesn't exist yet, insert it with admin role
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin'
FROM auth.users 
WHERE email = 'pranavamonline@gmail.com'
AND NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE email = 'pranavamonline@gmail.com'
);
