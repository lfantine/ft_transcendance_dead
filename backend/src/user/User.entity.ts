import { boolean } from "joi";
import { type } from "os";
import { player_spoken } from "src/interface/mp_speak/player_spoken";
import Mp from "src/mp/Mp.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

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

	@Column()
	nbGamePlayed: number;

	@Column()
	victory: number;

	@Column("text", )
	history: string;

	@Column('text', { array: true, default: []})
	friends: string[];

	@Column('text', { array: true, default: []})
	recent_contact: string[];

	@OneToMany(type => Mp, mp => mp.user_attach, )
	MPs: Mp[];

	@Column('text', { array: true, default: []})
	blocked: string[];

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