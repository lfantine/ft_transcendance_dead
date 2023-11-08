import { boolean } from "joi";
import { type } from "os";
import ChannelMessage from "src/EChannelMessage/Message.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
class Channel {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@OneToMany(type => ChannelMessage, Cmessage => Cmessage.channel)
	messages: ChannelMessage[];

	@Column('text', { array: true, })
	Admin: string[];

	@Column('text')
	Creator: string;

	@Column('text', { array: true, default: [], })
	muteUser: string[];
}

export default Channel;