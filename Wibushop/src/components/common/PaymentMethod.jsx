import React from 'react';

const PaymentMethod = ({ method, isSelected, onSelect }) => {
  const { id, name, logo } = method;
  
  return (
    <div className="col-span-12 sm:col-span-6">
      <label className="block cursor-pointer">
        <input
          value={id}
          type="radio"
          name="method"
          className="peer hidden"
          checked={isSelected}
          onChange={() => onSelect(id)}
        />
        <div className="min-h-[86px] rounded-lg border border-gray-300 p-4 pb-2 transition duration-150 ease-in-out peer-checked:border-blue-700">
          <div className="flex justify-between">
            <img
              src={logo}
              height="32"
              width="132"
              className="aspect-auto h-[32px] object-contain object-left"
              alt={name}
            />
          </div>
          <div className="mt-1">{name}</div>
        </div>
      </label>
    </div>
  );
};

export default PaymentMethod;