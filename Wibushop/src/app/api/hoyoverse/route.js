import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const game = searchParams.get('game');
    const endpoint = searchParams.get('endpoint');
    const category = searchParams.get('category');
    const lang = searchParams.get('lang') || 'en';

    if (!game || !endpoint) {
      return NextResponse.json(
        { error: 'Missing required parameters: game and endpoint' },
        { status: 400 }
      );
    }

    let apiUrl = `https://api.ennead.cc/mihoyo/${game}/${endpoint}`;
    
    // Add category for news endpoints
    if (endpoint === 'news' && category) {
      apiUrl += `/${category}?lang=${lang}`;
    }

    console.log('Proxying request to:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Wibushop/1.0 (https://wibushop.com)',
      },
      // Server-side fetch has longer timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Add CORS headers to response
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    });

  } catch (error) {
    console.error('Proxy API Error:', error);
    
    // Return fallback data for demo
    const fallbackData = getFallbackData(request.url);
    
    return NextResponse.json(
      fallbackData || { error: 'Failed to fetch data', details: error.message },
      { 
        status: fallbackData ? 200 : 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

function getFallbackData(url) {
  if (url.includes('endpoint=codes')) {
    return {
      active: [
        {
          code: "GENSHINGIFT",
          rewards: ["60 Primogems", "10,000 Mora"]
        },
        {
          code: "STARRAILGIFT", 
          rewards: ["60 Stellar Jade", "5 Refined Aether"]
        }
      ],
      inactive: []
    };
  }
  
  if (url.includes('endpoint=news')) {
    return [
      {
        id: "demo1",
        title: "Version 5.2 Update Notice - The Blazing Stars Ring in Fortune",
        type: "notices",
        url: "https://genshin.hoyoverse.com/en/news",
        banner: ["https://uploadstatic-sea.hoyoverse.com/contentweb/20241011/2024101114052751188.jpg"],
        createdAt: Math.floor(Date.now() / 1000) - 3600
      }
    ];
  }
  
  if (url.includes('endpoint=calendar')) {
    return {
      events: [
        {
          id: 101,
          name: "Windblume Festival",
          start_time: Math.floor(Date.now() / 1000) - 86400,
          end_time: Math.floor(Date.now() / 1000) + 604800,
          rewards: [
            {
              name: "Primogems",
              amount: 420
            }
          ]
        }
      ],
      banners: [
        {
          id: "banner1",
          name: "Epitome Invocation",
          version: "5.2",
          characters: [
            {
              item_name: "Chasca",
              rarity: "5"
            }
          ],
          start_time: Math.floor(Date.now() / 1000) - 86400,
          end_time: Math.floor(Date.now() / 1000) + 1814400
        }
      ]
    };
  }
  
  return null;
}