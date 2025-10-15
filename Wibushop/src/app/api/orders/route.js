import { NextResponse } from 'next/server';

// Giả lập database cho orders - sử dụng global để chia sẻ giữa các routes
global.orders = global.orders || [];
global.orderIdCounter = global.orderIdCounter || 1;

// POST /api/orders - Tạo đơn hàng mới
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validation
    const { gameSlug, packageId, quantity, uid, server, paymentMethod, email, discountCode } = body;
    
    if (!gameSlug || !packageId || !quantity || !uid || !server || !paymentMethod || !email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Thiếu thông tin bắt buộc' 
        },
        { status: 400 }
      );
    }

    // Tạo order mới
    const newOrder = {
      id: global.orderIdCounter++,
      gameSlug,
      packageId,
      quantity: parseInt(quantity),
      uid,
      server,
      paymentMethod,
      email,
      discountCode: discountCode || null,
      status: 'pending', 
      total: 0, 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Mock tính toán giá 
    const packagePrices = {
      '1': 20000,
      '2': 100000,
      '3': 300000,
      '4': 650000,
      '5': 1000000,
      '6': 2000000,
    };
    
    newOrder.total = (packagePrices[packageId] || 0) * newOrder.quantity;

    // Lưu order vào global array
    global.orders.push(newOrder);

    return NextResponse.json({
      success: true,
      data: {
        orderId: newOrder.id,
        total: newOrder.total,
        status: newOrder.status,
        message: 'Đơn hàng đã được tạo thành công!'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể tạo đơn hàng' 
      },
      { status: 500 }
    );
  }
}

// GET /api/orders - Lấy danh sách đơn hàng (có thể filter bằng email)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    let filteredOrders = global.orders;
    
    if (email) {
      filteredOrders = global.orders.filter(order => order.email === email);
    }
    
    return NextResponse.json({
      success: true,
      data: filteredOrders
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy danh sách đơn hàng' 
      },
      { status: 500 }
    );
  }
}