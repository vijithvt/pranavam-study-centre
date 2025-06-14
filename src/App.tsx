
import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

import Index from "./pages/Index"
import About from "./pages/About"
import Contact from "./pages/Contact"
import TutorRegistration from "./pages/TutorRegistration"
import StudentRegistration from "./pages/StudentRegistration"
import AdminDashboard from "./pages/AdminDashboard"
import TutorTerms from "./pages/TutorTerms"
import TutorAcceptTerms from "./pages/TutorAcceptTerms"

// You can add other page imports here as needed (e.g., About, Contact, etc.)

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Optional: make /students and /tutors go to something sensible for now */}
            <Route path="/students" element={<StudentRegistration />} />
            <Route path="/tutors" element={<TutorRegistration />} />
            <Route path="/tutor-registration" element={<TutorRegistration />} />
            <Route path="/student-registration" element={<StudentRegistration />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/tutor-terms" element={<TutorTerms />} />
            <Route path="/tutor-agreement/:tutorId" element={<TutorAcceptTerms />} />
            <Route path="*" element={<div className="p-8 text-center text-red-600">Page Not Found</div>} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default App
