import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  type?: 'danger' | 'warning' | 'info';
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  type = 'warning'
}) => {
  if (!isOpen) return null;

  const colors = {
    danger: 'bg-red-500/10 text-red-500 border-red-500/20',
    warning: 'bg-irish-orange/10 text-irish-orange border-irish-orange/20',
    info: 'bg-irish-green/10 text-irish-green border-irish-green/20'
  };

  const btnColors = {
    danger: 'bg-red-600 hover:bg-red-500',
    warning: 'bg-irish-orange hover:bg-irish-orange-lt',
    info: 'bg-irish-green hover:bg-irish-green-lt'
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colors[type]}`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 font-serif">{title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8 whitespace-pre-line">
              {message}
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-colors"
              >
                {cancelLabel}
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={`flex-1 py-3 px-4 text-white font-bold rounded-xl transition-colors ${btnColors[type]}`}
              >
                {confirmLabel}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
