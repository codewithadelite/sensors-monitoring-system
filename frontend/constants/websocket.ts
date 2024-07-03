const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_BASE_URL;
export const WEBSOCKET_METRICS_URL = WEBSOCKET_URL
  ? `${WEBSOCKET_URL}sensors/metrics/`
  : "ws://localhost:8000/sensors/metrics/";
