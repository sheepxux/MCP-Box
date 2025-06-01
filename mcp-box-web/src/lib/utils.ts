import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 组合多个类名，解决Tailwind类名冲突
 * 使用clsx处理条件类名，然后用twMerge合并Tailwind类
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化日期
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 限制字符串长度
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
}

/**
 * 获取随机ID
 */
export function getRandomId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * 睡眠函数
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * 处理API响应错误
 */
export function handleApiError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "发生未知错误";
}
