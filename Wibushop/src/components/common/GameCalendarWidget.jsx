import React from 'react';
import { formatGameDate } from '../../lib/hoyoverse-api';

const GameCalendarWidget = ({ calendarData }) => {
  if (!calendarData || calendarData.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 h-[600px] flex flex-col">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          📅 Game Events
        </h3>
        <p className="text-white/70">Đang tải lịch sự kiện...</p>
      </div>
    );
  }

  // Combine all calendar data from different games
  const allEvents = [];
  const allBanners = [];

  calendarData.forEach(gameData => {
    if (gameData.data) {
      // Add events
      if (gameData.data.events) {
        gameData.data.events.forEach(event => {
          allEvents.push({
            ...event,
            game: gameData.game,
            type: 'event'
          });
        });
      }

      // Add banners
      if (gameData.data.banners) {
        gameData.data.banners.forEach(banner => {
          allBanners.push({
            ...banner,
            game: gameData.game,
            type: 'banner'
          });
        });
      }
    }
  });

  // Sort events by start time (nearest first)
  const sortedEvents = allEvents
    .filter(event => event.start_time)
    .sort((a, b) => a.start_time - b.start_time)
    .slice(0, 4); // Show only 4 most recent/upcoming events

  const sortedBanners = allBanners
    .filter(banner => banner.start_time)
    .sort((a, b) => a.start_time - b.start_time)
    .slice(0, 3); // Show only 3 banners

  const gameIcons = {
    genshin: '/icons/genshin-icon.png',
    starrail: '/icons/honkai-icon.png'
  };

  const gameNames = {
    genshin: 'Genshin Impact',
    starrail: 'Honkai: Star Rail'
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 h-[600px] flex flex-col">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center flex-shrink-0">
        📅 Game Events & Banners
        <span className="ml-2 text-sm bg-orange-500 text-white px-2 py-1 rounded-full">
          Live
        </span>
      </h3>

      <div className="space-y-6 flex-1 overflow-y-auto custom-scrollbar">
        {/* Events Section */}
        {sortedEvents.length > 0 && (
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center">
              🎉 Sự kiện hiện tại
            </h4>
            <div className="space-y-3">
              {sortedEvents.map((event, index) => {
                const now = Date.now() / 1000;
                const isActive = now >= event.start_time && now <= event.end_time;
                const isUpcoming = now < event.start_time;
                
                return (
                  <div key={`event-${event.game}-${event.id || index}`} className="border border-white/20 rounded-lg p-3 bg-white/5">
                    <div className="flex items-start space-x-3">
                      <img 
                        src={gameIcons[event.game]} 
                        alt={gameNames[event.game]}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        onError={(e) => {
                          e.target.src = '/icons/logo.png';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                            {gameNames[event.game]}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isActive ? 'bg-green-600 text-white' :
                            isUpcoming ? 'bg-yellow-600 text-white' :
                            'bg-gray-600 text-white'
                          }`}>
                            {isActive ? 'Đang diễn ra' : isUpcoming ? 'Sắp diễn ra' : 'Đã kết thúc'}
                          </span>
                        </div>
                        
                        <h5 className="text-white font-medium text-sm mb-1">
                          {event.name || 'Sự kiện không tên'}
                        </h5>
                        
                        <div className="text-white/60 text-xs space-y-1">
                          <p>🕐 Bắt đầu: {formatGameDate(event.start_time)}</p>
                          <p>🏁 Kết thúc: {formatGameDate(event.end_time)}</p>
                        </div>

                        {event.rewards && event.rewards.length > 0 && (
                          <div className="mt-2">
                            <p className="text-white/70 text-xs font-medium">Phần thưởng:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {event.rewards.slice(0, 3).map((reward, rewardIndex) => (
                                <span key={rewardIndex} className="text-xs bg-yellow-600/30 text-yellow-300 px-1 py-0.5 rounded">
                                  {reward.name} x{reward.amount}
                                </span>
                              ))}
                              {event.rewards.length > 3 && (
                                <span className="text-xs text-white/50">+{event.rewards.length - 3} khác</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Banners Section */}
        {sortedBanners.length > 0 && (
          <div>
            <h4 className="text-white font-semibold mb-3 flex items-center">
              🌟 Banner hiện tại
            </h4>
            <div className="space-y-3">
              {sortedBanners.map((banner, index) => {
                const now = Date.now() / 1000;
                const isActive = now >= banner.start_time && now <= banner.end_time;
                
                return (
                  <div key={`banner-${banner.game}-${banner.id || index}`} className="border border-white/20 rounded-lg p-3 bg-white/5">
                    <div className="flex items-start space-x-3">
                      <img 
                        src={gameIcons[banner.game]} 
                        alt={gameNames[banner.game]}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                        onError={(e) => {
                          e.target.src = '/icons/logo.png';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full">
                            {gameNames[banner.game]}
                          </span>
                          {banner.version && (
                            <span className="text-xs bg-gray-600 text-white px-2 py-1 rounded-full">
                              v{banner.version}
                            </span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            isActive ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'
                          }`}>
                            {isActive ? 'Đang hoạt động' : 'Không hoạt động'}
                          </span>
                        </div>
                        
                        <h5 className="text-white font-medium text-sm mb-1">
                          {banner.name || `Banner v${banner.version}`}
                        </h5>
                        
                        <div className="text-white/60 text-xs space-y-1">
                          <p>🕐 Bắt đầu: {formatGameDate(banner.start_time)}</p>
                          <p>🏁 Kết thúc: {formatGameDate(banner.end_time)}</p>
                        </div>

                        {banner.characters && banner.characters.length > 0 && (
                          <div className="mt-2">
                            <p className="text-white/70 text-xs font-medium">Nhân vật featured:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {banner.characters.slice(0, 3).map((character, charIndex) => (
                                <span key={charIndex} className="text-xs bg-pink-600/30 text-pink-300 px-1 py-0.5 rounded">
                                  {character.item_name || character.name} ⭐{character.rarity}
                                </span>
                              ))}
                              {banner.characters.length > 3 && (
                                <span className="text-xs text-white/50">+{banner.characters.length - 3} khác</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {sortedEvents.length === 0 && sortedBanners.length === 0 && (
          <p className="text-white/70 text-center">Không có sự kiện hoặc banner nào đang hoạt động.</p>
        )}
      </div>
    </div>
  );
};

export default GameCalendarWidget;