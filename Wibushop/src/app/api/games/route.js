import { NextResponse } from 'next/server';

// thay thế bằng database calls
const games = [
  {
    id: 1,
    slug: 'genshin-impact',
    name: 'Genshin Impact UID',
    icon: '/icons/genshin-icon.png',
    description: 'Nạp Đá Sáng Thế cho Genshin Impact',
    type: 'AUTO',
    banner: '/assets/banner.png',
    gameDescription: `
      <p><strong><span style="color: rgb(224, 62, 45);">CÁC BẠN TẠO TÀI KHOẢN WEB ĐỂ NHẬN HÓA ĐƠN & KIỂM TRA TIẾN TRÌNH NẠP GAME NHA.</span><br><br>
      Đây là phương thức nạp bằng UID, gói nạp sẽ có ngay lập tức vào tài khoản Genshin Impact của bạn sau khi thanh toán thành công.</strong><br><br>
      <strong>Lưu ý:<br></strong>
      1. Cần nhập chính xác UID và Server. Nếu nhập sai Shop Wjbu không hỗ trợ hoàn tiền.<br>
      2. Các gói nạp vẫn nhận được <strong>bonus x2</strong> nếu nạp lần đầu.<br><br></p>
    `
  },
  {
    id: 2,
    slug: 'honkai-star-rail',
    name: 'Honkai Star Rail UID',
    icon: '/icons/honkai-icon.png',
    description: 'Nạp Mộng Ước Viễn Cổ cho Honkai Star Rail',
    type: 'AUTO',
    banner: '/assets/banner_2.png',
    gameDescription: `
      <p><strong><span style="color: #e03e2d;">CÁC BẠN TẠO TÀI KHOẢN WEB ĐỂ NHẬN HÓA ĐƠN & KIỂM TRA TIẾN TRÌNH NẠP GAME NHA.<br></span></strong></p>
      <p><strong><br>Đây là phương thức nạp <span style="color: #e03e2d;">Tự Động</span> bằng UID, gói nạp sẽ có <span style="color: #e03e2d;">Ngay Lập Tức</span> vào tài khoản Honkai: Star Rail của bạn sau khi thanh toán thành công.</strong><br><br>
      <strong>Lưu ý:<br></strong>
      1. Cần nhập chính xác UID và Server. Nếu nhập sai Shop Wjbu không hỗ trợ hoàn tiền.<br>
      2. Các gói nạp vẫ nhận được <strong>bonus x2</strong> nếu nạp lần đầu.<br><br></p>
    `
  }
];

// Lấy danh sách tất cả games
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: games
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy danh sách game' 
      },
      { status: 500 }
    );
  }
}