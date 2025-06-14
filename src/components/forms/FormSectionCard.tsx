
import React from "react";
import { cn } from "@/lib/utils";

interface FormSectionCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const FormSectionCard: React.FC<FormSectionCardProps> = ({
  title,
  description,
  children,
  className = ""
}) => (
  <div
    className={cn(
      "bg-white rounded-xl shadow-sm border p-6 md:p-8 mb-8 animate-fade-in",
      className
    )}
  >
    {title && (
      <div className="mb-2">
        <h3 className="text-lg font-semibold text-primary">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-1">{description}</p>
        )}
      </div>
    )}
    <div>{children}</div>
  </div>
);

export default FormSectionCard;
