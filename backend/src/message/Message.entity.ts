import { boolean } from "joi";
import { type } from "os";
import {player_spoken} from "src/interface/mp_speak/player_spoken";
import Mp from "src/mp/Mp.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity()
class Message {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	author: string;

	@Column()
	text: string;

	@Column()
	isDate: boolean;

	@ManyToOne(type => Mp, mp_ => mp_.messages)
	mp: Mp;

	// @Column()
	// mp: Mp;
}

export default Message;