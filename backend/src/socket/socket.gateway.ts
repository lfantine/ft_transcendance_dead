import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';


@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private socketService: SocketService,
	) {}

  // Gérer la logique lorsqu'un client se connecte
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connecté: ${client.id}`);
    const cookies: any = client.handshake.headers.cookie;
    const cookieArray = cookies.split(';').map(cookie => cookie.trim());
    const myCookie = cookieArray.find(cookie => cookie.startsWith('Authentification='));
    if (myCookie) {
		  const res: any = await this.socketService.linkSocket(client.id, myCookie.substring('Authentification='.length));
      if (res.error === false) {
        console.log('successfully linked with : ' + res.username);
      }
      else {
        console.log('Error with link socket-User');
      }
    }
    else {
      console.log('Error with link socket-User');
    }
  }

  // Gérer la logique lorsqu'un client se déconnecte
  async handleDisconnect(client: Socket) {
    console.log(`Client déconnecté: ${client.id}`);
    const res: any = await this.socketService.unlinkSocket(client.id);
    if (!res.error) {
      console.log('successfully unlinked with : ' + res.username);
    } else {
      console.log('error while unlinking ' + client.id);
    }
  }

  //recevoir un event ()
  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client : Socket ) {
    this.server.emit('message', client.id, data);
  }

  @SubscribeMessage('other')
  handleOther(@MessageBody() data: string, @ConnectedSocket() client : Socket ) {
    this.server.emit('other', client.id, data);
  }
}
