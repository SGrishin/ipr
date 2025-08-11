import { Metric } from '../types/index';

const metricsStore: Record<string, Metric[]> = {};
const MAX_METRICS_PER_TYPE = 100;

export const recordMetric = (name: string, value: number): void => {
  if (!metricsStore[name]) {
    metricsStore[name] = [];
  }

  metricsStore[name].push({
    name,
    value,
    timestamp: new Date()
  });

  if (metricsStore[name].length > MAX_METRICS_PER_TYPE) {
    metricsStore[name].shift();
  }
};

export const getMetrics = (name?: string): Metric[] => {
  if (name) {
    return metricsStore[name] || [];
  }
  
  return Object.values(metricsStore).flat();
};

const getRecent = (name: string, period: number = 5): Metric[] => {
  const metrics = getMetrics(name);
  if (metrics.length === 0) return [];

  const now = new Date();
  const threshold = new Date(now.getTime() - period * 60000);

  const recentMetrics = metrics.filter(m => m.timestamp >= threshold);
  
  return recentMetrics
}

export const getAverage = (name: string, period: number = 5): number => {
  const recentMetrics = getRecent(name, period);
  if (recentMetrics.length === 0) return 0;

  const sum = recentMetrics.reduce((acc, m) => acc + m.value, 0);
  return sum / recentMetrics.length;
};

export const getSumAverage = (name: string, period: number = 5): number => {
  const recentMetrics = getRecent(name, period);
  if (recentMetrics.length === 0) return 0;

  const sum = recentMetrics.reduce((acc, m) => acc + m.value, 0);
  return sum;
};

