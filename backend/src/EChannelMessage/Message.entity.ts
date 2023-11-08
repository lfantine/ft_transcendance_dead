import { type } from "os";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Channel from "src/EChannel/Channel.entity";

@Entity()
class ChannelMessage {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	author: string;

	@Column()
	text: string;

	@Column()
	isDate: boolean;

	@ManyToOne(type => Channel, chan_ => chan_.messages)
	channel: Channel;
}

export default ChannelMessage;