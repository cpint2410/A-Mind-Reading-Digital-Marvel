
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const progressPercentage = (current / total) * 100;

  return (
    <div className="w-full bg-slate-700 rounded-full h-4 mb-6 shadow-inner">
      <div
        className="bg-gradient-to-r from-cyan-400 to-purple-500 h-4 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progressPercentage}%` }}
      ></div>
       <p className="text-center text-sm text-slate-300 mt-2 font-medium">Question {current} of {total}</p>
    </div>
  );
};
