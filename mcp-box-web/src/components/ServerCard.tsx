import React from 'react';
import { Star, ExternalLink, Github } from 'lucide-react';
import { MCPServer } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { formatDate, truncate } from '@/lib/utils';

interface ServerCardProps {
  server: MCPServer;
  onClick?: () => void;
}

/**
 * MCP服务器卡片组件
 */
export const ServerCard: React.FC<ServerCardProps> = ({ server, onClick }) => {
  const statusColors = {
    active: 'bg-green-500',
    inactive: 'bg-red-500',
    pending: 'bg-yellow-500',
    deprecated: 'bg-gray-500'
  };

  return (
    <Card 
      className="h-full flex flex-col transition-all hover:border-orange-600/50" 
      hoverable
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${statusColors[server.status as keyof typeof statusColors]}`} />
            <CardTitle>{server.title}</CardTitle>
          </div>
          {server.isFeatured && (
            <div className="bg-orange-600/20 text-orange-500 text-xs px-2 py-1 rounded-full">
              精选
            </div>
          )}
        </div>
        <div className="text-xs text-neutral-400 mt-1">{server.name}</div>
      </CardHeader>

      <CardContent className="flex-grow">
        <CardDescription className="mb-4">
          {truncate(server.description, 120)}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {server.tags.map((tag, index) => (
            <span 
              key={index} 
              className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-neutral-400">
          更新于 {formatDate(server.updatedAt)}
        </div>
        
        <div className="flex space-x-2">
          {server.repositoryUrl && (
            <a 
              href={server.repositoryUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
              title={`访问${server.title}的GitHub仓库`}
              aria-label={`访问${server.title}的GitHub仓库`}
            >
              <Github size={18} />
            </a>
          )}
          
          {server.websiteUrl && (
            <a 
              href={server.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              onClick={(e) => e.stopPropagation()}
              title={`访问${server.title}的官方网站`}
              aria-label={`访问${server.title}的官方网站`}
            >
              <ExternalLink size={18} />
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServerCard;
