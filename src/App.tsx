import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"

import Index from "./pages/Index"
import About from "./pages/About"
import Contact from "./pages/Contact"
import TutorRegistration from "./pages/TutorRegistration"
import StudentRegistration from "./pages/StudentRegistration"
import AdminDashboard from "./pages/AdminDashboard"
import TutorTerms from "./pages/TutorTerms"
import TutorAcceptTerms from "./pages/TutorAcceptTerms"
import Auth from "./pages/Auth"
import TutorAuth from "./pages/TutorAuth"
import TutorDetailsPage from "./pages/TutorDetailsPage"
import StudentDetailsPage from "./pages/StudentDetailsPage"
import StudentLogin from "./pages/StudentLogin"
import TutorLogin from "./pages/TutorLogin"
import StudentOnboarding from "./pages/StudentOnboarding"
import TutorOnboarding from "./pages/TutorOnboarding"
import StudentDashboard from "./pages/StudentDashboard"
import TutorDashboard from "./pages/TutorDashboard"

// Routes that use the main public layout (Navigation + Footer)
function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <div className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/students" element={<StudentRegistration />} />
            <Route path="/tutors" element={<TutorRegistration />} />
            <Route path="/tutor-registration" element={<TutorRegistration />} />
            <Route path="/student-registration" element={<StudentRegistration />} />
            <Route path="/tutor-terms" element={<TutorTerms />} />
            <Route path="/tutor-agreement/:tutorId" element={<TutorAcceptTerms />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/tutor-login" element={<TutorLogin />} />
            <Route path="/admin-login" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/admin" element={<Auth />} />
            <Route path="/tutor-auth" element={<TutorAuth />} />
            <Route path="/student-onboarding" element={
              <ProtectedRoute allowedRoles={['student']}><StudentOnboarding /></ProtectedRoute>
            } />
            <Route path="/tutor-onboarding" element={
              <ProtectedRoute allowedRoles={['tutor']}><TutorOnboarding /></ProtectedRoute>
            } />
            <Route path="/tutors/:id" element={<TutorDetailsPage />} />
            <Route path="/students/:id" element={<StudentDetailsPage />} />
            <Route path="*" element={<div className="p-8 text-center text-destructive">Page Not Found</div>} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>}>
        <Routes>
          {/* Dashboard routes — use sidebar layout, NO Navigation/Footer */}
          <Route path="/student-dashboard/*" element={
            <ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>
          } />
          <Route path="/tutor-dashboard/*" element={
            <ProtectedRoute allowedRoles={['tutor']}><TutorDashboard /></ProtectedRoute>
          } />
          <Route path="/admin-dashboard/*" element={
            <ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>
          } />

          {/* All other routes — public layout */}
          <Route path="/*" element={<PublicLayout />} />
        </Routes>
      </Suspense>
      <Toaster />
    </AuthProvider>
  )
}

export default App
