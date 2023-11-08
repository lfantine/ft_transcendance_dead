import Message from "src/Emessage/Message.entity";
import User from "src/Euser/User.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
class Mp {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	dest: string;

	@OneToMany(type => Message, message => message.mp)
	messages: Message[];

	// @Column({ array: true, default: []})
	// messages: Message[];

	@ManyToOne(type => User, user => user.MPs)
	user_attach: User;
}

export default Mp;