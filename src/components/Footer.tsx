import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img
                src="/lovable-uploads/f1375cac-1988-4227-98e7-d4a89e68c1af.png"
                alt="Pranavam Study Centre logo"
                className="h-10 w-10"
                loading="lazy"
              />
              <div>
                <h2 className="text-xl font-bold">Pranavam Study Centre</h2>
                <p className="text-sm text-background/70">Kerala-focused tutor marketplace</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-background/75">
              കേരളത്തിലെ വിദ്യാർത്ഥികൾക്കും രക്ഷിതാക്കൾക്കും school tuition, music, drawing, skill-based learning എന്നിവയ്ക്കായി വിശ്വസ്തരായ അധ്യാപകരെ കണ്ടെത്താൻ സഹായിക്കുന്ന premium platform.
            </p>
            <div className="mt-5 space-y-3 text-sm text-background/75">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-background" />
                <span>Elavoorkkonam, Vilappilsala-Kundamoozhi Temple Rd, near Green Valley International School, Vilappilsala, Kerala 695573</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-background" />
                <a href="tel:+919496315903" className="hover:text-background">+91 94963 15903</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-background" />
                <a href="mailto:pranavamonline@gmail.com" className="hover:text-background">pranavamonline@gmail.com</a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-background">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm text-background/75">
              <li><Link to="/" className="hover:text-background">Home</Link></li>
              <li><a href="#home-enquiry" className="hover:text-background">ക്ലാസുകൾക്കായി അന്വേഷിക്കാം</a></li>
              <li><a href="#popular-categories" className="hover:text-background">Categories</a></li>
              <li><Link to="/about" className="hover:text-background">About</Link></li>
              <li><Link to="/contact" className="hover:text-background">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-background">Learning Areas</h3>
            <ul className="mt-4 space-y-3 text-sm text-background/75">
              <li>School Tuition</li>
              <li>College Subjects</li>
              <li>Violin & Music</li>
              <li>Drawing</li>
              <li>Programming</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-background/10 pt-6 text-sm text-background/60 md:flex-row md:items-center md:justify-between">
          <p>© 2025 Pranavam Study Centre. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/student-login" className="hover:text-background">Student Login</Link>
            <Link to="/tutor-login" className="hover:text-background">Tutor Login</Link>
            <Link to="/admin-login" className="hover:text-background">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
