import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl p-4 w-80">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-700">How can we assist you?</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
