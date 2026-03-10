import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation, Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  CreditCard,
  BookOpen,
  Search,
  Send,
  Wallet,
  UserCircle,
  Users,
  ClipboardList,
  IndianRupee,
  ArrowLeftRight,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type NavItem = {
  label: string;
  path: string;
  icon: React.ElementType;
};

const studentNav: NavItem[] = [
  { label: 'ഡാഷ്ബോർഡ്', path: '/student-dashboard', icon: LayoutDashboard },
  { label: 'എന്റെ ആവശ്യങ്ങൾ', path: '/student-dashboard/enquiries', icon: FileText },
  { label: 'അധ്യാപക നിർദ്ദേശങ്ങൾ', path: '/student-dashboard/proposals', icon: MessageSquare },
  { label: 'പെയ്മെന്റുകൾ', path: '/student-dashboard/payments', icon: CreditCard },
  { label: 'ക്ലാസുകൾ', path: '/student-dashboard/classes', icon: BookOpen },
];

const tutorNav: NavItem[] = [
  { label: 'ഡാഷ്ബോർഡ്', path: '/tutor-dashboard', icon: LayoutDashboard },
  { label: 'ലഭ്യമായ ആവശ്യങ്ങൾ', path: '/tutor-dashboard/enquiries', icon: Search },
  { label: 'എന്റെ അപേക്ഷകൾ', path: '/tutor-dashboard/proposals', icon: Send },
  { label: 'എന്റെ ക്ലാസുകൾ', path: '/tutor-dashboard/classes', icon: BookOpen },
  { label: 'വരുമാനം', path: '/tutor-dashboard/earnings', icon: Wallet },
  { label: 'പ്രൊഫൈൽ', path: '/tutor-dashboard/profile', icon: UserCircle },
];

const adminNav: NavItem[] = [
  { label: 'ഡാഷ്ബോർഡ്', path: '/admin-dashboard', icon: LayoutDashboard },
  { label: 'അധ്യാപകർ', path: '/admin-dashboard/tutors', icon: Users },
  { label: 'വിദ്യാർത്ഥി ആവശ്യങ്ങൾ', path: '/admin-dashboard/enquiries', icon: ClipboardList },
  { label: 'അപേക്ഷകൾ', path: '/admin-dashboard/proposals', icon: MessageSquare },
  { label: 'പെയ്മെന്റുകൾ', path: '/admin-dashboard/payments', icon: IndianRupee },
  { label: 'പേയൗട്ടുകൾ', path: '/admin-dashboard/payouts', icon: ArrowLeftRight },
];

const DashboardSidebar: React.FC = () => {
  const { role } = useAuth();
  const location = useLocation();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  const navItems = role === 'admin' ? adminNav : role === 'tutor' ? tutorNav : studentNav;

  const roleLabel = role === 'admin' ? 'അഡ്മിൻ' : role === 'tutor' ? 'അധ്യാപകൻ' : 'വിദ്യാർത്ഥി';

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/lovable-uploads/f1375cac-1988-4227-98e7-d4a89e68c1af.png"
            alt="Pranavam Study Centre"
            className="h-8 w-8 flex-shrink-0"
          />
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground leading-tight">
                Pranavam Study Centre
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight">
                {roleLabel} പാനൽ
              </span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                      className={`
                        transition-all duration-200 rounded-lg mb-0.5
                        ${isActive
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-sm'
                          : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                        }
                      `}
                    >
                      <Link to={item.path} className="flex items-center gap-3 px-3 py-2.5">
                        <item.icon className={`h-4.5 w-4.5 flex-shrink-0 ${isActive ? 'text-sidebar-primary' : ''}`} />
                        {!collapsed && <span className="text-sm">{item.label}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        {!collapsed && (
          <Link to="/">
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground text-xs">
              <Home className="h-3.5 w-3.5" />
              ഹോം പേജിലേക്ക്
            </Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
