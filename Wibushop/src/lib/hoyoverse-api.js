const HOYOVERSE_API_BASE = 'https://api.ennead.cc/mihoyo';
const USE_PROXY = true; // Set to true to use local proxy instead of direct API calls

// Helper function để gọi API với error handling
async function fetchHoyoverseAPI(endpoint) {
  try {
    let url;
    
    if (USE_PROXY) {
      // Use local proxy to avoid CORS issues
      const urlParts = endpoint.split('/');
      const game = urlParts[1];
      const endpointType = urlParts[2];
      const category = urlParts[3];
      
      url = `/api/hoyoverse?game=${game}&endpoint=${endpointType}`;
      if (category) {
        url += `&category=${category}`;
      }
    } else {
      url = `${HOYOVERSE_API_BASE}${endpoint}`;
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error(`Hoyoverse API Error (${endpoint}):`, error);
    
    // Provide fallback data for demo purposes
    const fallbackData = getFallbackData(endpoint);
    if (fallbackData) {
      console.warn(`Using fallback data for ${endpoint}`);
      return { success: true, data: fallbackData };
    }
    
    return { success: false, error: error.message };
  }
}

// Lấy redemption codes cho game
export async function getGameCodes(game) {
  return await fetchHoyoverseAPI(`/${game}/codes`);
}

// Lấy tin tức game
export async function getGameNews(game, category = 'notices', lang = 'en') {
  return await fetchHoyoverseAPI(`/${game}/news/${category}?lang=${lang}`);
}

// Lấy lịch game (chỉ genshin và starrail)
export async function getGameCalendar(game) {
  if (!['genshin', 'starrail'].includes(game)) {
    return { success: false, error: 'Calendar only available for Genshin and Star Rail' };
  }
  return await fetchHoyoverseAPI(`/${game}/calendar`);
}

// Lấy tất cả codes từ 2 game chính (Genshin và Star Rail)
export async function getAllActiveCodes() {
  const games = ['genshin', 'starrail']; // Chỉ 2 games chính
  const promises = games.map(async (game) => {
    const result = await getGameCodes(game);
    return {
      game,
      ...result
    };
  });

  try {
    const results = await Promise.allSettled(promises);
    const successfulResults = results
      .filter(result => result.status === 'fulfilled' && result.value.success)
      .map(result => result.value);
    
    return { success: true, data: successfulResults };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Lấy tin tức từ 2 game chính
export async function getAllGameNews(category = 'notices') {
  const games = ['genshin', 'starrail']; // Chỉ 2 games chính
  const promises = games.map(async (game) => {
    const result = await getGameNews(game, category);
    return {
      game,
      ...result
    };
  });

  try {
    const results = await Promise.allSettled(promises);
    const successfulResults = results
      .filter(result => result.status === 'fulfilled' && result.value.success)
      .map(result => result.value);
    
    return { success: true, data: successfulResults };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Utility functions
export const gameDisplayNames = {
  genshin: 'Genshin Impact',
  starrail: 'Honkai: Star Rail'
};

export const gameIcons = {
  genshin: '/icons/genshin-icon.png',
  starrail: '/icons/honkai-icon.png'
};

// Format timestamp thành readable date
export function formatGameDate(timestamp) {
  try {
    const date = new Date(timestamp * 1000); // Convert từ unix timestamp
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    return 'N/A';
  }
}

// Truncate text với length limit
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Fallback data for demo purposes when API fails
function getFallbackData(endpoint) {
  if (endpoint.includes('/codes')) {
    return {
      active: [
        {
          code: "GENSHINGIFT",
          rewards: ["60 Primogems", "10,000 Mora", "3 Sweet Madame"]
        },
        {
          code: "STARRAILGIFT", 
          rewards: ["60 Stellar Jade", "5 Refined Aether", "10,000 Credits"]
        },
        {
          code: "HSR2024OCT",
          rewards: ["30 Stellar Jade", "3 Express Supply Pass"]
        }
      ],
      inactive: [
        {
          code: "EXPIRED123",
          rewards: ["30 Primogems"]
        }
      ]
    };
  }
  
  if (endpoint.includes('/news/')) {
    return [
      {
        id: "demo1",
        title: "Genshin Impact Version 5.2 'Song of Burning Bright' - Chasca và Ororon mới",
        type: "notices",
        url: "https://genshin.hoyoverse.com/en/news",
        banner: ["https://uploadstatic-sea.hoyoverse.com/contentweb/20241011/2024101114052751188.jpg"],
        createdAt: Math.floor(Date.now() / 1000) - 3600
      },
      {
        id: "demo2", 
        title: "Honkai: Star Rail Version 2.6 'Annals of Pinecany's Mappou Age' - Rappa Banner",
        type: "events",
        url: "https://hsr.hoyoverse.com/en-us/news",
        banner: ["https://uploadstatic-sea.hoyoverse.com/contentweb/20241014/2024101411145573953.jpg"],
        createdAt: Math.floor(Date.now() / 1000) - 7200
      },
      {
        id: "demo3",
        title: "Genshin Impact - Windblume Festival Returns with New Events",
        type: "events", 
        url: "https://genshin.hoyoverse.com/en/news",
        banner: ["https://uploadstatic-sea.hoyoverse.com/contentweb/20241010/2024101010052751188.jpg"],
        createdAt: Math.floor(Date.now() / 1000) - 10800
      }
    ];
  }
  
  if (endpoint.includes('/calendar')) {
    return {
      events: [
        {
          id: 101,
          name: "Windblume Festival",
          description: "Annual flower festival returns to Mondstadt",
          type_name: "ActivityTypeVersion",
          start_time: Math.floor(Date.now() / 1000) - 86400,
          end_time: Math.floor(Date.now() / 1000) + 604800,
          rewards: [
            {
              id: 201,
              name: "Primogems",
              icon: "https://example.com/primogems.png",
              rarity: "5",
              amount: 420
            },
            {
              id: 202,
              name: "Hero's Wit",
              icon: "https://example.com/heroswit.png", 
              rarity: "4",
              amount: 20
            }
          ]
        },
        {
          id: 102,
          name: "Simulated Universe: Swarm Disaster",
          description: "New Simulated Universe mode available",
          type_name: "ActivityTypePermanent",
          start_time: Math.floor(Date.now() / 1000) - 172800,
          end_time: Math.floor(Date.now() / 1000) + 1209600,
          rewards: [
            {
              id: 301,
              name: "Stellar Jade",
              amount: 160
            }
          ]
        }
      ],
      banners: [
        {
          id: "banner1",
          name: "Epitome Invocation - Chasca's Signature",
          version: "5.2",
          characters: [
            {
              id: "1001",
              name: "Chasca",
              rarity: "5",
              element: "anemo",
              item_name: "Chasca"
            }
          ],
          start_time: Math.floor(Date.now() / 1000) - 86400,
          end_time: Math.floor(Date.now() / 1000) + 1814400
        },
        {
          id: "banner2", 
          name: "Moment of Bloom - Rappa",
          version: "2.6",
          characters: [
            {
              id: "2001",
              name: "Rappa",
              rarity: "5",
              element: "imaginary",
              item_name: "Rappa"
            }
          ],
          start_time: Math.floor(Date.now() / 1000) - 172800,
          end_time: Math.floor(Date.now() / 1000) + 1036800
        }
      ],
      challenges: []
    };
  }
  
  return null;
}