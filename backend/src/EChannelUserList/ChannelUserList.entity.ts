import Message from "src/Emessage/Message.entity";
import User from "src/Euser/User.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
class ChannelUL {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	ChannelID: string;

	@Column('text', { array: true, default: []})
	mutedUser: string[];

	@ManyToOne(type => User, user => user.ChannelLists)
	user_attach: User;
}

export default ChannelUL;