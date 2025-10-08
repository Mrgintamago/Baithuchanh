"use client";

import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function About() {
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
          <div className="relative z-10">
            <div className="relative flex justify-center pb-10 pt-10 z-10">
              <div className="container rounded-lg bg-white px-5 py-5 mx-4">
                <div>
                  <span className="text-xl font-semibold text-blue-600">Về Wjbu Shop</span>
                  <br /><br />
                  <span className="text-base text-black">
                    Wjbu Shop là hệ thống nạp game tự động hàng đầu Việt Nam với hơn 5 năm kinh nghiệm 
                    phục vụ cộng đồng game thủ. Chúng tôi chuyên cung cấp dịch vụ nạp game với tốc độ 
                    siêu nhanh chỉ 1-5 giây cho các tựa game hot nhất hiện tại như Genshin Impact, 
                    Honkai Star Rail, Zenless Zone Zero, Wuthering Waves và nhiều game khác.
                  </span>
                  <br /><br />
                  <span className="text-base text-black">
                    Với cam kết về chất lượng dịch vụ, Wjbu Shop đảm bảo:
                  </span>
                  <br /><br />
                  <ul className="text-base text-black space-y-2">
                    <li>✅ <strong>Tốc độ xử lý siêu nhanh:</strong> Hệ thống tự động 24/7, chỉ mất 1-5 giây</li>
                    <li>✅ <strong>Giá cả cạnh tranh:</strong> Giá rẻ nhất thị trường với nhiều ưu đãi hấp dẫn</li>
                    <li>✅ <strong>Bảo hành vĩnh viễn:</strong> Cam kết bảo hành tất cả các gói nạp</li>
                    <li>✅ <strong>Đa dạng thanh toán:</strong> Hỗ trợ nhiều phương thức thanh toán tiện lợi</li>
                    <li>✅ <strong>Hỗ trợ 24/7:</strong> Đội ngũ support chuyên nghiệp, tận tâm</li>
                  </ul>
                  <br />
                  <span className="text-base text-black">
                    Wjbu Shop tự hào là đối tác tin cậy của hàng triệu game thủ Việt Nam với uy tín 
                    được xây dựng qua 5 năm hoạt động trong cộng đồng game.
                  </span>
                  <br /><br />
                  <span className="text-base text-black">
                    <strong>Tại sao chọn Wjbu Shop?</strong>
                  </span>
                  <br /><br />
                  <div className="space-y-2 text-base text-black">
                    <div>🏆 <strong>Uy tín hàng đầu:</strong> 5+ năm kinh nghiệm, hàng triệu giao dịch thành công</div>
                    <div>⚡ <strong>Công nghệ tiên tiến:</strong> Hệ thống tự động hiện đại nhất Việt Nam</div>
                    <div>💰 <strong>Giá tốt nhất:</strong> Cam kết giá rẻ nhất thị trường</div>
                    <div>🛡️ <strong>An toàn tuyệt đối:</strong> Mã hóa SSL, bảo mật thông tin khách hàng</div>
                    <div>🎯 <strong>Chuyên nghiệp:</strong> Quy trình chuẩn hóa, minh bạch mọi giao dịch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}