import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';

@Injectable()
@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private socketService: SocketService,
	) {}

  private socketIdToSocket: Map<string, Socket> = new Map();

  // Fonction pour envoyer un événement à un socketId spécifique
  sendToSocketId(socketId: string, event: string, data: any) {
    const socket = this.socketIdToSocket.get(socketId);
    if (socket) {
      socket.emit(event, data);
    }
  }

  // Gérer la logique lorsqu'un client se connecte
  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log(`Client connecté: ${client.id}`);
    const cookies: any = client.handshake.headers.cookie;
    if (cookies === undefined) {return ;}
    const cookieArray = cookies.split(';').map(cookie => cookie.trim());
    const myCookie = cookieArray.find(cookie => cookie.startsWith('Authentification='));
    if (myCookie) {
		  const res: any = await this.socketService.linkSocket(client.id, myCookie.substring('Authentification='.length));
      if (res.error === false) {
        this.server.emit('Uconnected', res.username); //envoyer la notif comme quoi est connecter
        this.socketIdToSocket.set(client.id, client); // ajouter de la map
        console.log('successfully linked with : ' + res.username);
        return {
          'message': "is okay",
        };
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
      this.server.emit('UserDisconnected', res.username); //envoyer la notif comme quoi est deconnecter
      this.socketIdToSocket.delete(client.id); // enlever de la map
      console.log('successfully unlinked with : ' + res.username);
      return {
        'message': "dis okay",
      };
    } else {
      console.log('error while unlinking ' + client.id);
    }
  }

  //recevoir un event ()
  // @SubscribeMessage('message')
  // handleEvent(@MessageBody() data: string, @ConnectedSocket() client : Socket ) {
  //   this.server.emit('message', client.id, data);
  // }

  @SubscribeMessage('other')
  handleOther(@MessageBody() data: string, @ConnectedSocket() client : Socket ) {
    this.server.emit('other', client.id, data);
  }

  @SubscribeMessage('test')
  handleTEST(@MessageBody() data: string, @ConnectedSocket() client : Socket ) {
    this.server.emit('test', client.id, data);
    console.log('received ping test');
  }

  @SubscribeMessage('UpdateProfile')
  sendEditEvent(@ConnectedSocket() client : Socket) {
    client.emit('profilEdit', 'none');
  }


  @SubscribeMessage('message')
  async messageSend(@MessageBody() data: any, @ConnectedSocket() client : Socket ) { // data = {mess, author, dest}
    try {
      const destSocketId = await this.socketService.getSocketIdFromUid(data.dest);
      this.socketService.MajRecentUser(data.author, data.dest);
      this.sendToSocketId(destSocketId, 'message', {message: data.mess, author: data.author});
      this.sendToSocketId(destSocketId, 'recentMaj', {});
      console.log('a envoyer message');
    } catch (e) {
      console.log('failed to send message');
    }
  }

  @SubscribeMessage('majRecent')
  async automajrecent(@MessageBody() data: any, @ConnectedSocket() client : Socket ) { // data = {mess, author, dest}
    try {
      client.emit('recentMaj', {});
    } catch (e) {
      console.log('failed to maj recent');
    }
  }
}
