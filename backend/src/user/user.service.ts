import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './User.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './CreateUser.dto';

@Injectable()
export class UserService {
	constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

	async findById(id: string): Promise<User>{
		const user = await this.userRepository.findOneBy({id});
		if (user) {
			return user;
		}
		throw new HttpException('User with this id does not exist !', HttpStatus.NOT_FOUND);
	}

	async findByMail(mail: string): Promise<User>{
		const user = await this.userRepository.findOneBy({mail});
		if (user) {
			return user;
		}
		throw new HttpException('User with this email does not exist !', HttpStatus.NOT_FOUND);
	}

	async findBySocketId(socketId: string): Promise<User>{
		const user = await this.userRepository.findOneBy({socketId});
		if (user) {
			return user;
		}
		throw new HttpException('User with this SocketId does not exist !', HttpStatus.NOT_FOUND);
	}

	async findByUsername(username: string): Promise<User>{
		const user = await this.userRepository.findOneBy({username});
		if (user) {
			return user;
		}
		throw new HttpException('User with this username does not exist !', HttpStatus.NOT_FOUND);
	}

	async findByUid(Uid: string): Promise<User>{
		const user = await this.userRepository.findOneBy({Uid});
		if (user) {
			return user;
		}
		throw new HttpException('User with this Uid does not exist !', HttpStatus.NOT_FOUND);
	}

	async createUser(userData: CreateUserDto) {
		const newUser = await this.userRepository.create(userData);
		await this.userRepository.save(newUser);
		return newUser;
	}

	async updateUser(newUser: Partial<User>): Promise<User>{
		try {
			const { mail } = newUser;
			const user = await this.userRepository.findOneBy({mail});
			const updateUser = Object.assign(user, newUser);
			this.userRepository.save(updateUser);
			return updateUser;
		} catch (e) {
			return undefined;
		}
	}

	async removeUser(id: number): Promise<void>{
		await this.userRepository.delete(id);
	}
}