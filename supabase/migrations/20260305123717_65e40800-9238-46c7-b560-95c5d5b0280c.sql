
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('student', 'tutor', 'admin');

-- Users table (profiles linked to auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'student',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Students table
CREATE TABLE public.students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tutors table
CREATE TABLE public.tutors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  subjects TEXT[] DEFAULT '{}',
  experience TEXT,
  bio TEXT,
  location TEXT,
  verification_status TEXT NOT NULL DEFAULT 'pending',
  rating NUMERIC(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enquiries table
CREATE TABLE public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  subject TEXT NOT NULL,
  level TEXT,
  mode TEXT NOT NULL DEFAULT 'online',
  location TEXT,
  schedule TEXT,
  quoted_fee NUMERIC(10,2) NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tutor proposals table
CREATE TABLE public.tutor_proposals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL,
  message TEXT,
  proposed_fee NUMERIC(10,2) NOT NULL,
  availability TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Assigned classes table
CREATE TABLE public.assigned_classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID REFERENCES public.enquiries(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  final_tutor_fee NUMERIC(10,2) NOT NULL,
  platform_percent NUMERIC(5,2) NOT NULL DEFAULT 25,
  platform_fee NUMERIC(10,2) NOT NULL,
  total_payment NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_payment',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES public.assigned_classes(id) ON DELETE CASCADE NOT NULL,
  payment_id TEXT,
  amount NUMERIC(10,2) NOT NULL,
  tutor_amount NUMERIC(10,2) NOT NULL,
  platform_fee NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Payouts table
CREATE TABLE public.payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL,
  class_id UUID REFERENCES public.assigned_classes(id) ON DELETE CASCADE NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  tutor_id UUID REFERENCES public.tutors(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutor_proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assigned_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(_auth_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.users WHERE auth_id = _auth_id LIMIT 1
$$;

-- Security definer function to check role
CREATE OR REPLACE FUNCTION public.has_role(_auth_id UUID, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.users WHERE auth_id = _auth_id AND role = _role
  )
$$;

-- Security definer to get user id from auth id
CREATE OR REPLACE FUNCTION public.get_user_id(_auth_id UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.users WHERE auth_id = _auth_id LIMIT 1
$$;

-- RLS Policies for users
CREATE POLICY "Users can read own profile" ON public.users FOR SELECT USING (auth_id = auth.uid());
CREATE POLICY "Admins can read all users" ON public.users FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth_id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth_id = auth.uid());

-- RLS Policies for students
CREATE POLICY "Students can read own data" ON public.students FOR SELECT USING (user_id = public.get_user_id(auth.uid()));
CREATE POLICY "Admins can read all students" ON public.students FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Students can insert own data" ON public.students FOR INSERT WITH CHECK (user_id = public.get_user_id(auth.uid()));
CREATE POLICY "Students can update own data" ON public.students FOR UPDATE USING (user_id = public.get_user_id(auth.uid()));

-- RLS Policies for tutors
CREATE POLICY "Tutors can read own data" ON public.tutors FOR SELECT USING (user_id = public.get_user_id(auth.uid()));
CREATE POLICY "Admins can read all tutors" ON public.tutors FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Anyone authenticated can read verified tutors" ON public.tutors FOR SELECT USING (verification_status = 'verified');
CREATE POLICY "Tutors can insert own data" ON public.tutors FOR INSERT WITH CHECK (user_id = public.get_user_id(auth.uid()));
CREATE POLICY "Tutors can update own data" ON public.tutors FOR UPDATE USING (user_id = public.get_user_id(auth.uid()));
CREATE POLICY "Admins can update tutors" ON public.tutors FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for enquiries
CREATE POLICY "Students can read own enquiries" ON public.enquiries FOR SELECT USING (student_id IN (SELECT id FROM public.students WHERE user_id = public.get_user_id(auth.uid())));
CREATE POLICY "Verified tutors can read open enquiries" ON public.enquiries FOR SELECT USING (status = 'open' AND public.has_role(auth.uid(), 'tutor'));
CREATE POLICY "Admins can read all enquiries" ON public.enquiries FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Students can create enquiries" ON public.enquiries FOR INSERT WITH CHECK (student_id IN (SELECT id FROM public.students WHERE user_id = public.get_user_id(auth.uid())));
CREATE POLICY "Students can update own enquiries" ON public.enquiries FOR UPDATE USING (student_id IN (SELECT id FROM public.students WHERE user_id = public.get_user_id(auth.uid())));
CREATE POLICY "Admins can update enquiries" ON public.enquiries FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for tutor_proposals
CREATE POLICY "Tutors can read own proposals" ON public.tutor_proposals FOR SELECT USING (tutor_id IN (SELECT id FROM public.tutors WHERE user_id = public.get_user_id(auth.uid())));
CREATE POLICY "Students can read proposals for their enquiries" ON public.tutor_proposals FOR SELECT USING (enquiry_id IN (SELECT id FROM public.enquiries WHERE student_id IN (SELECT id FROM public.students WHERE user_id = public.get_user_id(auth.uid()))));
CREATE POLICY "Admins can read all proposals" ON public.tutor_proposals FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Tutors can create proposals" ON public.tutor_proposals FOR INSERT WITH CHECK (tutor_id IN (SELECT id FROM public.tutors WHERE user_id = public.get_user_id(auth.uid())));
CREATE POLICY "Tutors can update own proposals" ON public.tutor_proposals FOR UPDATE USING (tutor_id IN (SELECT id FROM public.tutors WHERE user_id = public.get_user_id(auth.uid())));
CREATE POLICY "Admins can update proposals" ON public.tutor_proposals FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for assigned_classes
CREATE POLICY "Students can read own classes" ON public.assigned_classes FOR SELECT USING (student_id IN (SELECT id FROM public.students WHERE user_id = public.get_user_id(auth.uid())));
CREATE POLICY "Tutors can read assigned classes" ON public.assigned_classes FOR SELECT USING (tutor_id IN (SELECT id FROM public.tutors WHERE user_id = public.get_user_id(auth.uid())));
CREATE POLICY "Admins can manage classes" ON public.assigned_classes FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for payments
CREATE POLICY "Students can read own payments" ON public.payments FOR SELECT USING (class_id IN (SELECT id FROM public.assigned_classes WHERE student_id IN (SELECT id FROM public.students WHERE user_id = public.get_user_id(auth.uid()))));
CREATE POLICY "Admins can manage payments" ON public.payments FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Students can insert payments" ON public.payments FOR INSERT WITH CHECK (class_id IN (SELECT id FROM public.assigned_classes WHERE student_id IN (SELECT id FROM public.students WHERE user_id = public.get_user_id(auth.uid()))));

-- RLS Policies for payouts
CREATE POLICY "Tutors can read own payouts" ON public.payouts FOR SELECT USING (tutor_id IN (SELECT id FROM public.tutors WHERE user_id = public.get_user_id(auth.uid())));
CREATE POLICY "Admins can manage payouts" ON public.payouts FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for reviews
CREATE POLICY "Anyone can read reviews" ON public.reviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "Students can create reviews" ON public.reviews FOR INSERT WITH CHECK (student_id IN (SELECT id FROM public.students WHERE user_id = public.get_user_id(auth.uid())));
CREATE POLICY "Admins can manage reviews" ON public.reviews FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (auth_id, email, role)
  VALUES (NEW.id, NEW.email, COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'student'));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
