
import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children, className = '' }) => {
  const baseClasses = "px-8 py-3 font-bold text-white rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 flex items-center justify-center gap-2 text-lg";
  const defaultGradient = "bg-gradient-to-br from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600";
  
  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className || defaultGradient}`}
    >
      {children}
    </button>
  );
};
