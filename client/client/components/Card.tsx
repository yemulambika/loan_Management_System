import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  shadow?: "sm" | "md" | "lg" | "xl";
}

const shadowMap = {
  sm: "shadow-sm",
  md: "shadow-md",
  lg: "shadow-lg",
  xl: "shadow-xl",
};

export default function Card({
  children,
  className = "",
  hoverable = false,
  shadow = "md",
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-xl p-6 
        ${shadowMap[shadow]}
        ${hoverable ? "hover:shadow-lg transition-shadow duration-300 cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
