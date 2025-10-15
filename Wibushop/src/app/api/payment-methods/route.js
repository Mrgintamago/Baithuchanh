import { NextResponse } from 'next/server';

// Mock data cho payment methods
const paymentMethods = [
  {
    id: 'bidv',
    name: 'Thanh toán qua BIDV',
    logo: '/icons/Logo_BIDV.svg',
    enabled: true
  },
  {
    id: 'acb',
    name: 'Thanh toán qua ACB',
    logo: '/icons/Asia_Commercial_Bank_logo.svg',
    enabled: true
  }
];

// GET /api/payment-methods - Lấy danh sách phương thức thanh toán
export async function GET() {
  try {
    const enabledMethods = paymentMethods.filter(method => method.enabled);
    
    return NextResponse.json({
      success: true,
      data: enabledMethods
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy danh sách phương thức thanh toán' 
      },
      { status: 500 }
    );
  }
}