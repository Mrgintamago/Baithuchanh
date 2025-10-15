import React, { useState, useEffect } from 'react';
import PackageSelector from './PackageSelector';
import UserInfoForm from './UserInfoForm';
import PaymentMethod from './PaymentMethod';
import { packagesApi, serversApi, paymentMethodsApi, ordersApi, discountApi } from '../../lib/api';
import { saveOrderToCookies, saveUserInfoToCookies, getUserInfoFromCookies } from '../../lib/cookies';

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
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  
  // Data from API
  const [packages, setPackages] = useState([]);
  const [servers, setServers] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  
  // Loading states
  const [loading, setLoading] = useState({
    packages: false,
    servers: false,
    payments: false,
    discount: false,
    order: false
  });

  // Fetch data từ API khi component mount
  useEffect(() => {
    const fetchData = async () => {
      if (!game?.slug) return;
      
      try {
        // Fetch packages
        setLoading(prev => ({ ...prev, packages: true }));
        const packagesResponse = await packagesApi.getByGameSlug(game.slug);
        setPackages(packagesResponse.data);
        
        // Fetch servers
        setLoading(prev => ({ ...prev, servers: true }));
        const serversResponse = await serversApi.getByGameSlug(game.slug);
        setServers(serversResponse.data);
        
        // Fetch payment methods
        setLoading(prev => ({ ...prev, payments: true }));
        const paymentsResponse = await paymentMethodsApi.getAll();
        setPaymentMethods(paymentsResponse.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to mock data
        setPackages([
          { id: '1', name: '60 Đá Sáng Thế', price: 20000 },
          { id: '2', name: '300 + 30 Đá Sáng Thế', price: 100000 },
          { id: '3', name: '980 + 110 Đá Sáng Thế', price: 300000 },
          { id: '4', name: '1980 + 260 Đá Sáng Thế', price: 650000 },
          { id: '5', name: '3280 + 600 Đá Sáng Thế', price: 1000000 },
          { id: '6', name: '6480 + 1600 Đá Sáng Thế', price: 2000000 },
        ]);
        
        setServers([
          { value: 'asia', name: 'Asia' },
          { value: 'america', name: 'America' },
          { value: 'europe', name: 'Europe' },
          { value: 'tw-hk-mo', name: 'TW, HK, MO' },
        ]);
        
        setPaymentMethods([
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
        ]);
      } finally {
        setLoading({
          packages: false,
          servers: false,
          payments: false,
          discount: false,
          order: false
        });
      }
    };

    fetchData();
  }, [game?.slug]);

  // Auto-fill user info từ cookies khi component mount
  useEffect(() => {
    const savedUserInfo = getUserInfoFromCookies();
    if (savedUserInfo) {
      if (savedUserInfo.email) setEmail(savedUserInfo.email);
      if (savedUserInfo.server) setServer(savedUserInfo.server);
    }
  }, []);

  // Calculate total when package or quantity changes
  useEffect(() => {
    const selectedPkg = packages.find(pkg => pkg.id === selectedPackage);
    if (selectedPkg) {
      const newTotal = selectedPkg.price * quantity;
      setTotal(newTotal);
      setFinalTotal(newTotal - discountAmount);
    } else {
      setTotal(0);
      setFinalTotal(0);
    }
  }, [selectedPackage, quantity, discountAmount]);

  const handleApplyDiscount = async () => {
    if (!discountCode.trim() || total === 0) {
      alert('Vui lòng nhập mã giảm giá và chọn gói nạp!');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, discount: true }));
      const response = await discountApi.validate(discountCode.trim(), total);
      
      setDiscountAmount(response.data.discountAmount);
      setFinalTotal(response.data.newTotal);
      
      alert(`Áp dụng mã giảm giá thành công! ${response.data.description}`);
    } catch (error) {
      console.error('Discount error:', error);
      alert(error.message || 'Mã giảm giá không hợp lệ!');
      setDiscountAmount(0);
      setFinalTotal(total);
    } finally {
      setLoading(prev => ({ ...prev, discount: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!selectedPackage || !uid || !server || !selectedPayment || !email) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    try {
      setLoading(prev => ({ ...prev, order: true }));
      
      const orderData = {
        gameSlug: game.slug,
        packageId: selectedPackage,
        quantity,
        uid,
        server,
        paymentMethod: selectedPayment,
        email,
        discountCode: discountCode.trim() || null
      };

      const response = await ordersApi.create(orderData);
      
      // Lưu order ID và user info vào cookies
      saveOrderToCookies(response.data.orderId);
      saveUserInfoToCookies({ email, server });
      
      alert(`${response.data.message}\nMã đơn hàng: ${response.data.orderId}`);
      
      // Reset form sau khi tạo đơn thành công (giữ lại email và server)
      setSelectedPackage('');
      setQuantity(1);
      setUid('');
      setSelectedPayment('');
      setDiscountCode('');
      setDiscountAmount(0);
      
    } catch (error) {
      console.error('Order error:', error);
      alert(error.message || 'Không thể tạo đơn hàng!');
    } finally {
      setLoading(prev => ({ ...prev, order: false }));
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Game Info */}
      <div className="lg:col-span-5 order-2 lg:order-1">
        <div className="sticky top-24 rounded-md bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-white/20">
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
          <div className="rounded-md bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-white/20">
            <PackageSelector
              packages={packages}
              selectedPackage={selectedPackage}
              onPackageSelect={setSelectedPackage}
              quantity={quantity}
              onQuantityChange={setQuantity}
              loading={loading.packages}
            />
          </div>

          {/* User Info */}
          <div className="rounded-md bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-white/20">
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
              loadingDiscount={loading.discount}
            />
          </div>

          {/* Payment Methods */}
          <div className="rounded-md bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-white/20">
            <div className="flex items-center mb-4">
              <div className="mr-2 h-6 w-6 rounded-full bg-blue-600 text-center text-white text-sm flex items-center justify-center">3</div>
              <span className="font-medium text-gray-900">Phương thức thanh toán</span>
            </div>
            
            {loading.payments ? (
              <div className="text-center py-4">Đang tải phương thức thanh toán...</div>
            ) : (
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
            )}
          </div>

          {/* Submit */}
          <div className="rounded-md bg-white/95 backdrop-blur-sm p-4 shadow-lg border border-white/20">
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-gray-700">Tổng tiền:</span>
                <span className="font-semibold">
                  {total.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
              
              {discountAmount > 0 && (
                <>
                  <div className="flex items-center justify-between text-lg">
                    <span className="text-gray-700">Giảm giá:</span>
                    <span className="font-semibold text-green-600">
                      -{discountAmount.toLocaleString('vi-VN')} VNĐ
                    </span>
                  </div>
                  <hr />
                </>
              )}
              
              <div className="flex items-center justify-between text-xl">
                <span className="font-bold text-gray-900">Thành tiền:</span>
                <span className="text-2xl font-bold text-red-500">
                  {finalTotal.toLocaleString('vi-VN')} VNĐ
                </span>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading.order}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.order ? 'Đang xử lý...' : 'Thanh toán'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GamePurchaseForm;