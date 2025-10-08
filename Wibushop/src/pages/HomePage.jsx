import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import GameCard from '../components/common/GameCard';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - trong thực tế sẽ lấy từ API
  const games = [
    {
      id: 1,
      slug: 'genshin-impact',
      name: 'Genshin Impact UID',
      icon: '/icons/genshin-icon.png',
      description: 'Nạp Đá Sáng Thế cho Genshin Impact',
      type: 'AUTO'
    },
    {
      id: 2,
      slug: 'honkai-star-rail',
      name: 'Honkai Star Rail UID',
      icon: '/icons/honkai-icon.png',
      description: 'Nạp Mộng Ước Viễn Cổ cho Honkai Star Rail',
      type: 'AUTO'
    }
  ];

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div 
          style={{
            background: 'url(/assets/background.png)',
            backgroundPosition: 'center top',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundAttachment: 'scroll',
            minHeight: '100vh',
            position: 'relative',
          }}
          className="game-detail"
        >
          <div className="z-2 relative">
            <div className="z-2 container relative mx-auto px-2 md:px-0">
              {/* Banner Video */}
              <div className="banner pt-10">
                <a href="https://www.hoyoverse.com/en-us/" target="_blank" rel="noopener noreferrer">
                  <video 
                    width="1200" 
                    height="356" 
                    className="rounded-md" 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  >
                    <source src="/assets/banner-video.mp4" type="video/mp4" />
                    <img 
                      src="/assets/banner-fallback.png" 
                      alt="Banner" 
                      width="1200" 
                      height="356" 
                      className="rounded-md" 
                    />
                  </video>
                </a>
              </div>

              {/* Notification Marquee */}
              <div className="z-2 relative mt-10 rounded-[8px] bg-white p-0.5">
                <div className="marquee overflow-hidden rounded-[7px] border-[solid] bg-white px-2 py-1">
                  <div className="marquee-wrapper flex animate-scroll">
                    <div className="marquee-content flex">
                      <span className="flex">
                        <span className="px-2 text-lg text-black">
                          💥 CHỈ NẠP GENSHIN VÀ HONKAI 💥
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Games Section */}
              <div className="container mt-10 flex flex-col items-center justify-between md:flex-row">
                <h2 className="mb-4 text-2xl font-semibold text-white md:mb-0">
                  DANH SÁCH GAME
                </h2>
                
                <div className="search-field relative">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Tìm game"
                    className="w-full rounded-full border border-gray-300 px-4 py-2 pl-10 focus:border-blue-300 focus:outline-none focus:ring"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Game Grid */}
              <div className="container mt-10">
                <h2 className="text-2xl font-semibold text-white">Nạp UID</h2>
                <p className="mb-4 text-white">
                  Các đơn nạp UID sẽ được tự động xử lí 24/7 chỉ từ 1-5s
                </p>
                
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {filteredGames.map((game) => (
                    <GameCard key={game.id} game={game} />
                  ))}
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="z-2 relative mt-10 flex justify-center text-white">
              <div className="xs:px-0 container px-2 py-5">
                <span className="text-xl font-semibold text-white">
                  Nạp Game Bảo Hành - Tự Động - Giá Rẻ
                </span>
                <br /><br />
                <span className="text-base text-white">
                  Shop Wjbu xử lí hoàn toàn tự động các đơn nạp UID, tốc độ chỉ 1-5s 
                  Genshin Impact và Honkai Star Rail. <br />
                  Với Uy Tín 5 năm ở cộng đồng game Michos, Kuro... các bạn sẽ cực kì yên tâm 
                  khi nạp game ở shop chúng tôi. Giá rẻ hơn bạn tự nạp từ 5 - 30% mà tốc độ nạp lại cực nhanh. 
                  Shop hân hạnh phục vụ bạn.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;