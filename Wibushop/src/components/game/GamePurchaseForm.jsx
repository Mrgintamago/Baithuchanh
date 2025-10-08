import React, { useState, useEffect } from 'react';
import PackageSelector from './PackageSelector';
import UserInfoForm from './UserInfoForm';
import PaymentMethod from './PaymentMethod';

const GamePurchaseForm = ({ game }) => {
  // States
  const [selectedPackage, setSelectedPackage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [uid, setUid] = useState('');
  const [server, setServer] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [email, setEmail] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [total, setTotal] = useState(0);

  // Mock data - trong thực tế sẽ lấy từ API
  const packages = [
    { id: '1', name: '60 Đá Sáng Thế', price: 20000 },
    { id: '2', name: '300 + 30 Đá Sáng Thế', price: 100000 },
    { id: '3', name: '980 + 110 Đá Sáng Thế', price: 300000 },
    { id: '4', name: '1980 + 260 Đá Sáng Thế', price: 650000 },
    { id: '5', name: '3280 + 600 Đá Sáng Thế', price: 1000000 },
    { id: '6', name: '6480 + 1600 Đá Sáng Thế', price: 2000000 },
  ];

  const servers = [
    { value: 'asia', name: 'Asia' },
    { value: 'america', name: 'America' },
    { value: 'europe', name: 'Europe' },
    { value: 'tw-hk-mo', name: 'TW, HK, MO' },
  ];

  const paymentMethods = [
    {
      id: 'bidv',
      name: 'Thanh toán qua BIDV',
      logo: '/icons/Logo_BIDV.svg'
    },
    {
      id: 'acb',
      name: 'Thanh toán qua ACB',
      logo: '/icons/Asia_Commercial_Bank_logo.svg'
    }
  ];

  // Calculate total when package or quantity changes
  useEffect(() => {
    const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);
    if (selectedPkg) {
      setTotal(selectedPkg.price * quantity);
    } else {
      setTotal(0);
    }
  }, [selectedPackage, quantity]);

  const handleApplyDiscount = () => {
    // Logic xử lý mã giảm giá
    if (discountCode.trim()) {
      alert('Mã giảm giá đã được áp dụng!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!selectedPackage || !uid || !server || !selectedPayment || !email) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    // Tạo object đơn hàng
    const orderData = {
      game: game.slug,
      package: selectedPackage,
      quantity,
      uid,
      server,
      paymentMethod: selectedPayment,
      email,
      discountCode,
      total
    };

    console.log('Order Data:', orderData);
    alert('Đơn hàng đã được tạo thành công!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Game Info */}
      <div className="lg:col-span-5 order-2 lg:order-1">
        <div className="sticky top-24 rounded-md bg-white p-4 shadow-sm">
          <img
            src={game.banner}
            alt={game.name}
            width="459"
            height="258"
            className="w-full rounded-md object-cover h-48"
          />
          <h1 className="my-2 text-2xl font-semibold text-gray-900">{game.name}</h1>
          <div 
            className="prose prose-sm max-w-none text-gray-800"
            style={{
              color: '#1f2937',
            }}
            dangerouslySetInnerHTML={{ __html: game.description }}
          />
        </div>
      </div>

      {/* Purchase Form */}
      <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Package Selection */}
          <div className="rounded-md bg-white p-4 shadow-sm">
            <PackageSelector
              packages={packages}
              selectedPackage={selectedPackage}
              onPackageSelect={setSelectedPackage}
              quantity={quantity}
              onQuantityChange={setQuantity}
            />
          </div>

          {/* User Info */}
          <div className="rounded-md bg-white p-4 shadow-sm">
            <UserInfoForm
              uid={uid}
              setUid={setUid}
              server={server}
              setServer={setServer}
              servers={servers}
              email={email}
              setEmail={setEmail}
              discountCode={discountCode}
              setDiscountCode={setDiscountCode}
              onApplyDiscount={handleApplyDiscount}
            />
          </div>

          {/* Payment Methods */}
          <div className="rounded-md bg-white p-4 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="mr-2 h-6 w-6 rounded-full bg-blue-600 text-center text-white text-sm flex items-center justify-center">3</div>
              <span className="font-medium text-gray-900">Phương thức thanh toán</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {paymentMethods.map((method) => (
                <PaymentMethod
                  key={method.id}
                  method={method}
                  isSelected={selectedPayment === method.id}
                  onSelect={setSelectedPayment}
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="rounded-md bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-red-500">
                {total.toLocaleString('vi-VN')} VNĐ
              </span>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GamePurchaseForm;