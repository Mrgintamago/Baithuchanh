import React, { useState, useEffect } from 'react';
import { gameDisplayNames, gameIcons } from '../../lib/hoyoverse-api';

const RedemptionCodesWidget = ({ codesData }) => {
  const [expandedGame, setExpandedGame] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000); // Hide after 2 seconds
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  if (!codesData || codesData.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 h-[600px] flex flex-col">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          🎁 Game Codes
        </h3>
        <p className="text-white/70">Đang tải dữ liệu codes...</p>
      </div>
    );
  }

  const gamesWithActiveCodes = codesData.filter(gameData => 
    gameData.data && gameData.data.active && gameData.data.active.length > 0
  );

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 h-[600px] flex flex-col">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center flex-shrink-0">
        🎁 Redemption Codes 
        <span className="ml-2 text-sm bg-green-500 text-white px-2 py-1 rounded-full">
          Live
        </span>
      </h3>
      
      {gamesWithActiveCodes.length === 0 ? (
        <p className="text-white/70">Hiện tại không có codes nào đang hoạt động.</p>
      ) : (
        <div className="space-y-4 flex-1 overflow-y-auto custom-scrollbar">
          {gamesWithActiveCodes.map((gameData) => {
            const isExpanded = expandedGame === gameData.game;
            const activeCodes = gameData.data.active || [];
            const displayCodes = isExpanded ? activeCodes : activeCodes.slice(0, 2);
            
            return (
              <div key={gameData.game} className="border border-white/20 rounded-lg p-4 bg-white/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={gameIcons[gameData.game]} 
                      alt={gameDisplayNames[gameData.game]}
                      className="w-8 h-8 rounded-full"
                      onError={(e) => {
                        e.target.src = '/icons/logo.png'; // Fallback icon
                      }}
                    />
                    <div>
                      <h4 className="text-white font-semibold">
                        {gameDisplayNames[gameData.game]}
                      </h4>
                      <p className="text-white/60 text-sm">
                        {activeCodes.length} codes khả dụng
                      </p>
                    </div>
                  </div>
                  
                  {activeCodes.length > 2 && (
                    <button
                      onClick={() => setExpandedGame(isExpanded ? null : gameData.game)}
                      className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                    >
                      {isExpanded ? 'Thu gọn' : 'Xem tất cả'}
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {displayCodes.map((codeData, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <code className="bg-gray-800 text-green-400 px-2 py-1 rounded text-sm font-mono">
                              {codeData.code}
                            </code>
                            <button
                              onClick={() => copyToClipboard(codeData.code)}
                              className="text-white/60 hover:text-white transition-colors"
                              title="Copy code"
                            >
                              {copiedCode === codeData.code ? (
                                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                              )}
                            </button>
                          </div>
                          <div className="text-white/70 text-sm">
                            <span className="font-medium">Phần thưởng:</span>
                            <div className="mt-1">
                              {codeData.rewards && codeData.rewards.length > 0 ? (
                                <ul className="text-xs space-y-1">
                                  {codeData.rewards.map((reward, rewardIndex) => (
                                    <li key={rewardIndex} className="text-yellow-300">
                                      • {reward}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <span className="text-white/50 text-xs">Phần thưởng không xác định</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RedemptionCodesWidget;