// app/loans/[id]/edit/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/services/api";

type Loan = {
  amount?: number;
  tenure?: number;
};

export default function EditLoanPage() {
  const { id } = useParams();
  const [loan, setLoan] = useState<Loan | null>(null);

  useEffect(() => {
    API.get<Loan>(`/loan/${id}`).then((res) => setLoan(res.data));
  }, [id]);

  if (!loan) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Loan</h1>
      <form>
        {/* Example fields */}
        <input defaultValue={loan.amount} />
        <input defaultValue={loan.tenure} />
        {/* Save button */}
      </form>
    </div>
  );
}
