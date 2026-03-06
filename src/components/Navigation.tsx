import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, role, signOut, loading } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Find a Tutor', path: '/students', highlight: true },
    { name: 'Join as Tutor', path: '/tutors' },
    { name: 'Contact', path: '/contact' }
  ];

  const dashboardPath = role === 'admin' ? '/admin-dashboard' : role === 'tutor' ? '/tutor-dashboard' : '/student-dashboard';

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="bg-background shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/f1375cac-1988-4227-98e7-d4a89e68c1af.png" 
              alt="Pranavam Study Centre" 
              className="h-8 w-8"
            />
            <span className="font-bold text-xl text-primary">Pranavam Study Centre</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-primary font-semibold'
                    : item.highlight
                    ? 'text-primary-foreground bg-gradient-to-r from-primary to-primary/80 px-4 py-2 rounded-lg font-semibold shadow-lg hover:opacity-90 transform transition-all duration-200'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <User className="h-4 w-4" />
                        <span className="capitalize">{role || 'User'}</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to={dashboardPath}>Dashboard</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={signOut} className="text-destructive">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" className="gap-1">
                        Login
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link to="/student-login">Student Login</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/tutor-login">Tutor Login</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin-login">Admin Login</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-primary bg-primary/10'
                      : item.highlight
                      ? 'text-primary-foreground bg-gradient-to-r from-primary to-primary/80 shadow-lg'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {!loading && (
                <>
                  {user ? (
                    <>
                      <Link to={dashboardPath} className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted">
                        Dashboard
                      </Link>
                      <button onClick={signOut} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-destructive hover:bg-muted">
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/student-login" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted">Student Login</Link>
                      <Link to="/tutor-login" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted">Tutor Login</Link>
                      <Link to="/admin-login" className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-muted">Admin Login</Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
