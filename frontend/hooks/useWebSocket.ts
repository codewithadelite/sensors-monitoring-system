import { useEffect } from "react";

const useWebSocket = <T>(url: string, onMessage: (param: T) => void) => {
  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.onmessage = (event) => {
      const data: T = JSON.parse(event.data);
      onMessage(data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.close();
    };
  }, [url, onMessage]);
};

export default useWebSocket;
