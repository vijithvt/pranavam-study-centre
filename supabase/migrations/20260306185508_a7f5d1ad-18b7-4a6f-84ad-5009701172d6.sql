
-- Fix RLS policies: Drop RESTRICTIVE policies and recreate as PERMISSIVE

-- USERS table
DROP POLICY IF EXISTS "Users can read own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can read all users" ON public.users;

CREATE POLICY "Users can read own profile" ON public.users FOR SELECT TO authenticated USING (auth_id = auth.uid());
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT TO authenticated WITH CHECK (auth_id = auth.uid());
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE TO authenticated USING (auth_id = auth.uid());
CREATE POLICY "Admins can read all users" ON public.users FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- STUDENTS table
DROP POLICY IF EXISTS "Students can read own data" ON public.students;
DROP POLICY IF EXISTS "Students can insert own data" ON public.students;
DROP POLICY IF EXISTS "Students can update own data" ON public.students;
DROP POLICY IF EXISTS "Admins can read all students" ON public.students;

CREATE POLICY "Students can read own data" ON public.students FOR SELECT TO authenticated USING (user_id = get_user_id(auth.uid()));
CREATE POLICY "Students can insert own data" ON public.students FOR INSERT TO authenticated WITH CHECK (user_id = get_user_id(auth.uid()));
CREATE POLICY "Students can update own data" ON public.students FOR UPDATE TO authenticated USING (user_id = get_user_id(auth.uid()));
CREATE POLICY "Admins can read all students" ON public.students FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- TUTORS table
DROP POLICY IF EXISTS "Tutors can read own data" ON public.tutors;
DROP POLICY IF EXISTS "Tutors can insert own data" ON public.tutors;
DROP POLICY IF EXISTS "Tutors can update own data" ON public.tutors;
DROP POLICY IF EXISTS "Admins can read all tutors" ON public.tutors;
DROP POLICY IF EXISTS "Admins can update tutors" ON public.tutors;
DROP POLICY IF EXISTS "Anyone authenticated can read verified tutors" ON public.tutors;

CREATE POLICY "Tutors can read own data" ON public.tutors FOR SELECT TO authenticated USING (user_id = get_user_id(auth.uid()));
CREATE POLICY "Tutors can insert own data" ON public.tutors FOR INSERT TO authenticated WITH CHECK (user_id = get_user_id(auth.uid()));
CREATE POLICY "Tutors can update own data" ON public.tutors FOR UPDATE TO authenticated USING (user_id = get_user_id(auth.uid()));
CREATE POLICY "Admins can read all tutors" ON public.tutors FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update tutors" ON public.tutors FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone authenticated can read verified tutors" ON public.tutors FOR SELECT TO authenticated USING (verification_status = 'verified'::text);

-- ENQUIRIES table
DROP POLICY IF EXISTS "Students can create enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Students can read own enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Students can update own enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Admins can read all enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Admins can update enquiries" ON public.enquiries;
DROP POLICY IF EXISTS "Verified tutors can read open enquiries" ON public.enquiries;

CREATE POLICY "Students can create enquiries" ON public.enquiries FOR INSERT TO authenticated WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = get_user_id(auth.uid())));
CREATE POLICY "Students can read own enquiries" ON public.enquiries FOR SELECT TO authenticated USING (student_id IN (SELECT id FROM students WHERE user_id = get_user_id(auth.uid())));
CREATE POLICY "Students can update own enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (student_id IN (SELECT id FROM students WHERE user_id = get_user_id(auth.uid())));
CREATE POLICY "Admins can read all enquiries" ON public.enquiries FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update enquiries" ON public.enquiries FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Verified tutors can read open enquiries" ON public.enquiries FOR SELECT TO authenticated USING (status = 'open'::text AND has_role(auth.uid(), 'tutor'::app_role));

-- TUTOR_PROPOSALS table
DROP POLICY IF EXISTS "Tutors can create proposals" ON public.tutor_proposals;
DROP POLICY IF EXISTS "Tutors can read own proposals" ON public.tutor_proposals;
DROP POLICY IF EXISTS "Tutors can update own proposals" ON public.tutor_proposals;
DROP POLICY IF EXISTS "Admins can read all proposals" ON public.tutor_proposals;
DROP POLICY IF EXISTS "Admins can update proposals" ON public.tutor_proposals;
DROP POLICY IF EXISTS "Students can read proposals for their enquiries" ON public.tutor_proposals;

CREATE POLICY "Tutors can create proposals" ON public.tutor_proposals FOR INSERT TO authenticated WITH CHECK (tutor_id IN (SELECT id FROM tutors WHERE user_id = get_user_id(auth.uid())));
CREATE POLICY "Tutors can read own proposals" ON public.tutor_proposals FOR SELECT TO authenticated USING (tutor_id IN (SELECT id FROM tutors WHERE user_id = get_user_id(auth.uid())));
CREATE POLICY "Tutors can update own proposals" ON public.tutor_proposals FOR UPDATE TO authenticated USING (tutor_id IN (SELECT id FROM tutors WHERE user_id = get_user_id(auth.uid())));
CREATE POLICY "Admins can read all proposals" ON public.tutor_proposals FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update proposals" ON public.tutor_proposals FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Students can read proposals for their enquiries" ON public.tutor_proposals FOR SELECT TO authenticated USING (enquiry_id IN (SELECT id FROM enquiries WHERE student_id IN (SELECT id FROM students WHERE user_id = get_user_id(auth.uid()))));

-- ASSIGNED_CLASSES table
DROP POLICY IF EXISTS "Admins can manage classes" ON public.assigned_classes;
DROP POLICY IF EXISTS "Students can read own classes" ON public.assigned_classes;
DROP POLICY IF EXISTS "Tutors can read assigned classes" ON public.assigned_classes;

CREATE POLICY "Admins can manage classes" ON public.assigned_classes FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Students can read own classes" ON public.assigned_classes FOR SELECT TO authenticated USING (student_id IN (SELECT id FROM students WHERE user_id = get_user_id(auth.uid())));
CREATE POLICY "Tutors can read assigned classes" ON public.assigned_classes FOR SELECT TO authenticated USING (tutor_id IN (SELECT id FROM tutors WHERE user_id = get_user_id(auth.uid())));

-- PAYMENTS table
DROP POLICY IF EXISTS "Admins can manage payments" ON public.payments;
DROP POLICY IF EXISTS "Students can insert payments" ON public.payments;
DROP POLICY IF EXISTS "Students can read own payments" ON public.payments;

CREATE POLICY "Admins can manage payments" ON public.payments FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Students can insert payments" ON public.payments FOR INSERT TO authenticated WITH CHECK (class_id IN (SELECT id FROM assigned_classes WHERE student_id IN (SELECT id FROM students WHERE user_id = get_user_id(auth.uid()))));
CREATE POLICY "Students can read own payments" ON public.payments FOR SELECT TO authenticated USING (class_id IN (SELECT id FROM assigned_classes WHERE student_id IN (SELECT id FROM students WHERE user_id = get_user_id(auth.uid()))));

-- PAYOUTS table
DROP POLICY IF EXISTS "Admins can manage payouts" ON public.payouts;
DROP POLICY IF EXISTS "Tutors can read own payouts" ON public.payouts;

CREATE POLICY "Admins can manage payouts" ON public.payouts FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Tutors can read own payouts" ON public.payouts FOR SELECT TO authenticated USING (tutor_id IN (SELECT id FROM tutors WHERE user_id = get_user_id(auth.uid())));

-- REVIEWS table
DROP POLICY IF EXISTS "Admins can manage reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can read reviews" ON public.reviews;
DROP POLICY IF EXISTS "Students can create reviews" ON public.reviews;

CREATE POLICY "Admins can manage reviews" ON public.reviews FOR ALL TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Anyone can read reviews" ON public.reviews FOR SELECT TO authenticated USING (true);
CREATE POLICY "Students can create reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (student_id IN (SELECT id FROM students WHERE user_id = get_user_id(auth.uid())));

-- Also ensure the handle_new_user trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
