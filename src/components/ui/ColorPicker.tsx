import React from 'react';
import { ColorPreset } from '../../types/campaign';
import { Check } from 'lucide-react';

export const COLOR_PRESETS: ColorPreset[] = [
  { name: 'Emerald', hex: '#059669', primaryClass: 'bg-emerald-600', borderClass: 'border-emerald-600' },
  { name: 'Blue', hex: '#2563eb', primaryClass: 'bg-blue-600', borderClass: 'border-blue-600' },
  { name: 'Purple', hex: '#7c3aed', primaryClass: 'bg-purple-600', borderClass: 'border-purple-600' },
  { name: 'Orange', hex: '#ea580c', primaryClass: 'bg-orange-600', borderClass: 'border-orange-600' },
  { name: 'Rose', hex: '#e11d48', primaryClass: 'bg-rose-600', borderClass: 'border-rose-600' },
];

export interface ColorPickerProps {
  selectedColor: string;
  onChange: (hex: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onChange }) => {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
        Brand Color Theme
      </label>

      <div className="flex flex-wrap items-center gap-3">
        {COLOR_PRESETS.map((preset) => {
          const isSelected = selectedColor.toLowerCase() === preset.hex.toLowerCase();
          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => onChange(preset.hex)}
              className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-all ${preset.primaryClass} ${
                isSelected ? 'ring-4 ring-offset-2 ring-slate-400 scale-105' : 'hover:scale-105 opacity-90'
              }`}
              title={preset.name}
            >
              {isSelected && <Check className="w-5 h-5 text-white stroke-[3]" />}
            </button>
          );
        })}

        {/* Custom Hex Color input */}
        <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1 bg-white ml-2">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent p-0"
            title="Choose custom color"
          />
          <input
            type="text"
            value={selectedColor}
            onChange={(e) => onChange(e.target.value)}
            className="w-20 text-xs font-mono font-semibold uppercase text-slate-700 bg-transparent outline-none"
            maxLength={7}
            placeholder="#059669"
          />
        </div>
      </div>
    </div>
  );
};
