export type UserRole = 'admin' | 'sales' | 'sanction' | 'disbursement' | 'collection' | 'borrower';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  stage?: string;
  hasLoan?: boolean;
  breStatus?: 'PENDING' | 'PASSED' | 'FAILED';
  lastActive?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  role: string;
  user?: Partial<User>;
}

export interface Loan {
  _id: string;
  borrower: string | User;
  fullName: string;
  pan?: string;
  dob?: string;
  monthlySalary?: number;
  employmentMode?: string;
  amount: number;
  tenure: number;
  interestRate?: number;
  interest?: number;
  totalRepayment?: number;
  salarySlip?: string;
  documents?: string[];
  status: 'DRAFT' | 'PENDING' | 'SANCTIONED' | 'DISBURSED' | 'CLOSED' | 'REJECTED';
  rejectionReason?: string;
  paidAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payment {
  _id: string;
  loanId: string | Loan;
  utrNumber: string;
  amount: number;
  paymentDate: Date;
  createdAt: Date;
}

export interface DashboardStats {
  totalCustomers: number;
  activeLoans: number;
  pendingLoans: number;
  rejectedLoans: number;
  totalRevenue: number;
  emiCollected: number;
  overduePayments: number;
  defaultLoans: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}