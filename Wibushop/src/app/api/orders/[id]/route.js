import { NextResponse } from 'next/server';

// Import orders data từ main orders route (trong thực tế sẽ dùng database)
// Tạm thời sử dụng global variable để test
global.orders = global.orders || [];

// GET /api/orders/[id] - Lấy thông tin đơn hàng theo ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const orderId = parseInt(id);
    
    // Tìm order theo ID
    const order = global.orders.find(order => order.id === orderId);
    
    if (!order) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Đơn hàng không tồn tại' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy thông tin đơn hàng' 
      },
      { status: 500 }
    );
  }
}