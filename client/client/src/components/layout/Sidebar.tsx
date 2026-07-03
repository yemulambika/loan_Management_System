import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  CheckCircle,
  DollarSign,
  CreditCard,
  Receipt,
  BarChart3,
  PieChart,
  UserCog,
  Settings,
  ScrollText,
  HelpCircle,
  Landmark,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface MenuItem {
  path: string;
  icon: any;
  label: string;
  roles: string[];
}

const allMenuItems: MenuItem[] = [
  { path: '/app', icon: LayoutDashboard, label: 'Dashboard', roles: ['admin', 'sales', 'sanction', 'disbursement', 'collection', 'borrower'] },
  { path: '/app/customers', icon: Users, label: 'Customers', roles: ['admin', 'sales'] },
  { path: '/app/loans', icon: FileText, label: 'My Loans', roles: ['borrower'] },
  { path: '/app/loans', icon: FileText, label: 'Loan Applications', roles: ['admin', 'sales'] },
  { path: '/app/loan-approval', icon: CheckCircle, label: 'Loan Approval', roles: ['admin', 'sanction'] },
  { path: '/app/loan-disbursement', icon: DollarSign, label: 'Loan Disbursement', roles: ['admin', 'disbursement'] },
  { path: '/app/emi', icon: CreditCard, label: 'EMI Management', roles: ['admin', 'collection'] },
  { path: '/app/payments', icon: Receipt, label: 'Payments', roles: ['admin', 'collection'] },
  { path: '/app/transactions', icon: BarChart3, label: 'Transactions', roles: ['admin', 'collection'] },
  { path: '/app/reports', icon: PieChart, label: 'Reports', roles: ['admin', 'sales', 'sanction', 'disbursement', 'collection'] },
  { path: '/app/analytics', icon: BarChart3, label: 'Analytics', roles: ['admin'] },
  { path: '/app/employees', icon: UserCog, label: 'Employees', roles: ['admin'] },
  { path: '/app/settings', icon: Settings, label: 'Settings', roles: ['admin', 'sales', 'sanction', 'disbursement', 'collection', 'borrower'] },
  { path: '/app/audit-logs', icon: ScrollText, label: 'Audit Logs', roles: ['admin'] },
  { path: '/app/support', icon: HelpCircle, label: 'Support', roles: ['admin', 'sales', 'sanction', 'disbursement', 'collection', 'borrower'] },
];

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  const { role } = useAuth();
  
  const menuItems = allMenuItems.filter(item => item.roles.includes(role || 'borrower'));

  return (
    <aside
      className={`bg-sidebar text-white transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="h-16 flex items-center justify-center border-b border-white/10">
        <Landmark className={`${collapsed ? 'w-8 h-8' : 'w-8 h-8 mr-3'}`} />
        {!collapsed && (
          <span className="text-xl font-bold tracking-tight">LoanMS</span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;