import React, { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helpText?: string;
}

export default function Input({
  label,
  error,
  icon,
  helpText,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          className={`
            w-full px-4 py-2.5 ${icon ? "pl-10" : ""}
            border-2 border-slate-200 rounded-lg
            focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10
            transition-all duration-200
            placeholder-slate-400
            ${error ? "border-red-500 focus:border-red-500" : ""}
            ${className}
          `}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}

      {helpText && !error && (
        <p className="text-sm text-slate-500 mt-1">{helpText}</p>
      )}
    </div>
  );
}
