

# Phase 1: Authentication System — Implementation Plan

## Current State
- Legacy auth pages exist (`Auth.tsx` for admin, `TutorAuth.tsx` for tutors) but reference old tables (`profiles`, `tutor_registrations`) that no longer exist
- New marketplace schema is in place: `users`, `students`, `tutors`, `enquiries`, `tutor_proposals`, `assigned_classes`, `payments`, `payouts`, `reviews`
- `handle_new_user` trigger auto-creates a `users` row on signup with role from `raw_user_meta_data`
- Helper functions exist: `get_user_role`, `has_role`, `get_user_id`
- No student auth page exists; no role-based routing

## What Phase 1 Will Build

### 1. Auth Pages (3 separate login flows)
- **Student Login** (`/student-login`): Email OTP via `supabase.auth.signInWithOtp()`, passes `role: 'student'` in metadata
- **Tutor Login** (`/tutor-login`): Google OAuth via `supabase.auth.signInWithOAuth({ provider: 'google' })`, passes `role: 'tutor'` in metadata
- **Admin Login** (`/admin-login`): Email + password via `supabase.auth.signInWithPassword()` (reuse existing `Auth.tsx` with role check)

### 2. Auth Context & Protected Routes
- Create `src/contexts/AuthContext.tsx` — provides `user`, `role`, `loading`, `signOut`
- Create `src/components/ProtectedRoute.tsx` — checks auth + role, redirects unauthorized users
- Wrap app in `AuthProvider`

### 3. Role-Based Routing
- After login, query `users` table for role, redirect to:
  - `student` → `/student-dashboard`
  - `tutor` → `/tutor-dashboard`  
  - `admin` → `/admin-dashboard`
- Create placeholder dashboard pages for student and tutor

### 4. Profile Completion Flow
- After first student OTP login → redirect to profile completion (name, phone, location) → insert into `students` table
- After first tutor Google login → redirect to profile completion (name, subjects, experience, bio, location) → insert into `tutors` table

### 5. Navigation Updates
- Add Login dropdown/links to Navigation component
- Show role-appropriate dashboard link when logged in
- Add sign-out button

### 6. Database Migration
- Add `PERMISSIVE` select policies on `users` table (current policies are all `RESTRICTIVE` which means no policy allows access — need at least one permissive policy or fix the existing ones)

### 7. Google OAuth Prerequisite
- User must configure Google OAuth provider in Supabase dashboard (Authentication → Providers → Google)
- Provide instructions for Google Cloud Console setup

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/contexts/AuthContext.tsx` | Create |
| `src/components/ProtectedRoute.tsx` | Create |
| `src/pages/StudentLogin.tsx` | Create |
| `src/pages/TutorLogin.tsx` | Create |
| `src/pages/StudentDashboard.tsx` | Create (placeholder) |
| `src/pages/StudentOnboarding.tsx` | Create |
| `src/pages/TutorOnboarding.tsx` | Create |
| `src/pages/Auth.tsx` | Update (add admin role check) |
| `src/pages/TutorDashboard.tsx` | Rewrite (use new schema) |
| `src/pages/AdminDashboard.tsx` | Update (use new schema) |
| `src/components/Navigation.tsx` | Update (add login links) |
| `src/App.tsx` | Update (add AuthProvider, new routes, ProtectedRoute) |
| `src/main.tsx` | No change |
| Migration SQL | Fix RLS policies from RESTRICTIVE to PERMISSIVE |

## Cursor AI Prompt (delivered after implementation)
After building Phase 1, I will provide a detailed Cursor prompt covering:
- What was implemented (auth system, contexts, routes)
- Remaining phases: Student dashboard + enquiry form, Tutor dashboard + proposals, Admin dashboard rebuild, Razorpay integration, Payout system

