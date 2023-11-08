import Channel from "src/EChannel/Channel.entity";

class CreateChannelMessageDto{
	author: string;
	text: string;
	isDate: boolean;
	Channel: Channel;
}

export default CreateChannelMessageDto;