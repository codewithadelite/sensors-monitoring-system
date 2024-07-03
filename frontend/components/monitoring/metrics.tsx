import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { METRICS } from "@/constants/fetch-keys";
import { IMetrics } from "@/types/monitoring";
import {
  LightBulbIcon,
  SunIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

import useSWR from "swr";

import MonitoringService from "@/services/monitoring";

import useWebSocket from "@/hooks/useWebSocket";
import { WEBSOCKET_METRICS_URL } from "@/constants/websocket";

const Metrics = () => {
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

  return (
    <Row className="mt-4">
      <Col xs={12} md={6} lg={4}>
        <div className="bg-dark text-white mt-2 p-4 rounded d-flex justify-content-between align-items-center">
          <div className="">
            <LightBulbIcon className="icon" /> <br />
            <strong>Temperature</strong>
          </div>
          <span
            className={`text-md font-bold ${
              (metrics &&
                metrics.temperature !== undefined &&
                metrics.temperature >= 20 &&
                metrics.temperature <= 25) ||
              undefined
                ? "text-success"
                : "text-danger"
            }`}
          >
            {metrics?.temperature} <sup>0</sup>
          </span>
        </div>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <div className="bg-dark mt-2 text-white p-4 rounded d-flex justify-content-between align-items-center">
          <div className="">
            <CalculatorIcon className="icon" /> <br />
            <strong>Water level</strong>
          </div>
          <span
            className={`text-md font-bold ${
              (metrics &&
                metrics.water_level !== undefined &&
                metrics.water_level >= 50) ||
              undefined
                ? "text-success"
                : "text-danger"
            }`}
          >
            {metrics?.water_level}%
          </span>
        </div>
      </Col>
      <Col xs={12} md={6} lg={4}>
        <div className="bg-dark mt-2 text-white p-4 rounded d-flex justify-content-between align-items-center">
          <div className="">
            <SunIcon className="icon" /> <br />
            <strong>Humidity</strong>
          </div>
          <span
            className={`text-md font-bold ${
              (metrics &&
                metrics.humidity !== undefined &&
                metrics.humidity >= 45) ||
              undefined
                ? "text-success"
                : "text-danger"
            }`}
          >
            {metrics?.humidity}%
          </span>
        </div>
      </Col>
    </Row>
  );
};

export default Metrics;
