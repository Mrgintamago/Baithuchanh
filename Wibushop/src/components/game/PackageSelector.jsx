import React from 'react';

const PackageSelector = ({ packages, selectedPackage, onPackageSelect, quantity, onQuantityChange }) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="mr-2 h-6 w-6 rounded-full bg-blue-600 text-center text-white text-sm flex items-center justify-center">1</div>
        <span className="font-medium text-gray-900">Chọn gói nạp</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {packages.map((pkg, index) => (
          <label 
            key={pkg.id} 
            className="block"
          >
            <input
              value={pkg.id}
              type="radio"
              name="pack"
              className="peer hidden"
              checked={selectedPackage === pkg.id}
              onChange={() => onPackageSelect(pkg.id)}
            />
            <div className="flex cursor-pointer justify-between overflow-hidden rounded-lg border shadow-sm transition duration-150 ease-in-out peer-checked:border-blue-600 peer-checked:bg-blue-50">
              <div className="p-3 flex-1">
                <div className="text-left text-base font-medium text-gray-900">
                  {pkg.name}
                </div>
              </div>
              <div className="bg-slate-100 p-3 text-end min-w-[120px]">
                <div className="text-xs text-gray-600">Giá</div>
                <div className="text-base font-bold text-red-500">
                  {pkg.price.toLocaleString('vi-VN')} VNĐ
                </div>
              </div>
            </div>
          </label>
        ))}
      </div>
        
      <div className="mt-4">
        <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-gray-700">
          Số lượng
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          value={quantity}
          placeholder="Nhập số lượng"
          className="w-full rounded-lg border border-gray-300 p-2 px-3 outline-none transition duration-150 ease-in-out focus:border-gray-400"
          onChange={(e) => onQuantityChange(parseInt(e.target.value) || 1)}
        />
      </div>
    </div>
  );
};

export default PackageSelector;