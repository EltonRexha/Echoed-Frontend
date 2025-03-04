import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
  title?: string;
}

function Modal({ isOpen, close, children, title }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Handle escape key press
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, close]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            ref={modalRef}
            className="relative mx-auto max-w-md w-full max-h-[90vh] overflow-auto bg-light-background dark:bg-dark-background rounded-lg shadow-xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{
              duration: 0.5,
            }}
          >
            <motion.button
              className="absolute top-4 right-4 rounded-full cursor-pointer p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={close}
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </motion.button>

            {title && (
              <motion.div
                className="px-6 pt-6 pb-0"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2
                  id="modal-title"
                  className="text-lg font-medium text-gray-900 dark:text-gray-100"
                >
                  {title}
                </h2>
              </motion.div>
            )}

            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('modal-portal') || document.body
  );
}

export default Modal;
