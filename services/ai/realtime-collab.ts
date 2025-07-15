// Real-Time Collaboration with AI

import { WebSocketServer } from 'ws';

/**
 * Start a WebSocket server for real-time editing
 */
export function startCollaborationServer(port: number) {
  const wss = new WebSocketServer({ port });
  wss.on('connection', (ws: any) => {
    ws.on('message', (message: any) => {
      // Broadcast incoming edits to all clients
      wss.clients.forEach((client: any) => {
        // readyState 1 means OPEN
        if (client !== ws && client.readyState === 1) {
          client.send(message);
        }
      });
    });
  });
  console.log(`Collaboration server running on ws://localhost:${port}`);
}
