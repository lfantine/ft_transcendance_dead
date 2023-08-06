import { boolean } from "joi";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	// For both Users

	@Column("text", {unique: true})
	mail: string;

	@Column("text", {unique: true})
	Uid: string;

	@Column("text", )
	username: string;

	@Column({type: 'bytea'})
	pic: Buffer;

	@Column()
	desc: string;

	@Column()
	level: number;

	@Column()
	MMR: number;

	// For socket

	@Column()
	socketId: string;

	@Column()
	status: number;

	// For 42 User

	@Column()
	token: string;

	@Column()
	refresh_token: string;

	// For normal User

	@Column()
	is42: boolean;

	@Column()
	password: string;
}

export default User;