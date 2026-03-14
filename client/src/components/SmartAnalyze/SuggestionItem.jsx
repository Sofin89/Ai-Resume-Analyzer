import React from 'react';
import { InfoIcon } from './Icons';

export const SuggestionItem = ({ suggestion }) => {
  const replaceWithMatch = suggestion.match(/Replace '(.+?)' with '(.+?)'/i);
  if (replaceWithMatch) {
    const before = replaceWithMatch[1];
    const after = replaceWithMatch[2];
    return (
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="flex items-start text-sm text-red-600">
          <span className="font-mono bg-red-100 p-1 rounded mr-2">-</span>
          <span className="line-through">{`'${before}'`}</span>
        </div>
        <div className="flex items-start text-sm text-green-700 mt-2">
          <span className="font-mono bg-green-100 p-1 rounded mr-2">+</span>
          <span>{`'${after}'`}</span>
        </div>
      </div>
    );
  }
  if (suggestion.includes("→")) {
    const parts = suggestion.split("→");
    const before = parts[0].replace("Replace", "").trim();
    const after = parts[1].trim();

    return (
      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
        <div className="flex items-center text-sm text-red-600">
          <span className="font-mono bg-red-100 p-1 rounded mr-2">-</span>
          <span className="line-through">{before}</span>
        </div>
        <div className="flex items-center text-sm text-green-700 mt-2">
          <span className="font-mono bg-green-100 p-1 rounded mr-2">+</span>
          <span>{after}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start text-slate-600">
      <InfoIcon />
      <span>{suggestion}</span>
    </div>
  );
};

