export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface ILoan {
  borrower: string;
  amount: number;
  tenure: number;
  interest: number;
  totalRepayment: number;
  status: string;
}

export interface IPayment {
  loanId: string;
  utrNumber: string;
  amount: number;
}
 declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
      };
    }
  }
}
