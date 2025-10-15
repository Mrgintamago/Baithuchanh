// API utility functions cho Wibushop

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://yourdomain.com' 
  : 'http://localhost:3000';

// Utility function để gọi API
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API call failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Games API
export const gamesApi = {
  // Lấy danh sách tất cả games
  getAll: () => apiCall('/games'),
  
  // Lấy thông tin chi tiết game theo slug
  getBySlug: (slug) => apiCall(`/games/${slug}`),
};

// Packages API
export const packagesApi = {
  // Lấy danh sách packages theo game slug
  getByGameSlug: (slug) => apiCall(`/packages/${slug}`),
};

// Servers API
export const serversApi = {
  // Lấy danh sách servers theo game slug
  getByGameSlug: (slug) => apiCall(`/servers/${slug}`),
};

// Payment Methods API
export const paymentMethodsApi = {
  // Lấy danh sách phương thức thanh toán
  getAll: () => apiCall('/payment-methods'),
};

// Orders API
export const ordersApi = {
  // Tạo đơn hàng mới
  create: (orderData) => apiCall('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  // Lấy đơn hàng theo ID
  getById: (orderId) => apiCall(`/orders/${orderId}`),
  
  // Lấy đơn hàng theo email
  getByEmail: (email) => apiCall(`/orders?email=${encodeURIComponent(email)}`),
  
  // Lấy tất cả đơn hàng (admin)
  getAll: () => apiCall('/orders'),
};

// Discount API
export const discountApi = {
  // Kiểm tra mã giảm giá
  validate: (code, total) => apiCall('/discount/validate', {
    method: 'POST',
    body: JSON.stringify({ code, total }),
  }),
};

// Export default object với tất cả APIs
export default {
  games: gamesApi,
  packages: packagesApi,
  servers: serversApi,
  paymentMethods: paymentMethodsApi,
  orders: ordersApi,
  discount: discountApi,
};