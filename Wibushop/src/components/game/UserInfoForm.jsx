import React from 'react';

const UserInfoForm = ({ 
  uid, 
  setUid, 
  server, 
  setServer, 
  servers, 
  email, 
  setEmail,
  discountCode,
  setDiscountCode,
  onApplyDiscount 
}) => {
  return (
    <div>
      {/* Thông tin nạp */}
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <div className="mr-2 h-6 w-6 rounded-full bg-blue-600 text-center text-white text-sm flex items-center justify-center">2</div>
          <span className="font-medium text-gray-900">Thông tin nạp</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="uid" className="mb-2 block text-sm font-medium text-gray-900">
              UID
            </label>
            <input
              type="number"
              id="uid"
              name="UID"
              value={uid}
              placeholder="Nhập UID của bạn"
              className="w-full rounded-lg border border-gray-300 p-2 px-3 outline-none transition duration-150 ease-in-out focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
              onChange={(e) => setUid(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="server" className="mb-2 block text-sm font-medium text-gray-900">
              Server
            </label>
            <select
              id="server"
              name="server"
              value={server}
              className="h-[42px] w-full rounded-lg border border-gray-300 p-2 px-3 outline-none transition duration-150 ease-in-out focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
              onChange={(e) => setServer(e.target.value)}
              required
            >
              <option value="" className="text-gray-500">Chọn server</option>
              {servers.map((srv) => (
                <option key={srv.value} value={srv.value}>
                  {srv.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Email */}
      <div className="mb-6">
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
          Email để nhận hóa đơn
        </label>
        <input
          type="email"
          name="email"
          value={email}
          placeholder="Nhập email của bạn"
          className="w-full rounded-lg border border-gray-300 p-2 px-3 outline-none transition duration-150 ease-in-out focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Mã giảm giá */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-900">
          Mã giảm giá (tùy chọn)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="discount"
            value={discountCode}
            placeholder="Nhập mã giảm giá"
            className="flex-1 rounded-lg border border-gray-300 p-2 px-3 outline-none transition duration-150 ease-in-out focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900"
            onChange={(e) => setDiscountCode(e.target.value)}
          />
          <button
            type="button"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-150 ease-in-out hover:bg-blue-700"
            onClick={onApplyDiscount}
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoForm;