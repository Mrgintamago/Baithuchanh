import React from 'react';

const PaymentMethod = ({ method, isSelected, onSelect }) => {
  return (
    <div 
      className={`payment-method cursor-pointer rounded-lg border p-4 transition-all duration-200 hover:border-blue-300 ${
        isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-300'
      }`}
      onClick={() => onSelect(method.id)}
    >
      <label className="flex cursor-pointer items-center">
        <input
          type="radio"
          name="payment_method"
          value={method.id}
          checked={isSelected}
          onChange={() => onSelect(method.id)}
          className="peer sr-only"
        />
        <div className="relative mr-3">
          <div className={`h-5 w-5 rounded-full border-2 ${isSelected ? 'border-blue-600' : 'border-gray-300'}`}></div>
          <div className={`absolute inset-0 m-0.5 rounded-full bg-blue-600 ${isSelected ? 'opacity-100' : 'opacity-0'}`}></div>
        </div>
        <div className="flex items-center space-x-3">
          <img 
            src={method.logo}
            alt={method.name}
            className="h-8 w-auto"
          />
          <span className="font-medium text-gray-900">{method.name}</span>
        </div>
      </label>
    </div>
  );
};

export default PaymentMethod;