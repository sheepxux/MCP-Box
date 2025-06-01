/**
 * 格式化日期工具函数
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toISOString().split('T')[0];
};

/**
 * 生成唯一ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * 深度合并对象
 */
export const deepMerge = <T extends Record<string, any>>(
  target: T, 
  source: Partial<T>
): T => {
  const output = { ...target } as T;
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const sourceKey = key as keyof typeof source;
      const sourceValue = source[sourceKey];
      
      if (isObject(sourceValue)) {
        if (!(key in target)) {
          Object.assign(output, { [key]: sourceValue });
        } else {
          const targetKey = key as keyof typeof target;
          output[targetKey] = deepMerge(
            target[targetKey], 
            sourceValue as any
          ) as any;
        }
      } else {
        Object.assign(output, { [key]: sourceValue });
      }
    });
  }
  
  return output;
};

/**
 * 判断是否为对象
 */
const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item);
};
