import Mp from "src/mp/Mp.entity";

class CreateMessageDto{
	author: string;
	text: string;
	isDate: boolean;
	mp: Mp;
}

export default CreateMessageDto;