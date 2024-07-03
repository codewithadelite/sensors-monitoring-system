export interface IMetrics {
  temperature: number;
  humidity: number;
  water_level: number;
}

export interface ISensorData {
  temperature: number;
  humidity: number;
  water_level: number;
  timestamp: string;
}
