import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common'
import { ServerOptions } from 'socket.io'
import { Server, Socket } from 'socket.io';

export class SocketAdaptater extends IoAdapter {
	constructor(private app: INestApplicationContext) {
		super(app);
	}

	createIOServer(port: number, options?: ServerOptions) {
		const path = '/api/socket';

		const customOption: ServerOptions = {
			...options,
			path
		}

		const server: Server = super.createIOServer(port, customOption);

		return server;
	}
}