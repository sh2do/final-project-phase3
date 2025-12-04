import React from 'react';

const Alert = ({ message, type = 'error', onClose }) => {
  let bgColor, borderColor, textColor;

  switch (type) {
    case 'error':
      bgColor = 'bg-red-100';
      borderColor = 'border-red-400';
      textColor = 'text-red-700';
      break;
    case 'success':
      bgColor = 'bg-green-100';
      borderColor = 'border-green-400';
      textColor = 'text-green-700';
      break;
    case 'info':
      bgColor = 'bg-blue-100';
      borderColor = 'border-blue-400';
      textColor = 'text-blue-700';
      break;
    default:
      bgColor = 'bg-gray-100';
      borderColor = 'border-gray-400';
      textColor = 'text-gray-700';
  }

  return (
    <div
      className={`relative ${bgColor} border ${borderColor} ${textColor} px-4 py-3 rounded-md flex items-center justify-between shadow-md`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 flex-shrink-0 text-current hover:text-opacity-75 focus:outline-none"
        >
          <svg className="h-5 w-5" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;
