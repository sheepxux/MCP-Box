'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';

// Spider系统状态类型
interface SpiderStatus {
  isRunning: boolean;
  lastRun: string | null;
  activeScanners: string[];
  discoveredServers: number;
  validatedServers: number;
}

const SpiderAdminPage = () => {
  const [status, setStatus] = useState<SpiderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 获取Spider系统状态
  const fetchStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/spider');
      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.status}`);
      }
      const data = await response.json();
      setStatus(data);
      setError(null);
    } catch (err) {
      setError(`获取状态失败: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  // 启动Spider系统
  const startSpider = async () => {
    try {
      setStarting(true);
      const response = await fetch('/api/spider', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'start' }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP错误: ${response.status}`);
      }
      
      await fetchStatus();
      setError(null);
    } catch (err) {
      setError(`启动爬虫失败: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setStarting(false);
    }
  };

  // 组件加载时获取状态
  useEffect(() => {
    fetchStatus();
    // 定时刷新状态（每10秒）
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">MCP-Spider 管理界面</h1>
      
      {error && (
        <div className="bg-red-500/20 text-red-400 p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>系统状态</CardTitle>
            <CardDescription>MCP-Spider爬虫系统当前运行状态</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : status ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-neutral-400">运行状态:</span>
                  <span className={status.isRunning ? "text-green-400" : "text-neutral-400"}>
                    {status.isRunning ? "运行中" : "空闲"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">上次运行:</span>
                  <span>{status.lastRun || "从未运行"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">活动扫描器:</span>
                  <span>{status.activeScanners.length ? status.activeScanners.join(", ") : "无"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">已发现服务器:</span>
                  <span>{status.discoveredServers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">已验证服务器:</span>
                  <span>{status.validatedServers}</span>
                </div>
              </div>
            ) : (
              <div className="text-center text-neutral-400">无法获取状态</div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={fetchStatus}
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              刷新状态
            </Button>
            <Button
              onClick={startSpider}
              disabled={starting || (status && status.isRunning)}
            >
              {starting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {status && status.isRunning ? "爬虫运行中" : "启动爬虫"}
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>爬虫配置</CardTitle>
            <CardDescription>当前配置的扫描器和验证器</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">已配置扫描器</h3>
                <ul className="list-disc list-inside space-y-1 text-neutral-400">
                  <li>GitHub仓库扫描器</li>
                  <li>网站爬虫扫描器</li>
                  <li>官方源扫描器</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">验证器配置</h3>
                <div className="text-sm text-neutral-400">
                  <p>并发验证: 5</p>
                  <p>超时时间: 10000ms</p>
                  <p>重试次数: 3</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" disabled>配置编辑功能开发中</Button>
          </CardFooter>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>发现历史</CardTitle>
          <CardDescription>近期发现的MCP服务器</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-neutral-400">
            历史记录功能开发中...
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpiderAdminPage;
