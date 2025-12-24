import React, { useState, useEffect } from 'react';
import { RefreshCw, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';

type Item = 'farmer' | 'wolf' | 'goat' | 'cabbage';
type Location = 'left' | 'right';

const RiverCrossing: React.FC = () => {
  const [leftBank, setLeftBank] = useState<Item[]>(['wolf', 'goat', 'cabbage']);
  const [rightBank, setRightBank] = useState<Item[]>([]);
  const [boat, setBoat] = useState<Item[]>(['farmer']); // Farmer is always driving
  const [boatLocation, setBoatLocation] = useState<Location>('left');
  const [message, setMessage] = useState("Help the farmer get everyone across!");
  const [status, setStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const checkRules = (left: Item[], right: Item[], boatLoc: Location) => {
    // Items are unsafe if they are on a bank WITHOUT the farmer
    const checkBank = (items: Item[]) => {
      const hasGoat = items.includes('goat');
      const hasWolf = items.includes('wolf');
      const hasCabbage = items.includes('cabbage');
      
      if (hasGoat && hasWolf) return "Oh no! The Wolf ate the Goat!";
      if (hasGoat && hasCabbage) return "Oh no! The Goat ate the Cabbage!";
      return null;
    };

    // If boat is at right, check left bank (farmer is absent from left)
    if (boatLoc === 'right') {
      const result = checkBank(left);
      if (result) return result;
    }
    // If boat is at left, check right bank (farmer is absent from right)
    if (boatLoc === 'left') {
      const result = checkBank(right);
      if (result) return result;
    }
    return null;
  };

  const moveBoat = () => {
    if (status !== 'playing') return;

    const newLoc = boatLocation === 'left' ? 'right' : 'left';
    setBoatLocation(newLoc);

    // Check win condition
    if (newLoc === 'right' && leftBank.length === 0 && boat.length === 1 && boat[0] === 'farmer') {
        // Wait, farmer needs to unload everything to win? Usually standard is everyone on right.
        // Let's assume if boat reaches right and everyone is either on right or in boat.
    }
  };

  useEffect(() => {
    // Check rules after boat moves or items unload
    if (status !== 'playing') return;

    // Check Win
    if (rightBank.length === 3 && boatLocation === 'right' && boat.length === 1) {
        setStatus('won');
        setMessage("🎉 You did it! Everyone is safe!");
        return;
    }

    const failMsg = checkRules(leftBank, rightBank, boatLocation);
    if (failMsg) {
        setStatus('lost');
        setMessage(failMsg);
    } else {
        setMessage("Keep going! Who should move next?");
    }
  }, [leftBank, rightBank, boatLocation, boat]);

  const toggleItem = (item: Item) => {
    if (status !== 'playing') return;

    if (boatLocation === 'left') {
      if (leftBank.includes(item)) {
        if (boat.length >= 2) {
            setMessage("Boat is full! (Farmer + 1 item)");
            return;
        }
        setLeftBank(leftBank.filter(i => i !== item));
        setBoat([...boat, item]);
      } else if (boat.includes(item) && item !== 'farmer') {
        setBoat(boat.filter(i => i !== item));
        setLeftBank([...leftBank, item]);
      }
    } else {
      if (rightBank.includes(item)) {
        if (boat.length >= 2) {
             setMessage("Boat is full!");
             return;
        }
        setRightBank(rightBank.filter(i => i !== item));
        setBoat([...boat, item]);
      } else if (boat.includes(item) && item !== 'farmer') {
        setBoat(boat.filter(i => i !== item));
        setRightBank([...rightBank, item]);
      }
    }
  };

  const reset = () => {
    setLeftBank(['wolf', 'goat', 'cabbage']);
    setRightBank([]);
    setBoat(['farmer']);
    setBoatLocation('left');
    setStatus('playing');
    setMessage("Help the farmer get everyone across!");
  };

  const renderItem = (item: Item) => {
    const emojis: Record<Item, string> = {
        farmer: '🧑‍🌾',
        wolf: '🐺',
        goat: '🐐',
        cabbage: '🥬'
    };
    return (
        <button 
            onClick={() => toggleItem(item)}
            className="text-4xl hover:scale-110 transition-transform p-2 cursor-pointer bg-white rounded-full shadow-sm border-2 border-transparent hover:border-blue-400"
        >
            {emojis[item]}
        </button>
    );
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4 bg-sky-100 rounded-xl shadow-xl border-4 border-sky-300">
      <h2 className="text-3xl font-bold text-sky-800 mb-4 font-comic-font">Wolf, Goat & Cabbage</h2>
      
      {/* Rules Section */}
      <div className="bg-white p-4 rounded-xl border-2 border-sky-200 mb-6 w-full text-left shadow-sm">
        <h3 className="font-bold text-sky-900 mb-2 text-lg">📜 The Challenge:</h3>
        <p className="text-sky-800 mb-2">
            A farmer needs to cross a river with a <strong>wolf</strong>, a <strong>goat</strong>, and a <strong>cabbage</strong>. 
            The boat fits only the farmer and one item.
        </p>
        <ul className="list-disc pl-5 text-sky-800 space-y-1">
            <li>If left alone, the <span className="text-red-500 font-bold">Wolf eats the Goat</span>. 🐺🍖🐐</li>
            <li>If left alone, the <span className="text-red-500 font-bold">Goat eats the Cabbage</span>. 🐐🍖🥬</li>
            <li><strong>Goal:</strong> Get everyone to the other side safely!</li>
        </ul>
      </div>

      <div className={`p-4 mb-6 rounded-lg text-lg font-bold text-center w-full transition-colors ${
        status === 'lost' ? 'bg-red-100 text-red-600' : 
        status === 'won' ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600'
      }`}>
        {status === 'lost' && <AlertTriangle className="inline mr-2" />}
        {status === 'won' && <CheckCircle className="inline mr-2" />}
        {message}
      </div>

      <div className="flex w-full justify-between items-center bg-blue-500 h-48 rounded-xl relative overflow-hidden">
        {/* Left Bank */}
        <div className="w-1/4 h-full bg-green-300 flex flex-wrap content-center justify-center gap-2 relative z-10 border-r-4 border-green-500/50">
             {leftBank.map(renderItem)}
        </div>

        {/* River & Boat */}
        <div className="flex-1 h-full relative">
            <div className={`absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out flex flex-col items-center
                ${boatLocation === 'left' ? 'left-4' : 'left-[calc(100%-8rem)]'}
            `}>
                <div className="bg-amber-700 w-32 h-12 rounded-b-3xl flex justify-center items-center gap-2 shadow-lg border-2 border-amber-900 relative">
                     {boat.map(renderItem)}
                </div>
                <button 
                    onClick={moveBoat}
                    disabled={status !== 'playing'}
                    className="mt-4 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 font-bold py-2 px-4 rounded-full shadow-lg border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 transition-all"
                >
                    Row Boat {boatLocation === 'left' ? '→' : '←'}
                </button>
            </div>
            
            {/* Water effects */}
            <div className="absolute bottom-4 left-10 text-blue-300 text-4xl animate-bounce">~~~~</div>
            <div className="absolute top-4 right-20 text-blue-300 text-4xl animate-bounce delay-300">~~~~</div>
        </div>

        {/* Right Bank */}
        <div className="w-1/4 h-full bg-green-300 flex flex-wrap content-center justify-center gap-2 relative z-10 border-l-4 border-green-500/50">
            {rightBank.map(renderItem)}
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button onClick={reset} className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-6 rounded-full transition-colors">
            <RefreshCw size={20} /> Reset
        </button>
      </div>
    </div>
  );
};

export default RiverCrossing;