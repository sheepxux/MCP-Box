import Image from 'next/image';
import Link from 'next/link';
import { ServerCard } from '@/components/ServerCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { supabase } from '@/lib/supabase';
import type { MCPServer } from '@/types';

async function getFeaturedServers() {
  try {
    // 从Supabase获取特色服务器数据
    const { data, error } = await supabase
      .from('servers')
      .select('*')
      .eq('is_featured', true)
      .order('sort', { ascending: false })
      .limit(4);
      
    if (error) {
      console.error('Error fetching featured servers:', error);
      return [];
    }
    
    return data as MCPServer[];
  } catch (error) {
    console.error('Error in getFeaturedServers:', error);
    return [];
  }
}

export default async function Home() {
  // 获取特色服务器
  const featuredServers = await getFeaturedServers();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">MCP-Box</span>
            <span className="block text-indigo-600 dark:text-indigo-400">Model Context Protocol 服务器集合</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            发现、验证和使用最全面的MCP服务器资源。MCP-Box整合自动爬取、协议兼容性验证、社区贡献和官方同步功能，为您提供最新、最可靠的MCP服务器索引。
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              as={Link}
              href="/servers"
              size="lg"
              variant="primary"
            >
              浏览服务器
            </Button>
            <Button
              as={Link}
              href="/about"
              size="lg"
              variant="outline"
            >
              了解更多
            </Button>
          </div>
        </div>
      </section>
      
      {/* Featured Servers Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            精选MCP服务器
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            探索社区推荐的优质MCP服务器
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServers.length > 0 ? (
            featuredServers.map((server) => (
              <ServerCard key={server.id} server={server} />
            ))
          ) : (
            // 如果没有特色服务器，显示一些占位卡片
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="h-60 flex items-center justify-center">
                <p className="text-gray-400 dark:text-gray-500">即将推出更多服务器...</p>
              </Card>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Button
            as={Link}
            href="/servers"
            variant="secondary"
          >
            查看全部服务器
          </Button>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            为什么选择MCP-Box?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300">
            全面的MCP服务器发现与管理平台
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <Card.Title>自动发现</Card.Title>
            <Card.Description>
              MCP-Spider爬虫系统自动扫描GitHub和网络资源，持续发现新的MCP服务器实现。
            </Card.Description>
          </Card>
          
          <Card className="p-6">
            <Card.Title>兼容性验证</Card.Title>
            <Card.Description>
              每个MCP服务器都经过严格的协议兼容性验证，确保符合MCP规范和最佳实践。
            </Card.Description>
          </Card>
          
          <Card className="p-6">
            <Card.Title>社区贡献</Card.Title>
            <Card.Description>
              支持社区提交和验证新的MCP服务器，构建最全面的MCP生态系统索引。
            </Card.Description>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-indigo-600 dark:bg-indigo-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <span className="block">准备好探索MCP生态系统了吗?</span>
              </h2>
              <p className="mt-4 max-w-3xl text-lg text-indigo-100">
                加入我们的社区，共同构建和完善MCP服务器集合。
              </p>
            </div>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Button
                  as={Link}
                  href="/contribute"
                  variant="solid"
                  className="bg-white text-indigo-600 hover:bg-indigo-50"
                  size="lg"
                >
                  贡献服务器
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <span className="text-xl font-bold text-gray-900 dark:text-white">MCP-Box</span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">© 2025</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/about" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              关于我们
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              隐私政策
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              使用条款
            </Link>
            <a href="https://github.com/your-username/mcp-box" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
