"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import GamePurchaseForm from '../../../components/game/GamePurchaseForm';
import { gamesApi } from '../../../lib/api';

export default function GamePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug;
  
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch game data từ API
  useEffect(() => {
    const fetchGame = async () => {
      try {
        setLoading(true);
        const response = await gamesApi.getBySlug(slug);
        setGame(response.data);
      } catch (err) {
        setError('Không thể tải thông tin game');
        console.error('Error fetching game:', err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchGame();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl text-gray-600">Đang tải...</div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error or game not found
  if (error || !game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {error || 'Game không tìm thấy'}
            </h1>
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
          background: 'url(/assets/background.png)',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'scroll',
          minHeight: '100vh',
          position: 'relative',
        }}
      >
        <div className="game-detail">
          <div className="relative z-20">
            <div className="container relative px-4 pb-8 pt-10 md:px-0 z-20">
              {/* Breadcrumb */}
              <div className="mb-4 rounded-lg bg-white/95 backdrop-blur-sm p-3 shadow-lg">
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
        </div>
      </main>
      
      <Footer />
    </div>
  );
}