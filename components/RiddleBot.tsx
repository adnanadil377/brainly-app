import React, { useState } from 'react';
import { getRiddle, getRiddleAnswer } from '../services/gemini';
import { MessageCircle, Eye, EyeOff } from 'lucide-react';

const RiddleBot: React.FC = () => {
  const [currentRiddle, setCurrentRiddle] = useState<string | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchRiddle = async () => {
    setLoading(true);
    setAnswer(null);
    setShowAnswer(false);
    const r = await getRiddle();
    setCurrentRiddle(r);
    setLoading(false);
  };

  const revealAnswer = async () => {
    if (!currentRiddle) return;
    if (answer) {
        setShowAnswer(true);
        return;
    }
    setLoading(true);
    const ans = await getRiddleAnswer(currentRiddle);
    setAnswer(ans);
    setShowAnswer(true);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-br from-violet-500 to-fuchsia-600 p-1 rounded-3xl shadow-2xl max-w-xl mx-auto text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-[22px] flex flex-col items-center text-center h-full min-h-[400px]">
        <div className="mb-6 bg-white p-3 rounded-full text-violet-600">
            <MessageCircle size={48} />
        </div>
        
        <h2 className="text-3xl font-comic-font font-bold mb-2">The Riddle Robot</h2>
        <p className="text-white/80 mb-6 text-lg">I speak in riddles. Can you guess the answer before peeking?</p>

        {!currentRiddle && !loading && (
            <div className="flex-1 flex items-center">
                <p className="text-xl">Ready to trick your brain?</p>
            </div>
        )}

        {loading && (
             <div className="flex-1 flex items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white"></div>
            </div>
        )}

        {currentRiddle && !loading && (
            <div className="flex-1 flex flex-col justify-center w-full">
                <p className="text-2xl font-medium mb-8 leading-relaxed">"{currentRiddle}"</p>
                
                {showAnswer ? (
                     <div className="bg-white/20 p-4 rounded-xl animate-fade-in">
                        <p className="text-yellow-300 font-bold text-xl">{answer}</p>
                     </div>
                ) : (
                    <button 
                        onClick={revealAnswer}
                        className="mx-auto flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Eye size={20}/> Peek at answer
                    </button>
                )}
            </div>
        )}

        <button 
            onClick={fetchRiddle}
            className="w-full mt-8 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-4 rounded-xl shadow-lg border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 transition-all text-xl"
        >
            {currentRiddle ? "New Riddle!" : "Start!"}
        </button>
      </div>
    </div>
  );
};

export default RiddleBot;