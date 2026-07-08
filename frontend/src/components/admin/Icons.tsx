import React from 'react';
import * as Lucide from 'lucide-react';

interface IconProps {
  name: string;
  className?: string;
}

export const Icon = ({ name, className = "w-5 h-5" }: IconProps) => {
  const LucideIcon = (Lucide as any)[name];

  if (!LucideIcon) {
    console.warn(`Icon "${name}" tidak ditemukan di lucide-react.`);
    return null;
  }

  return (
    <LucideIcon 
      className={className} 
      strokeWidth={1.5} 
    />
  );
};