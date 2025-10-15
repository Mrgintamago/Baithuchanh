"use client";

import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import GameCard from '../components/common/GameCard';
import RedemptionCodesWidget from '../components/common/RedemptionCodesWidget';
import GameNewsWidget from '../components/common/GameNewsWidget';
import GameCalendarWidget from '../components/common/GameCalendarWidget';
import { gamesApi } from '../lib/api';
import { getAllActiveCodes, getAllGameNews, getGameCalendar } from '../lib/hoyoverse-api';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videoError, setVideoError] = useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hoyoverse API Data States
  const [codesData, setCodesData] = useState([]);
  const [newsData, setNewsData] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Fetch games từ API
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await gamesApi.getAll();
        setGames(response.data);
      } catch (err) {
        setError('Không thể tải danh sách game');
        console.error('Error fetching games:', err);
        // Fallback to mock data if API fails
        setGames([
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
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Fetch Hoyoverse API data
  useEffect(() => {
    const fetchHoyoverseData = async () => {
      try {
        setApiLoading(true);
        setApiError(null);

        // Fetch all data in parallel
        const [codesResult, newsResult, genshinCalendar, starrailCalendar] = await Promise.allSettled([
          getAllActiveCodes(),
          getAllGameNews('notices'),
          getGameCalendar('genshin'),
          getGameCalendar('starrail')
        ]);

        // Handle codes data
        if (codesResult.status === 'fulfilled' && codesResult.value.success) {
          setCodesData(codesResult.value.data);
        } else {
          console.warn('Failed to fetch codes:', codesResult.reason || codesResult.value?.error);
        }

        // Handle news data
        if (newsResult.status === 'fulfilled' && newsResult.value.success) {
          setNewsData(newsResult.value.data);
        } else {
          console.warn('Failed to fetch news:', newsResult.reason || newsResult.value?.error);
        }

        // Handle calendar data
        const calendarResults = [];
        if (genshinCalendar.status === 'fulfilled' && genshinCalendar.value.success) {
          calendarResults.push({ game: 'genshin', data: genshinCalendar.value.data });
        }
        if (starrailCalendar.status === 'fulfilled' && starrailCalendar.value.success) {
          calendarResults.push({ game: 'starrail', data: starrailCalendar.value.data });
        }
        setCalendarData(calendarResults);

      } catch (error) {
        console.error('Error fetching Hoyoverse data:', error);
        setApiError('Không thể tải dữ liệu từ Hoyoverse API');
      } finally {
        setApiLoading(false);
      }
    };

    fetchHoyoverseData();

    // Set up periodic refresh (every 5 minutes)
    const refreshInterval = setInterval(fetchHoyoverseData, 5 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

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
          <div className="relative z-10">
            <div className="container relative mx-auto px-2 md:px-0 z-10">
              {/* Banner Video */}
              <div className="banner pt-10">
                <a href="https://www.hoyoverse.com/en-us/" target="_blank" rel="noopener noreferrer">
                  {!videoError ? (
                    <video 
                      width="1200" 
                      height="356" 
                      className="rounded-md" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                      onError={() => setVideoError(true)}
                    >
                      <source src="/assets/BANNER-VIDEO.mp4" type="video/mp4" />
                    </video>
                  ) : (
                    <img 
                      src="/assets/banner-fallback.png" 
                      alt="Banner Fallback" 
                      width="1200" 
                      height="356" 
                      className="rounded-md" 
                    />
                  )}
                </a>
              </div>

              {/* Notification Marquee */}
              <div className="relative mt-10 rounded-[8px] bg-white p-0.5 z-10">
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
                
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="text-white">Đang tải...</div>
                  </div>
                ) : error ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="text-red-400">{error}</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {filteredGames.map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                    {filteredGames.length === 0 && (
                      <div className="col-span-full text-center text-white py-8">
                        Không tìm thấy game nào
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Hoyoverse API Section */}
              <div className="container mt-10">
                <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                  🎮 Thông Tin Game Mới Nhất
                </h2>
                
                {apiError && (
                  <div className="mb-6 bg-red-500/20 border border-red-500/50 rounded-lg p-4">
                    <p className="text-red-300 text-center">⚠️ {apiError}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Redemption Codes Widget */}
                  <div className="lg:col-span-1">
                    <RedemptionCodesWidget codesData={codesData} />
                  </div>

                  {/* Game News Widget */}
                  <div className="lg:col-span-1">
                    <GameNewsWidget newsData={newsData} />
                  </div>

                  {/* Game Calendar Widget */}
                  <div className="lg:col-span-1">
                    <GameCalendarWidget calendarData={calendarData} />
                  </div>
                </div>

                {apiLoading && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="text-blue-300 text-sm">Đang tải dữ liệu từ Hoyoverse API...</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* About Section */}
            <div className="relative mt-10 flex justify-center text-white z-10">
              <div className="container px-2 py-5">
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
}
