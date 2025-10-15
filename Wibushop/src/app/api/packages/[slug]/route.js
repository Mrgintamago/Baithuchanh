import { NextResponse } from 'next/server';

// Mock data cho packages
const packages = {
  'genshin-impact': [
    { id: '1', name: '60 Đá Sáng Thế', price: 20000, originalPrice: 25000 },
    { id: '2', name: '300 + 30 Đá Sáng Thế', price: 100000, originalPrice: 125000 },
    { id: '3', name: '980 + 110 Đá Sáng Thế', price: 300000, originalPrice: 375000 },
    { id: '4', name: '1980 + 260 Đá Sáng Thế', price: 650000, originalPrice: 800000 },
    { id: '5', name: '3280 + 600 Đá Sáng Thế', price: 1000000, originalPrice: 1250000 },
    { id: '6', name: '6480 + 1600 Đá Sáng Thế', price: 2000000, originalPrice: 2500000 },
  ],
  'honkai-star-rail': [
    { id: '1', name: '60 Mộng Ước Viễn Cổ', price: 20000, originalPrice: 25000 },
    { id: '2', name: '300 + 30 Mộng Ước Viễn Cổ', price: 100000, originalPrice: 125000 },
    { id: '3', name: '980 + 110 Mộng Ước Viễn Cổ', price: 300000, originalPrice: 375000 },
    { id: '4', name: '1980 + 260 Mộng Ước Viễn Cổ', price: 650000, originalPrice: 800000 },
    { id: '5', name: '3280 + 600 Mộng Ước Viễn Cổ', price: 1000000, originalPrice: 1250000 },
    { id: '6', name: '6480 + 1600 Mộng Ước Viễn Cổ', price: 2000000, originalPrice: 2500000 },
  ]
};

// GET /api/packages/[slug] - Lấy danh sách packages theo game slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const gamePackages = packages[slug];
    
    if (!gamePackages) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Game không có packages' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: gamePackages
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy danh sách packages' 
      },
      { status: 500 }
    );
  }
}