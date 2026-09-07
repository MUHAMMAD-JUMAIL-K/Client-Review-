import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../ui/Button';
import { Download, Printer } from 'lucide-react';
import alphaTechLogo from '../../assets/alpha-tech-logo.png';

export interface QRCodeGeneratorProps {
  url: string;
  businessName: string;
  logoUrl?: string;
  brandColor?: string;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  url,
  businessName,
  logoUrl,
  brandColor = '#0D333C',
}) => {
  const qrRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  const isAlphaTech = businessName.toLowerCase().includes('alpha tech');
  const effectiveLogo = (isAlphaTech || !logoUrl || imgError) ? alphaTechLogo : logoUrl;
  const centerLogoSrc = effectiveLogo;

  const handleDownloadPNG = () => {
    const svgElement = qrRef.current?.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 400;
      canvas.height = 400;
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 400, 400);
        ctx.drawImage(img, 20, 20, 360, 360);
      }
      const pngUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${businessName.toLowerCase().replace(/\s+/g, '-')}-qr-code.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Printable Area */}
      <div className="print-qr-area bg-white border border-slate-200/80 rounded-3xl p-6 text-center space-y-4 shadow-sm">
        <div className="space-y-1">
          {effectiveLogo ? (
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0D333C] p-1.5 shadow-md flex items-center justify-center border border-[#C9A84E]/30 overflow-hidden mb-2">
              <img
                src={effectiveLogo}
                alt={businessName}
                className="w-full h-full object-contain rounded-xl"
                onError={() => setImgError(true)}
              />
            </div>
          ) : (
            <div
              className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-sm mb-2"
              style={{ backgroundColor: brandColor }}
            >
              {businessName.substring(0, 2).toUpperCase()}
            </div>
          )}
          <h4 className="font-extrabold text-slate-900 text-lg">{businessName}</h4>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Scan to share your experience
          </p>
        </div>

        {/* QR Code Graphic with Centered Logo */}
        <div ref={qrRef} className="p-4 bg-white rounded-2xl border-2 border-slate-100 inline-block shadow-inner">
          <QRCodeSVG
            value={url}
            size={220}
            bgColor="#FFFFFF"
            fgColor="#0D333C"
            level="H"
            includeMargin={true}
            imageSettings={
              centerLogoSrc
                ? {
                    src: centerLogoSrc,
                    x: undefined,
                    y: undefined,
                    height: 46,
                    width: 46,
                    excavate: true,
                  }
                : undefined
            }
          />
        </div>

        <p className="text-[11px] text-slate-400 font-medium">
          Powered by Alpha Tech Review Assistant
        </p>
      </div>

      {/* Action Controls */}
      <div className="no-print flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button
          variant="outline"
          onClick={handleDownloadPNG}
          leftIcon={<Download className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          Download PNG
        </Button>
        <Button
          variant="secondary"
          onClick={handlePrint}
          leftIcon={<Printer className="w-4 h-4" />}
          className="w-full sm:w-auto"
        >
          Print QR Display
        </Button>
      </div>
    </div>
  );
};
