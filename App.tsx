
import React, { useState, useEffect } from 'react';
import { GameState, CardData } from './types';
import { CARDS } from './constants';
import { ActionButton } from './components/ActionButton';
import { NumberCard } from './components/NumberCard';
import { ProgressBar } from './components/ProgressBar';
import { MindIcon, WandIcon, ThumbsUpIcon, ThumbsDownIcon } from './components/Icons';

// --- Helper Components defined outside App to prevent re-renders ---

interface WelcomeScreenProps {
  onStart: () => void;
}
const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => (
  <div className="animate-fade-in text-center p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 max-w-lg mx-auto">
    <div className="flex justify-center mb-6">
      <MindIcon />
    </div>
    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
      Number Wizard
    </h1>
    <p className="text-slate-300 text-lg mb-2">I can read your mind!</p>
    <p className="text-slate-400 mb-8">
      Think of any number between 1 and 60. Keep it secret. I will ask you 6 questions to reveal it.
    </p>
    <ActionButton onClick={onStart}>
      I'm Ready!
    </ActionButton>
  </div>
);

interface GameScreenProps {
  card: CardData;
  onAnswer: (isYes: boolean) => void;
  currentStep: number;
  totalSteps: number;
}
const GameScreen: React.FC<GameScreenProps> = ({ card, onAnswer, currentStep, totalSteps }) => (
  <div className="animate-fade-in w-full max-w-2xl">
    <ProgressBar current={currentStep} total={totalSteps} />
    <h2 className="text-2xl font-semibold text-slate-200 text-center mb-6">
      Is your number on this card?
    </h2>
    <NumberCard card={card} />
    <div className="flex justify-center items-center gap-4 mt-8">
      <ActionButton onClick={() => onAnswer(false)} className="bg-gradient-to-br from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
        <ThumbsDownIcon />
        No
      </ActionButton>
      <ActionButton onClick={() => onAnswer(true)} className="bg-gradient-to-br from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600">
        <ThumbsUpIcon />
        Yes
      </ActionButton>
    </div>
  </div>
);

const CalculatingScreen: React.FC = () => (
    <div className="animate-fade-in text-center p-8">
        <div className="w-16 h-16 border-4 border-dashed border-cyan-400 rounded-full animate-spin-slow mx-auto mb-6"></div>
        <h2 className="text-3xl font-bold text-slate-200">The spirits are calculating...</h2>
        <p className="text-slate-400 mt-2">Reading the echoes of your thoughts.</p>
    </div>
);


interface ResultScreenProps {
  number: number;
  onPlayAgain: () => void;
}
const ResultScreen: React.FC<ResultScreenProps> = ({ number, onPlayAgain }) => (
  <div className="animate-fade-in text-center p-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700 max-w-lg mx-auto">
     <div className="flex justify-center mb-6">
      <WandIcon />
    </div>
    <p className="text-slate-300 text-xl mb-2">The number you were thinking of is...</p>
    <p className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 my-4">
      {number}
    </p>
    <p className="text-slate-400 mb-8">Was I right? Of course, I was!</p>
    <ActionButton onClick={onPlayAgain}>
      Play Again
    </ActionButton>
  </div>
);

// --- Main App Component ---

export default function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.WELCOME);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (gameState === GameState.CALCULATING) {
      const timer = setTimeout(() => {
        setGameState(GameState.RESULT);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const handleStart = () => {
    setCurrentCardIndex(0);
    setTotal(0);
    setGameState(GameState.PLAYING);
  };

  const handleAnswer = (isYes: boolean) => {
    if (isYes) {
      setTotal(prevTotal => prevTotal + CARDS[currentCardIndex].value);
    }

    if (currentCardIndex < CARDS.length - 1) {
      setCurrentCardIndex(prevIndex => prevIndex + 1);
    } else {
      setGameState(GameState.CALCULATING);
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case GameState.PLAYING:
        return (
          <GameScreen
            card={CARDS[currentCardIndex]}
            onAnswer={handleAnswer}
            currentStep={currentCardIndex + 1}
            totalSteps={CARDS.length}
          />
        );
      case GameState.CALCULATING:
        return <CalculatingScreen />;
      case GameState.RESULT:
        return <ResultScreen number={total} onPlayAgain={handleStart} />;
      case GameState.WELCOME:
      default:
        return <WelcomeScreen onStart={handleStart} />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-800 text-slate-200 flex flex-col items-center justify-center p-4 font-sans">
      {renderContent()}
    </main>
  );
}
