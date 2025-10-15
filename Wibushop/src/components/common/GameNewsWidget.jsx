import React, { useState } from 'react';
import { gameDisplayNames, gameIcons, formatGameDate, truncateText } from '../../lib/hoyoverse-api';

const GameNewsWidget = ({ newsData }) => {
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('notices');

  if (!newsData || newsData.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          📰 Game News
        </h3>
        <p className="text-white/70">Đang tải tin tức...</p>
      </div>
    );
  }

  // Filter news data
  const filteredNews = newsData
    .filter(gameData => selectedGame === 'all' || gameData.game === selectedGame)
    .filter(gameData => gameData.data && gameData.data.length > 0)
    .flatMap(gameData => 
      gameData.data.map(newsItem => ({
        ...newsItem,
        game: gameData.game
      }))
    )
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)) // Sort by newest first
    .slice(0, 6); // Limit to 6 most recent news

  const availableGames = newsData
    .filter(gameData => gameData.data && gameData.data.length > 0)
    .map(gameData => gameData.game);

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className="text-xl font-bold text-white flex items-center">
          📰 Game News
          <span className="ml-2 text-sm bg-blue-500 text-white px-2 py-1 rounded-full">
            Live
          </span>
        </h3>
        
        {/* Game Filter */}
        <select
          value={selectedGame}
          onChange={(e) => setSelectedGame(e.target.value)}
          className="bg-black/30 text-white text-sm rounded-lg px-3 py-1 border border-white/20 focus:outline-none focus:border-blue-400"
        >
          <option value="all">Cả 2 games</option>
          {availableGames.map(game => (
            <option key={game} value={game}>
              {gameDisplayNames[game]}
            </option>
          ))}
        </select>
      </div>

      {filteredNews.length === 0 ? (
        <p className="text-white/70">Không có tin tức nào.</p>
      ) : (
        <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
          {filteredNews.map((newsItem, index) => (
            <div key={`${newsItem.game}-${newsItem.id || index}`} className="border border-white/20 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-colors">
              <div className="flex items-start space-x-4">
                {/* Game Icon */}
                <div className="flex-shrink-0">
                  <img 
                    src={gameIcons[newsItem.game]} 
                    alt={gameDisplayNames[newsItem.game]}
                    className="w-10 h-10 rounded-full"
                    onError={(e) => {
                      e.target.src = '/icons/logo.png';
                    }}
                  />
                </div>

                {/* News Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                      {gameDisplayNames[newsItem.game]}
                    </span>
                    {newsItem.type && (
                      <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full">
                        {newsItem.type}
                      </span>
                    )}
                  </div>

                  <h4 className="text-white font-semibold text-sm mb-2 line-clamp-2">
                    {newsItem.title || 'Tiêu đề không có'}
                  </h4>

                  {newsItem.createdAt && (
                    <p className="text-white/60 text-xs mb-2">
                      📅 {formatGameDate(newsItem.createdAt)}
                    </p>
                  )}

                  {/* News Banner/Image */}
                  {newsItem.banner && newsItem.banner.length > 0 && (
                    <div className="mb-2">
                      <img 
                        src={newsItem.banner[0]} 
                        alt="News banner"
                        className="w-full h-24 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  {/* Read More Link */}
                  {newsItem.url && (
                    <a 
                      href={newsItem.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 text-xs transition-colors"
                    >
                      Đọc thêm
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameNewsWidget;