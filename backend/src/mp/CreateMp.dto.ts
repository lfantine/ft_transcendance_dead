import Message from "src/message/Message.entity";
import User from "src/user/User.entity";

class CreateMpDto{
	dest: string;
	user_attach: User;
}

export default CreateMpDto;