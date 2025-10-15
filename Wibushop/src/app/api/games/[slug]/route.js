import { NextResponse } from 'next/server';

// Mock data cho game details
const gameData = {
  'genshin-impact': {
    id: 1,
    slug: 'genshin-impact',
    name: 'Genshin Impact UID',
    banner: '/assets/banner.png',
    description: `
      <p><strong><span style="color: rgb(224, 62, 45);">CÁC BẠN TẠO TÀI KHOẢN WEB ĐỂ NHẬN HÓA ĐƠN & KIỂM TRA TIẾN TRÌNH NẠP GAME NHA.</span><br><br>
      Đây là phương thức nạp bằng UID, gói nạp sẽ có ngay lập tức vào tài khoản Genshin Impact của bạn sau khi thanh toán thành công.</strong><br><br>
      <strong>Lưu ý:<br></strong>
      1. Cần nhập chính xác UID và Server. Nếu nhập sai Shop Wjbu không hỗ trợ hoàn tiền.<br>
      2. Các gói nạp vẫn nhận được <strong>bonus x2</strong> nếu nạp lần đầu.<br><br></p>
    `
  },
  'honkai-star-rail': {
    id: 2,
    slug: 'honkai-star-rail',
    name: 'Honkai Star Rail UID',
    banner: '/assets/banner_2.png',
    description: `
      <p><strong><span style="color: #e03e2d;">CÁC BẠN TẠO TÀI KHOẢN WEB ĐỂ NHẬN HÓA ĐƠN & KIỂM TRA TIẾN TRÌNH NẠP GAME NHA.<br></span></strong></p>
      <p><strong><br>Đây là phương thức nạp <span style="color: #e03e2d;">Tự Động</span> bằng UID, gói nạp sẽ có <span style="color: #e03e2d;">Ngay Lập Tức</span> vào tài khoản Honkai: Star Rail của bạn sau khi thanh toán thành công.</strong><br><br>
      <strong>Lưu ý:<br></strong>
      1. Cần nhập chính xác UID và Server. Nếu nhập sai Shop Wjbu không hỗ trợ hoàn tiền.<br>
      2. Các gói nạp vẫn nhận được <strong>bonus x2</strong> nếu nạp lần đầu.<br><br></p>
    `
  }
};

// GET /api/games/[slug] - Lấy thông tin chi tiết game theo slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const game = gameData[slug];
    
    if (!game) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Game không tồn tại' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: game
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy thông tin game' 
      },
      { status: 500 }
    );
  }
}