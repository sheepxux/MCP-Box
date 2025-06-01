/**
 * 健康检查状态接口
 */
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'down';
  version: string;
  uptime: number;
  timestamp: string;
  services: ServiceHealth[];
}

/**
 * 服务健康状态接口
 */
export interface ServiceHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime?: number;
  message?: string;
  lastChecked: string;
}
