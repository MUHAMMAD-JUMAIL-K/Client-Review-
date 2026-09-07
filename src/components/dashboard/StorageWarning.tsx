import React from 'react';
import { Info, HardDrive } from 'lucide-react';

export const StorageWarning: React.FC = () => {
  return (
    <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl text-xs text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
          <HardDrive className="w-4 h-4" />
        </div>
        <div>
          <p className="font-bold">Static Version Notice</p>
          <p className="text-emerald-800 text-[11px]">
            Campaigns created in this browser are stored locally in your device's local storage.
          </p>
        </div>
      </div>
      <span className="text-[10px] font-mono font-semibold uppercase bg-emerald-100/90 text-emerald-800 px-2.5 py-1 rounded-lg shrink-0">
        localStorage (alphatech_campaigns)
      </span>
    </div>
  );
};
