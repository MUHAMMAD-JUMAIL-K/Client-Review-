import React from 'react';
import alphaTechLogo from '../../assets/alpha-tech-logo.png';

export const ALPHA_TECH_LOGO_PATH = alphaTechLogo;

export interface AlphaTechIconProps {
  className?: string;
  alt?: string;
}

/**
 * Official Alpha Tech logo image icon
 */
export const AlphaTechIcon: React.FC<AlphaTechIconProps> = ({
  className = "w-10 h-10",
  alt = "Alpha Tech Logo"
}) => (
  <img
    src={alphaTechLogo}
    alt={alt}
    className={`object-contain bg-[#0D333C] p-1 rounded-xl shadow-md shadow-[#0D333C]/20 ${className}`}
  />
);

export interface AlphaTechLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
  className?: string;
}

/**
 * Official Alpha Tech Business Solutions Logo lockup (Image logo + Corporate Text beside it)
 */
export const AlphaTechLogo: React.FC<AlphaTechLogoProps> = ({
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
  className = ''
}) => {
  const iconSizeClass = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }[size];

  const titleSize = {
    sm: 'text-sm font-extrabold tracking-wider',
    md: 'text-lg font-extrabold tracking-wider',
    lg: 'text-xl font-extrabold tracking-wider',
    xl: 'text-3xl font-extrabold tracking-wider'
  }[size];

  const subtitleSize = {
    sm: 'text-[7.5px] tracking-[0.2em]',
    md: 'text-[9.5px] tracking-[0.25em]',
    lg: 'text-[10.5px] tracking-[0.28em]',
    xl: 'text-[13px] tracking-[0.3em]'
  }[size];

  const titleTextColor = variant === 'light' ? 'text-white' : 'text-[#102A30]';
  const subtitleTextColor = variant === 'light' ? 'text-[#C9A84E]' : 'text-[#0D333C]';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Logo Image Icon */}
      <img
        src={alphaTechLogo}
        alt="Alpha Tech Logo"
        className={`${iconSizeClass} object-contain bg-[#0D333C] p-1 rounded-xl shadow-md shadow-[#0D333C]/20 shrink-0 group-hover:scale-105 transition-transform`}
      />

      {/* Brand Text Beside Logo */}
      <div className="flex flex-col justify-center">
        <span className={`${titleSize} ${titleTextColor} leading-none font-sans`}>
          ALPHA TECH
        </span>
        {showSubtitle && (
          <span className={`${subtitleSize} font-bold ${subtitleTextColor} uppercase mt-1 flex items-center gap-1`}>
            <span>BUSINESS SOLUTIONS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84E] inline-block shrink-0" />
          </span>
        )}
      </div>
    </div>
  );
};
