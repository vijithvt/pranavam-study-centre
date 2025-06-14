import React, { Suspense } from "react"
import { Route, Routes } from "react-router-dom"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Examples } from "@/components/examples"
import { Docs } from "@/components/docs"
import { Pricing } from "@/components/pricing"
import { Auth } from "@/components/auth"
import { Home } from "@/components/home"
import TutorRegistration from "./pages/TutorRegistration"
import StudentRegistration from "./pages/StudentRegistration"
import AdminDashboard from "./pages/AdminDashboard"
import TutorTerms from "./pages/TutorTerms"
import TutorAcceptTerms from "./pages/TutorAcceptTerms";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/examples" element={<Examples />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/tutor-registration" element={<TutorRegistration />} />
            <Route path="/student-registration" element={<StudentRegistration />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/tutor-terms" element={<TutorTerms />} />
            <Route path="/tutor-agreement/:tutorId" element={<TutorAcceptTerms />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
