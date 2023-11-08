import Message from "src/Emessage/Message.entity";
import User from "src/Euser/User.entity";

class CreateMpDto{
	dest: string;
	user_attach: User;
}

export default CreateMpDto;