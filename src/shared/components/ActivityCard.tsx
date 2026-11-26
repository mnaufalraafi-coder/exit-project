// src/shared/components/ActivityCard.tsx
import React from "react";

interface ActivityCardProps {
  title: string;
  value: number;
  bgColor?: string; // Tailwind bg class
  textColor?: string; // Tailwind text class
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  value,
  bgColor = "bg-navy",
  textColor = "text-white",
}) => {
  return (
    <div className={`p-4 rounded ${bgColor} ${textColor}`}>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
};
