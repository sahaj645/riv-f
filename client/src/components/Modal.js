import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Stop scrolling
      document.body.style.overflow = "hidden";
    } else {
      // Enable scrolling
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="flex-col justify-center items-center bg-900 text-white p-6 max-w-md w-full rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1>How to fill?</h1>
        <br />
        <ol className="list-decimal list-inside space-y-2 font-light">
          <li>Fill up all the details mentioned.</li>
          <li>All the teammates should fill up the same team name and ID.</li>
          <li>Team size: 3-4 members.</li>
          <li>After filling up all the details, click 'Submit'.</li>
          <li>YAY! You’re registered.</li>
        </ol>
        <center>
          <button
            onClick={onClose}
            className="mt-6 bg-red-700 font-light px-4 py-2 rounded-md transform transition-transform duration-300 hover:bg-red-800 hover:-translate-y-2 text-white"
          >
            Close
          </button>
        </center>
      </div>
    </div>
  );
};

export default Modal;