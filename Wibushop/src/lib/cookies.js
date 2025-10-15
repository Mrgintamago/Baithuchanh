// Cookie utility functions cho Wibushop

// Lưu order ID vào cookies
export function saveOrderToCookies(orderId) {
  if (typeof window === 'undefined') return;
  
  // Lấy danh sách order IDs hiện tại
  const existingOrders = getOrdersFromCookies();
  
  // Thêm order mới vào đầu danh sách
  const updatedOrders = [orderId, ...existingOrders];
  
  // Giới hạn chỉ lưu 10 đơn hàng gần nhất
  const limitedOrders = updatedOrders.slice(0, 10);
  
  // Lưu vào cookies với thời hạn 30 ngày
  const expires = new Date();
  expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
  
  document.cookie = `user_orders=${JSON.stringify(limitedOrders)}; expires=${expires.toUTCString()}; path=/`;
}

// Lấy danh sách order IDs từ cookies
export function getOrdersFromCookies() {
  if (typeof window === 'undefined') return [];
  
  const cookies = document.cookie.split(';');
  const orderCookie = cookies.find(cookie => cookie.trim().startsWith('user_orders='));
  
  if (!orderCookie) return [];
  
  try {
    const ordersJson = orderCookie.split('=')[1];
    return JSON.parse(decodeURIComponent(ordersJson));
  } catch (error) {
    console.error('Error parsing orders from cookies:', error);
    return [];
  }
}

// Xóa order khỏi cookies
export function removeOrderFromCookies(orderId) {
  if (typeof window === 'undefined') return;
  
  const existingOrders = getOrdersFromCookies();
  const updatedOrders = existingOrders.filter(id => id !== orderId);
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
  
  document.cookie = `user_orders=${JSON.stringify(updatedOrders)}; expires=${expires.toUTCString()}; path=/`;
}

// Xóa tất cả orders khỏi cookies
export function clearAllOrdersFromCookies() {
  if (typeof window === 'undefined') return;
  
  document.cookie = 'user_orders=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// Lưu thông tin user gần nhất
export function saveUserInfoToCookies(userInfo) {
  if (typeof window === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000));
  
  // Chỉ lưu email và server gần nhất để auto-fill
  const userdata = {
    email: userInfo.email,
    server: userInfo.server
  };
  
  document.cookie = `user_info=${JSON.stringify(userdata)}; expires=${expires.toUTCString()}; path=/`;
}

// Lấy thông tin user từ cookies
export function getUserInfoFromCookies() {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const userCookie = cookies.find(cookie => cookie.trim().startsWith('user_info='));
  
  if (!userCookie) return null;
  
  try {
    const userJson = userCookie.split('=')[1];
    return JSON.parse(decodeURIComponent(userJson));
  } catch (error) {
    console.error('Error parsing user info from cookies:', error);
    return null;
  }
}