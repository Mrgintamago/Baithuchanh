"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { ordersApi } from '../../lib/api';
import { getOrdersFromCookies, removeOrderFromCookies, clearAllOrdersFromCookies } from '../../lib/cookies';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders từ cookies khi component mount
  useEffect(() => {
    const fetchOrdersFromCookies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const orderIds = getOrdersFromCookies();
        
        if (orderIds.length === 0) {
          setOrders([]);
          return;
        }

        // Fetch thông tin chi tiết từng đơn hàng
        const orderPromises = orderIds.map(async (orderId) => {
          try {
            const response = await ordersApi.getById(orderId);
            return response.data;
          } catch (err) {
            console.error(`Error fetching order ${orderId}:`, err);
            // Xóa order ID không hợp lệ khỏi cookies
            removeOrderFromCookies(orderId);
            return null;
          }
        });

        const orderResults = await Promise.all(orderPromises);
        const validOrders = orderResults.filter(order => order !== null);
        
        setOrders(validOrders);
      } catch (err) {
        setError('Không thể tải danh sách đơn hàng');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersFromCookies();
  }, []);

  const handleClearAllOrders = () => {
    if (confirm('Bạn có chắc muốn xóa tất cả đơn hàng khỏi danh sách?')) {
      clearAllOrdersFromCookies();
      setOrders([]);
    }
  };

  const handleRemoveOrder = (orderId) => {
    if (confirm('Bạn có chắc muốn xóa đơn hàng này khỏi danh sách?')) {
      removeOrderFromCookies(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'processing': return 'Đang xử lý';
      case 'failed': return 'Thất bại';
      default: return 'Chờ xử lý';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main 
        className="flex-1"
        style={{
          background: 'url(/assets/background.png)',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <div className="game-detail">
          <div className="relative z-20">
            <div className="container relative px-4 pb-8 pt-10 md:px-0 z-20">
              <div className="rounded-lg bg-white/95 backdrop-blur-sm p-6 shadow-lg border border-white/20">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Đơn hàng của bạn</h1>
                  {orders.length > 0 && (
                    <button
                      onClick={handleClearAllOrders}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Xóa tất cả
                    </button>
                  )}
                </div>

                {/* Loading State */}
                {loading && (
                  <div className="text-center py-8">
                    <div className="text-gray-600">Đang tải đơn hàng...</div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                  </div>
                )}

                {/* Empty State */}
                {!loading && !error && orders.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-500 mb-4">
                      <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Chưa có đơn hàng nào</h3>
                    <p className="text-gray-500 mb-4">Bạn chưa tạo đơn hàng nào. Hãy mua game để xem đơn hàng ở đây!</p>
                    <a 
                      href="/"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Đi mua game
                    </a>
                  </div>
                )}

                {/* Orders List */}
                {!loading && !error && orders.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                      {orders.length} đơn hàng gần nhất
                    </h2>
                    
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-300 rounded-lg p-5 relative bg-white shadow-sm">
                        <button
                          onClick={() => handleRemoveOrder(order.id)}
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-gray-100"
                          title="Xóa khỏi danh sách"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                        
                        <div className="flex justify-between items-start mb-4 pr-10">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              Đơn hàng #{order.id}
                            </h3>
                            <p className="text-base text-gray-700 font-medium">
                              {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                            {getStatusText(order.status)}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
                          <div className="space-y-2">
                            <p className="text-gray-800"><span className="font-semibold text-gray-900">Game:</span> <span className="text-blue-600 font-medium">{order.gameSlug}</span></p>
                            <p className="text-gray-800"><span className="font-semibold text-gray-900">UID:</span> <span className="font-mono text-gray-900">{order.uid}</span></p>
                            <p className="text-gray-800"><span className="font-semibold text-gray-900">Server:</span> <span className="text-gray-900 font-medium">{order.server}</span></p>
                            <p className="text-gray-800"><span className="font-semibold text-gray-900">Email:</span> <span className="text-gray-900">{order.email}</span></p>
                          </div>
                          <div className="space-y-2">
                            <p className="text-gray-800"><span className="font-semibold text-gray-900">Gói nạp:</span> <span className="text-gray-900 font-medium">Package #{order.packageId}</span></p>
                            <p className="text-gray-800"><span className="font-semibold text-gray-900">Số lượng:</span> <span className="text-gray-900 font-bold">{order.quantity}</span></p>
                            <p className="text-gray-800"><span className="font-semibold text-gray-900">Thanh toán:</span> <span className="text-gray-900 font-medium">{order.paymentMethod}</span></p>
                            <p className="text-gray-800"><span className="font-semibold text-gray-900">Tổng tiền:</span> <span className="text-red-600 font-bold text-lg">{order.total.toLocaleString('vi-VN')} VNĐ</span></p>
                          </div>
                        </div>

                        {order.discountCode && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-base"><span className="font-semibold text-green-800">Mã giảm giá:</span> <span className="text-green-700 font-medium">{order.discountCode}</span></p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}