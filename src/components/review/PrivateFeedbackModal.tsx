import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Mail, Send, Info } from 'lucide-react';

export interface PrivateFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
}

export const PrivateFeedbackModal: React.FC<PrivateFeedbackModalProps> = ({
  isOpen,
  onClose,
  businessName,
}) => {
  const [feedbackText, setFeedbackText] = useState('');

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const subject = encodeURIComponent(`Private Feedback for ${businessName}`);
    const body = encodeURIComponent(`Private Feedback:\n\n${feedbackText.trim()}`);
    
    // Open native mailto
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Additional Feedback"
      maxWidth="sm"
    >
      <form onSubmit={handleSendFeedback} className="space-y-4 text-left">
        <p className="text-xs text-slate-600 leading-relaxed">
          Would you like to send a direct, private message to management at <strong>{businessName}</strong>?
        </p>

        <textarea
          rows={4}
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Share any additional comments, suggestions, or private feedback..."
          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-600 resize-none"
        />

        <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong>Notice:</strong> Tapping "Send Private Email" will open your device's native email application.
          </span>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={!feedbackText.trim()}
            leftIcon={<Mail className="w-3.5 h-3.5" />}
          >
            Send Private Email
          </Button>
        </div>
      </form>
    </Modal>
  );
};
