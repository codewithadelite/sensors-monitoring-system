"use client";
import React, { PureComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Metrics from "@/components/monitoring/metrics";
import LineChartSensorData from "@/components/monitoring/line-chart-sensor-data";

import GaugeChart from "react-gauge-chart";
import SensorGauge from "@/components/monitoring/sensor-gauge";

const Monitoring = () => {
  return (
    <Container fluid>
      <Metrics />
      <Row className="mt-4">
        <Col xs={12} md={6} lg={3}>
          <SensorGauge title="Tank Water Level" dataDisplay="water_level" />
        </Col>
        <Col xs={12} md={6} lg={3}>
          <SensorGauge title="Humidity" dataDisplay="humidity" />
        </Col>

        <Col xs={12} md={12} lg={6}>
          <LineChartSensorData dataDisplay="temperature" />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs={12} md={6} lg={6}>
          <LineChartSensorData dataDisplay="humidity" />
        </Col>
        <Col xs={12} md={6} lg={6}>
          <LineChartSensorData dataDisplay="water_level" />
        </Col>
      </Row>
    </Container>
  );
};

export default Monitoring;
