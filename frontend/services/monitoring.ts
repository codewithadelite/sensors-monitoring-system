import APIService from "@/services/api";
import { IMetrics, ISensorData } from "@/types/monitoring";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class MonitoringService extends APIService {
  constructor() {
    const BASE_URL = API_BASE_URL + "sensors/";

    super(BASE_URL as string);
  }

  async getMetrics(): Promise<IMetrics> {
    return this.get("metrics/")
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getLineChartSensorData(): Promise<ISensorData[]> {
    return this.get("analytics/sensor-data/")
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default new MonitoringService();
