import { NextResponse } from 'next/server';

// Mock data cho discount codes
const discountCodes = {
  'NEWUSER': { discount: 10, type: 'percentage', description: 'Giảm 10% cho người dùng mới' },
  'SAVE20': { discount: 20000, type: 'fixed', description: 'Giảm 20,000 VNĐ' },
  'VIP10': { discount: 15, type: 'percentage', description: 'Giảm 15% cho VIP' }
};

// POST /api/discount/validate - Kiểm tra mã giảm giá
export async function POST(request) {
  try {
    const { code, total } = await request.json();
    
    if (!code) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Vui lòng nhập mã giảm giá' 
        },
        { status: 400 }
      );
    }

    const discount = discountCodes[code.toUpperCase()];
    
    if (!discount) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Mã giảm giá không hợp lệ' 
        },
        { status: 404 }
      );
    }

    let discountAmount = 0;
    if (discount.type === 'percentage') {
      discountAmount = Math.floor((total * discount.discount) / 100);
    } else {
      discountAmount = discount.discount;
    }

    // Đảm bảo không giảm quá số tiền gốc
    discountAmount = Math.min(discountAmount, total);

    return NextResponse.json({
      success: true,
      data: {
        code: code.toUpperCase(),
        discountAmount,
        newTotal: total - discountAmount,
        description: discount.description
      }
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể kiểm tra mã giảm giá' 
      },
      { status: 500 }
    );
  }
}