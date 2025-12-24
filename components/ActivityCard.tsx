import React from 'react';
import { Timer } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  materials: string[];
  challenge: string;
}

const ActivityCard: React.FC<Props> = ({ title, description, materials, challenge }) => {
  return (
    <div className="bg-orange-50 p-6 rounded-2xl shadow-lg border-2 border-orange-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-orange-200 rounded-full text-orange-700">
            <Timer size={24} />
        </div>
        <h3 className="text-xl font-bold text-orange-900">{title}</h3>
      </div>
      
      <p className="text-gray-700 mb-4">{description}</p>
      
      <div className="bg-white p-4 rounded-xl border border-orange-100 mb-4">
        <h4 className="font-bold text-sm text-gray-500 uppercase tracking-wide mb-2">You Need:</h4>
        <ul className="list-disc pl-5 text-gray-800">
            {materials.map((m, i) => <li key={i}>{m}</li>)}
        </ul>
      </div>

      <div className="bg-orange-200 p-4 rounded-xl">
        <h4 className="font-bold text-orange-900">🚀 The Challenge:</h4>
        <p className="text-orange-900">{challenge}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
