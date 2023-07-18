class CreateUserDto{
	mail: string;
	token: string;
	is42: boolean;
	refresh_token: string;
	username: string;
	level: number;
	pic: Buffer;
	MMR: number;
	desc: string;
}

export default CreateUserDto;