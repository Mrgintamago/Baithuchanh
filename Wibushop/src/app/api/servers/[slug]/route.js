import { NextResponse } from 'next/server';

// Mock data cho servers
const servers = {
  'genshin-impact': [
    { value: 'asia', name: 'Asia' },
    { value: 'america', name: 'America' },
    { value: 'europe', name: 'Europe' },
    { value: 'tw-hk-mo', name: 'TW, HK, MO' },
  ],
  'honkai-star-rail': [
    { value: 'asia', name: 'Asia' },
    { value: 'america', name: 'America' },
    { value: 'europe', name: 'Europe' },
    { value: 'tw-hk-mo', name: 'TW, HK, MO' },
  ]
};

// GET /api/servers/[slug] - Lấy danh sách servers theo game slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const gameServers = servers[slug];
    
    if (!gameServers) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Game không có servers' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: gameServers
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Không thể lấy danh sách servers' 
      },
      { status: 500 }
    );
  }
}