import React from 'react';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import GamePurchaseForm from '../components/game/GamePurchaseForm';

const GamePage = () => {
  const router = useRouter();
  const { slug } = router.query;

  // Mock data - trong thực tế sẽ lấy từ API dựa vào slug
  const gameData = {
    'genshin-impact': {
      slug: 'genshin-impact',
      name: 'Genshin Impact UID',
      banner: '/assets/banner_2.png',
      description: `
        <p><strong><span style="color: rgb(224, 62, 45);">CÁC BẠN TẠO TÀI KHOẢN WEB ĐỂ NHẬN HÓA ĐƠN & KIỂM TRA TIẾN TRÌNH NẠP GAME NHA.</span><br><br>
        Đây là phương thức nạp bằng UID, gói nạp sẽ có ngay lập tức vào tài khoản Genshin Impact của bạn sau khi thanh toán thành công.</strong><br><br>
        <strong>Lưu ý:<br></strong>
        1. Cần nhập chính xác UID và Server. Nếu nhập sai Shop Wjbu không hỗ trợ hoàn tiền.<br>
        2. Các gói nạp vẫn nhận được <strong>bonus x2</strong> nếu nạp lần đầu.<br><br></p>
      `
    },
    'honkai-star-rail': {
      slug: 'honkai-star-rail',
      name: 'Honkai Star Rail UID',
      banner: '/assets/banner.png',
      description: `
        <p><strong><span style="color: #e03e2d;">CÁC BẠN TẠO TÀI KHOẢN WEB ĐỂ NHẬN HÓA ĐƠN & KIỂM TRA TIẾN TRÌNH NẠP GAME NHA.<br></span></strong></p>
        <p><strong><br>Đây là phương thức nạp <span style="color: #e03e2d;">Tự Động</span> bằng UID, gói nạp sẽ có <span style="color: #e03e2d;">Ngay Lập Tức</span> vào tài khoản Honkai: Star Rail của bạn sau khi thanh toán thành công.</strong><br><br>
        <strong>Lưu ý:<br></strong>
        1. Cần nhập chính xác UID và Server. Nếu nhập sai Shop Wjbu không hỗ trợ hoàn tiền.<br>
        2. Các gói nạp vẫn nhận được <strong>bonus x2</strong> nếu nạp lần đầu.<br><br></p>
      `
    }
  };

  const game = gameData[slug];

  if (!game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Game không tìm thấy</h1>
            <button 
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Quay về trang chủ
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main 
        className="flex-1"
        style={{
          background: 'url(/assets/game-bg.jpg)',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'scroll',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <div className="z-2 relative">
          <div className="z-2 container relative px-4 pb-8 pt-10 md:px-0">
            {/* Breadcrumb */}
            <div className="mb-4 rounded-lg bg-white p-3">
              <nav aria-label="Breadcrumb" className="flex">
                <ol className="inline-flex items-center space-x-1 md:space-x-2">
                  <li className="inline-flex items-center">
                    <button
                      onClick={() => router.push('/')}
                      className="ms-1 inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
                    >
                      <svg className="me-2.5 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"></path>
                      </svg>
                      Trang chủ
                    </button>
                  </li>
                  <li className="inline-flex items-center">
                    <svg className="ml-1 mr-2 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 14 11">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 5.64h12m0 0L9 1.85m4 3.79L9 9.432"></path>
                    </svg>
                    <span className="ms-1 text-sm font-medium text-gray-500">
                      {game.name}
                    </span>
                  </li>
                </ol>
              </nav>
            </div>

            {/* Game Purchase Form */}
            <GamePurchaseForm game={game} />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GamePage;