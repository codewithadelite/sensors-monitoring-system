import React from "react";
import { LINE_CHART_SENSOR_DATA } from "@/constants/fetch-keys";
import { ISensorData, IMetrics } from "@/types/monitoring";

import useSWR from "swr";

import MonitoringService from "@/services/monitoring";

import useWebSocket from "@/hooks/useWebSocket";
import { WEBSOCKET_METRICS_URL } from "@/constants/websocket";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type IDataDisplay = "humidity" | "temperature" | "water_level";

interface IProps {
  dataDisplay: IDataDisplay;
}

const LineChartSensorData: React.FC<IProps> = ({ dataDisplay }) => {
  const {
    data: sensorsData,
    error,
    isLoading,
    mutate,
  } = useSWR<ISensorData[]>(LINE_CHART_SENSOR_DATA, () =>
    MonitoringService.getLineChartSensorData()
  );

  const getSensorData = (): any[] => {
    if (sensorsData) {
      return sensorsData;
    } else {
      return []; // Return an empty array if sensorsData is undefined or null
    }
  };

  const getColor = (dataDisplay: IDataDisplay): string => {
    return dataDisplay === "temperature"
      ? "#8884d8"
      : dataDisplay === "humidity"
      ? "#82ca9d"
      : dataDisplay === "water_level"
      ? "#f1d475"
      : "#000";
  };

  //Connection to websocket

  useWebSocket<ISensorData>(WEBSOCKET_METRICS_URL, (newData: ISensorData) => {
    mutate((currentData) => {
      if (!currentData) return []; // Return an empty array if current data is undefined
      // Remove the first item and add the new item at the end
      const updatedData = [...currentData.slice(1), newData];
      return updatedData;
    }, false);
  });

  return (
    <div
      className="bg-dark mt-2 text-white p-4 rounded"
      style={{ width: "100%", height: "300px" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={getSensorData()}
          margin={{
            top: 0,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis xAxisId="0" dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey={dataDisplay}
            isAnimationActive={false}
            stroke={getColor(dataDisplay)}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartSensorData;
