# Loan Management System

Full-stack Loan Management System built with Next.js, TypeScript, Express, MongoDB, JWT auth, and role-based dashboards.

## Features

- Borrower registration/login
- Server-side BRE eligibility checks
- Salary slip upload
- Loan amount and tenure configuration with simple interest calculation
- Sales, Sanction, Disbursement, Collection, and Admin dashboards
- Role-based access control on frontend and backend
- Payment recording with unique UTR validation
- Auto-close loan when repayment is complete

## Setup

### Backend

```bash
cd server
cp .env.example .env
npm install
npm run seed
npm run dev
```

Update `server/.env` with your MongoDB URL and JWT secret.

### Frontend

```bash
cd client/client
npm install
npm run dev
```

Open `http://localhost:3000`.

## Seeded Login Credentials

All seeded users use password:

```text
Password@123
```

| Role | Email |
| --- | --- |
| Admin | admin@gmail.com |
| Sales | sales@gmail.com |
| Sanction | sanction@gmail.com |
| Disbursement | disbursement@gmail.com |
| Collection | collection@gmail.com |
| Borrower | borrower@gmail.com |

## Test Flow

1. Login/register as borrower.
2. Complete personal details and pass BRE.
3. Upload salary slip.
4. Select loan amount and tenure, then apply.
5. Login as Sanction and approve the pending loan.
6. Login as Disbursement and mark the sanctioned loan as disbursed.
7. Login as Collection and add payment using a unique UTR.
8. Once paid amount reaches total repayment, the loan status becomes `CLOSED`.

## Useful Commands

```bash
cd client/client
npm run lint
npm run build
```

```bash
cd server
npx tsc --noEmit
```
