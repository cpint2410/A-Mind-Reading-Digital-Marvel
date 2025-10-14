
import React from 'react';
import type { CardData } from '../types';

interface NumberCardProps {
  card: CardData;
}

export const NumberCard: React.FC<NumberCardProps> = ({ card }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl p-6 md:p-8">
      <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 md:gap-4 text-center">
        {card.numbers.map((num) => (
          <div
            key={num}
            className="flex items-center justify-center h-12 w-12 rounded-lg bg-slate-700/50 text-slate-200 font-mono text-xl shadow-md"
          >
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};
