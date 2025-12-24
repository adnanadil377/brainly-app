import React, { useState } from 'react';
import { User, Check, X } from 'lucide-react';

const LogicFriends: React.FC = () => {
  const [assignments, setAssignments] = useState<{ [key: string]: string | null }>({
    Alex: null,
    Ben: null,
    Carl: null
  });
  const [result, setResult] = useState<string>('');

  const colors = ['Red', 'Blue', 'Green'];
  
  const handleAssign = (person: string, color: string) => {
    // If color already assigned, remove it from other person
    const newAssign = { ...assignments };
    Object.keys(newAssign).forEach(k => {
        if (newAssign[k] === color) newAssign[k] = null;
    });
    newAssign[person] = color;
    setAssignments(newAssign);
    setResult('');
  };

  const checkSolution = () => {
    const { Alex, Ben, Carl } = assignments;
    if (!Alex || !Ben || !Carl) {
        setResult("Make sure everyone has a shirt!");
        return;
    }

    // Rules: Alex != Red, Ben != Red, Ben != Green
    // Solution: Ben=Blue, Alex=Green, Carl=Red
    if (Alex === 'Green' && Ben === 'Blue' && Carl === 'Red') {
        setResult("CORRECT! 🎉 You solved the mystery!");
    } else {
        let feedback = "Hmm, something isn't right. Check the clues!";
        if (Alex === 'Red') feedback = "Clue says Alex is NOT wearing Red.";
        if (Ben === 'Red' || Ben === 'Green') feedback = "Clue says Ben is NOT Red or Green.";
        setResult(feedback);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl border-2 border-indigo-100 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-indigo-800 mb-4 font-comic-font text-center">Red, Blue, & Green Friends</h2>
      
      <div className="bg-indigo-50 p-4 rounded-xl mb-6 border border-indigo-200 text-left">
        <h3 className="font-bold text-indigo-900 mb-2 text-lg">🤔 The Mystery:</h3>
        <p className="text-indigo-800 mb-4">
            Three friends—Alex, Ben, and Carl—are wearing different colored shirts: <span className="text-red-500 font-bold">Red</span>, <span className="text-blue-500 font-bold">Blue</span>, and <span className="text-green-600 font-bold">Green</span>.
        </p>
        
        <div className="bg-white p-3 rounded-lg border border-indigo-100">
            <h4 className="font-bold text-indigo-900 text-sm uppercase tracking-wide mb-2">🕵️‍♀️ Clues:</h4>
            <ul className="list-disc pl-5 text-indigo-800 space-y-2">
                <li>Alex is <span className="font-bold text-red-500">NOT</span> wearing Red.</li>
                <li>Ben is <span className="font-bold text-red-500">NOT</span> wearing Red or <span className="font-bold text-green-600">Green</span>.</li>
                <li>Everyone wears a <strong>different</strong> color.</li>
            </ul>
        </div>
      </div>

      <div className="flex justify-around mb-8">
        {['Alex', 'Ben', 'Carl'].map(person => (
            <div key={person} className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden relative">
                    {assignments[person] ? (
                        <div className={`w-full h-full flex items-center justify-center text-white font-bold
                            ${assignments[person] === 'Red' ? 'bg-red-500' : 
                              assignments[person] === 'Blue' ? 'bg-blue-500' : 'bg-green-500'}
                        `}>
                            Shirt
                        </div>
                    ) : (
                        <User className="text-gray-400" size={40} />
                    )}
                </div>
                <span className="font-bold text-lg">{person}</span>
                
                <div className="flex gap-1">
                    {colors.map(c => (
                        <button 
                            key={c}
                            onClick={() => handleAssign(person, c)}
                            className={`w-6 h-6 rounded-full border border-gray-300 hover:scale-125 transition-transform
                                ${c === 'Red' ? 'bg-red-500' : c === 'Blue' ? 'bg-blue-500' : 'bg-green-500'}
                                ${assignments[person] === c ? 'ring-2 ring-offset-2 ring-gray-800' : ''}
                            `}
                        />
                    ))}
                </div>
            </div>
        ))}
      </div>

      <div className="text-center">
        <button 
            onClick={checkSolution}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform active:scale-95"
        >
            Check Answer
        </button>
        
        {result && (
            <div className={`mt-6 p-4 rounded-xl font-bold text-lg animate-bounce ${result.includes('CORRECT') ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {result.includes('CORRECT') ? <Check className="inline mr-2"/> : <X className="inline mr-2"/>}
                {result}
            </div>
        )}
      </div>
    </div>
  );
};

export default LogicFriends;