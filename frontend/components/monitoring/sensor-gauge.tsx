import React from "react";
import GaugeChart from "react-gauge-chart";
import { ISensorData, IMetrics } from "@/types/monitoring";
import { METRICS } from "@/constants/fetch-keys";

import useSWR from "swr";

import MonitoringService from "@/services/monitoring";

import useWebSocket from "@/hooks/useWebSocket";
import { WEBSOCKET_METRICS_URL } from "@/constants/websocket";

type IDataDisplay = "humidity" | "temperature" | "water_level";

interface IProps {
  title: string;
  dataDisplay: IDataDisplay;
}

const SensorGauge: React.FC<IProps> = ({ title, dataDisplay }) => {
  const {
    data: metrics,
    error,
    isLoading,
    mutate,
  } = useSWR<IMetrics>(METRICS, () => MonitoringService.getMetrics());

  //Connection to websocket

  useWebSocket<IMetrics>(WEBSOCKET_METRICS_URL, (newData: IMetrics) => {
    mutate(newData, false); // Update the SWR data without revalidation
  });

  function formatPercentage(percentage: number): number {
    if (percentage < 0 || percentage > 100) {
      throw new Error("Percentage must be between 0 and 100.");
    }

    // Convert the percentage to a decimal number
    let formattedPercentage = percentage / 100;

    return formattedPercentage;
  }

  return (
    <div
      className="bg-dark mt-2 text-white p-4 rounded "
      style={{ width: "100%", height: "300px" }}
    >
      <span>
        <strong> {title} </strong>
      </span>
      <div
        className="d-flex align-items-center"
        style={{ width: "100%", height: "250px" }}
      >
        {dataDisplay == "water_level" && (
          <GaugeChart
            id="gauge-chart3"
            nrOfLevels={30}
            colors={["#82ca9d", "#f1d475"]}
            arcWidth={0.3}
            percent={metrics ? metrics?.water_level / 100 : 0}
          />
        )}

        {dataDisplay == "humidity" && (
          <GaugeChart
            id="gauge-chart6"
            nrOfLevels={15}
            colors={["#82ca9d", "#f1d475", "#ff0000"]}
            percent={metrics ? metrics?.humidity / 100 : 0}
            needleColor="#345243"
          />
        )}
      </div>
    </div>
  );
};

export default SensorGauge;
