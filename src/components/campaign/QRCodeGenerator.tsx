import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../ui/Button';
import { Download, Printer, QrCode } from 'lucide-react';

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
  brandColor = '#059669',
}) => {
  const qrRef = useRef<HTMLDivElement>(null);

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
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={businessName}
              className="w-12 h-12 mx-auto rounded-xl object-contain bg-slate-50 border border-slate-200 p-1 mb-2"
              onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
            />
          ) : (
            <div
              className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-white font-extrabold text-lg shadow-sm mb-2"
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

        {/* QR Code Graphic */}
        <div ref={qrRef} className="p-4 bg-white rounded-2xl border-2 border-slate-100 inline-block shadow-inner">
          <QRCodeSVG
            value={url}
            size={200}
            bgColor="#FFFFFF"
            fgColor="#0f172a"
            level="H"
            includeMargin={true}
          />
        </div>

        <p className="text-[11px] text-slate-400 font-medium">
          Powered by REVORA Customer Review Assistant
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
