import React from "react";

export default function SuccessModal({ isOpen, onClose, userName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Obrigado {userName}!
        </h2>
        <p className="text-gray-600 mt-2">
          Sua compra foi finalizada com sucesso!
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-[#6651F0] text-white font-medium py-2 rounded-lg hover:bg-[#5740e0] transition-all"
        >
          Ir para loja
        </button>
      </div>
    </div>
  );
}
