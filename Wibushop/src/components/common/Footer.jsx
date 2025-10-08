import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 pb-4 text-white">
      <div className="container mx-auto px-2 md:px-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-bold">Về chúng tôi</h3>
            <p className="text-gray-400">
              Wjbu Shop - hệ thống nạp game hàng đầu Việt Nam với hơn 5 năm kinh nghiệm. 
              Chúng tôi chuyên cung cấp dịch vụ nạp game tự động 24/7 cho Genshin Impact, 
              Honkai Star Rail và nhiều game khác với tốc độ siêu nhanh chỉ trong 1-5 giây. 
              Cam kết giá rẻ nhất thị trường, bảo hành vĩnh viễn và hỗ trợ khách hàng tận tâm.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-xl font-bold">Chính sách bảo hành</h3>
            <p className="text-gray-400">
              Shop Wjbu bảo hành vĩnh viễn tất cả các gói nạp
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400">
            @COPYRIGHT 2025 WJBU SHOP, ALL RIGHTS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;