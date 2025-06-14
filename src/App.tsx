import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import TutorRegistration from "./pages/TutorRegistration";
import StudentRegistration from "./pages/StudentRegistration";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import TutorAuth from "./pages/TutorAuth";
import TutorDashboard from "./pages/TutorDashboard";
import TutorTerms from "./pages/TutorTerms";
import TutorDetailsPage from "./pages/TutorDetailsPage";
import StudentDetailsPage from "./pages/StudentDetailsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/tutors" element={<TutorRegistration />} />
              <Route path="/students" element={<StudentRegistration />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/tutor-auth" element={<TutorAuth />} />
              <Route path="/tutor/dashboard" element={<TutorDashboard />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/tutor-terms" element={<TutorTerms />} />
              <Route path="/tutors/:id" element={<TutorDetailsPage />} />
              <Route path="/students/:id" element={<StudentDetailsPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
