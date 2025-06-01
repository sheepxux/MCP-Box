import { NextRequest, NextResponse } from 'next/server';
import SpiderManager from '@/spider/core/SpiderManager';
import spiderConfig from '@/spider/config';

/**
 * 获取爬虫系统状态
 */
export async function GET(request: NextRequest) {
  try {
    const spiderManager = new SpiderManager(spiderConfig);
    const status = spiderManager.getStatus();
    
    return NextResponse.json({
      success: true,
      status
    });
  } catch (error) {
    console.error('Error getting spider status:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * 启动爬虫系统
 */
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action !== 'start') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid action. Supported actions: start'
        },
        { status: 400 }
      );
    }
    
    const spiderManager = new SpiderManager(spiderConfig);
    
    // 启动爬虫系统
    // 注意：在实际应用中，这应该是一个异步任务
    spiderManager.start().catch(error => {
      console.error('Error running spider:', error);
    });
    
    return NextResponse.json({
      success: true,
      message: 'Spider system started'
    });
  } catch (error) {
    console.error('Error starting spider:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
