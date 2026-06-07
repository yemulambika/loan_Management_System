import React from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

export type AlertType = "success" | "error" | "warning" | "info";

interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  onClose?: () => void;
  dismissible?: boolean;
}

const typeConfig = {
  success: {
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    titleColor: "text-green-900",
    messageColor: "text-green-800",
    icon: CheckCircle,
    iconColor: "text-green-600",
  },
  error: {
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    titleColor: "text-red-900",
    messageColor: "text-red-800",
    icon: AlertCircle,
    iconColor: "text-red-600",
  },
  warning: {
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    titleColor: "text-yellow-900",
    messageColor: "text-yellow-800",
    icon: AlertTriangle,
    iconColor: "text-yellow-600",
  },
  info: {
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    titleColor: "text-blue-900",
    messageColor: "text-blue-800",
    icon: Info,
    iconColor: "text-blue-600",
  },
};

export default function Alert({
  type,
  title,
  message,
  onClose,
  dismissible = true,
}: AlertProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        ${config.bgColor} ${config.borderColor}
        border-l-4 rounded-lg p-4 flex gap-3
        animate-slide-up
      `}
    >
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${config.iconColor}`} />

      <div className="flex-1">
        {title && (
          <h3 className={`font-semibold ${config.titleColor} mb-1`}>
            {title}
          </h3>
        )}
        <p className={config.messageColor}>{message}</p>
      </div>

      {dismissible && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 flex-shrink-0"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
