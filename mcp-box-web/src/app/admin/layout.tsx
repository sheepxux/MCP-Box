import React from 'react';
import Link from 'next/link';
import { Home, Bug, Database, Settings, Users } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Admin区域的布局组件
 * 提供了一个侧边导航栏和统一的页面结构
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  // 导航项定义
  const navItems = [
    { href: '/', label: '返回首页', icon: Home },
    { href: '/admin/spider', label: 'Spider管理', icon: Bug, active: true },
    { href: '/admin/servers', label: '服务器管理', icon: Database },
    { href: '/admin/users', label: '用户管理', icon: Users },
    { href: '/admin/settings', label: '系统设置', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950">
      {/* 顶部导航栏 */}
      <header className="border-b border-neutral-800 bg-neutral-900 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">MCP-Box 管理面板</h1>
          <Link 
            href="/"
            className="text-sm text-neutral-400 hover:text-white transition-colors"
          >
            返回首页
          </Link>
        </div>
      </header>
      
      {/* 主内容区域 */}
      <div className="flex flex-1">
        {/* 侧边导航 */}
        <aside className="w-64 border-r border-neutral-800 bg-neutral-900">
          <nav className="py-6">
            <ul className="space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <Link 
                      href={item.href}
                      className={`flex items-center px-6 py-3 text-sm transition-colors ${
                        item.active 
                          ? 'bg-orange-600/10 text-orange-500 border-l-2 border-orange-500' 
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                      }`}
                    >
                      <Icon size={18} className="mr-3" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
        
        {/* 页面内容 */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
