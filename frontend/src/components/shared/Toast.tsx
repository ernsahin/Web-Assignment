import { useEffect } from "react";

interface ToastProps {
  show: boolean;
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

function Toast({ show, message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
      <div
        className={`max-w-md rounded-lg border px-4 py-3 shadow-lg ${
          type === "success"
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {type === "success" ? (
              <svg
                className="h-5 w-5 mr-2 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 mr-2 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <span className="text-sm font-medium">{message}</span>
          </div>
          <button
            onClick={onClose}
            className={`ml-3 text-xs hover:opacity-75 ${
              type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;