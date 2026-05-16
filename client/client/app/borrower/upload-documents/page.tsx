"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import {
  Upload,
  Button,
  Form,
  Slider,
  message,
  Typography,
  Card,
  type UploadFile,
  type UploadProps,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ProtectedRoute from "@/components/ProtectedRoute";
import API from "@/services/api";
import "@/styles/borrower.css";

const { Title } = Typography;

type ApiErrorResponse = {
  message?: string;
};

function UploadDocumentsContent() {
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [tenure, setTenure] = useState(30);
  const interestRate = 12;

  const calculateSI = (principal: number, rate: number, days: number) =>
    (principal * rate * days) / (365 * 100);

  const si = calculateSI(loanAmount, interestRate, tenure);
  const totalRepayment = loanAmount + si;

  const handleUploadChange: UploadProps["onChange"] = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleApply = async () => {
    if (fileList.length === 0) {
      message.error("Please upload your salary slip (PDF/JPG/PNG).");
      return;
    }

    try {
      const activeLoanId = localStorage.getItem("activeLoanId");
      const formData = new FormData();

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("documents", file.originFileObj);
        }
      });

      if (activeLoanId) {
        formData.append("loanId", activeLoanId);
      }

      await API.post("/loan/upload-documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await API.post("/loan/apply", {
        loanId: activeLoanId,
        amount: loanAmount,
        tenure,
        interestRate,
        interest: si,
        totalRepayment,
        status: "Pending",
      });

      localStorage.removeItem("activeLoanId");
      message.success("Loan application submitted successfully!");
    } catch (error) {
      const apiError = error as AxiosError<ApiErrorResponse>;
      message.error(apiError.response?.data?.message || "Failed to apply for loan");
    }
  };

  return (
    <div className="borrower-container" style={{ maxWidth: 600, margin: "40px auto" }}>
      <Card>
        <Title level={3}>Upload Salary Slip</Title>
        <Upload
          beforeUpload={(file) => {
            const isAllowed =
              file.type === "application/pdf" ||
              file.type === "image/jpeg" ||
              file.type === "image/png";

            if (!isAllowed) {
              message.error("Only PDF/JPG/PNG files are allowed.");
              return Upload.LIST_IGNORE;
            }

            if (file.size / 1024 / 1024 > 5) {
              message.error("File must be smaller than 5MB.");
              return Upload.LIST_IGNORE;
            }

            return true;
          }}
          onChange={handleUploadChange}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Card>

      <Card style={{ marginTop: 24 }}>
        <Title level={3}>Loan Configuration</Title>
        <Form layout="vertical">
          <Form.Item label={`Loan Amount: Rs. ${loanAmount.toLocaleString("en-IN")}`}>
            <Slider
              min={50000}
              max={500000}
              step={10000}
              value={loanAmount}
              onChange={setLoanAmount}
            />
          </Form.Item>

          <Form.Item label={`Tenure: ${tenure} days`}>
            <Slider
              min={30}
              max={365}
              step={15}
              value={tenure}
              onChange={setTenure}
            />
          </Form.Item>
        </Form>

        <Card className="loan-summary">
          <p>Interest Rate: {interestRate}% p.a.</p>
          <p>Simple Interest: Rs. {si.toFixed(2)}</p>
          <p>Total Repayment: Rs. {totalRepayment.toFixed(2)}</p>
        </Card>
        <Button type="primary" block className="apply-btn" onClick={handleApply}>
          Apply
        </Button>
      </Card>
      <button
        onClick={() => router.push("/borrower/status")}
        className="status-btn"
      >
        Check Application Status
      </button>
    </div>
  );
}

export default function UploadDocumentsPage() {
  return (
    <ProtectedRoute requiredRole="borrower">
      <UploadDocumentsContent />
    </ProtectedRoute>
  );
}
