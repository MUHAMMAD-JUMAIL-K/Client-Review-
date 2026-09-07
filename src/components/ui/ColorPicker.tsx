import React from 'react';
import { ColorPreset } from '../../types/campaign';
import { Check } from 'lucide-react';

export const COLOR_PRESETS: ColorPreset[] = [
  {
    name: 'Deep Teal & Gold',
    hex: '#0D333C',
    swatches: ['#0D333C', '#164954', '#C9A84E', '#102A30'],
    primaryClass: 'bg-[#0D333C]',
    borderClass: 'border-[#0D333C]',
  },
  {
    name: 'Ocean Blue',
    hex: '#2563eb',
    swatches: ['#2563eb', '#0f172a', '#1e293b', '#334155'],
    primaryClass: 'bg-blue-600',
    borderClass: 'border-blue-600',
  },
  {
    name: 'Royal Purple',
    hex: '#7c3aed',
    swatches: ['#7c3aed', '#0f172a', '#1e293b', '#334155'],
    primaryClass: 'bg-purple-600',
    borderClass: 'border-purple-600',
  },
  {
    name: 'Sunset Orange',
    hex: '#ea580c',
    swatches: ['#ea580c', '#0f172a', '#1e293b', '#334155'],
    primaryClass: 'bg-orange-600',
    borderClass: 'border-orange-600',
  },
];

export interface ColorPickerProps {
  selectedColor: string;
  onChange: (hex: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
          Predefined Theme Presets
        </label>
        <p className="text-xs text-slate-500 mb-3">
          Select a preset color theme for your customer review experience.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {COLOR_PRESETS.map((preset) => {
          const isSelected = selectedColor.toLowerCase() === preset.hex.toLowerCase();
          return (
            <button
              key={preset.name}
              type="button"
              onClick={() => onChange(preset.hex)}
              className={`relative text-left p-3.5 rounded-2xl bg-slate-900 border-2 transition-all hover:scale-[1.02] ${
                isSelected
                  ? 'border-blue-500 ring-2 ring-blue-500/30 shadow-lg'
                  : 'border-slate-800 hover:border-slate-700 opacity-90'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-white truncate">{preset.name}</span>
                {isSelected && <Check className="w-4 h-4 text-blue-400 shrink-0" />}
              </div>

              {/* 4-Color Swatch Dots */}
              <div className="flex items-center gap-1.5">
                {preset.swatches.map((color, i) => (
                  <span
                    key={i}
                    className="w-3.5 h-3.5 rounded-full border border-white/10"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Hex Color input */}
      <div className="pt-2 flex items-center justify-between border-t border-slate-100">
        <span className="text-xs font-semibold text-slate-600">Custom Hex Code</span>
        <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-1 bg-white">
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => onChange(e.target.value)}
            className="w-7 h-7 rounded-lg cursor-pointer border-0 bg-transparent p-0"
            title="Choose custom color"
          />
          <input
            type="text"
            value={selectedColor}
            onChange={(e) => onChange(e.target.value)}
            className="w-20 text-xs font-mono font-semibold uppercase text-slate-700 bg-transparent outline-none"
            maxLength={7}
            placeholder="#2563eb"
          />
        </div>
      </div>
    </div>
  );
};

