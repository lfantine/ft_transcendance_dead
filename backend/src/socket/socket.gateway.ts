import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';


@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  // Gérer la logique lorsqu'un client se connecte
  handleConnection(client: Socket) {
    console.log(`Client connecté: ${client.id}`);
  }

  // Gérer la logique lorsqu'un client se déconnecte
  handleDisconnect(client: Socket) {
    console.log(`Client déconnecté: ${client.id}`);
  }

  //recevoir un event ()
  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string) {
    console.log(`Client déconnecté: ${data}`);
  }
}
