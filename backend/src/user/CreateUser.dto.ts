class CreateUserDto{
	mail: string;
	username: string;
	level: number;
	pic: Buffer;
	MMR: number;
	desc: string;

	// For the socket
	socketId: string;

	// For 42 User
	token: string;
	refresh_token: string;
	// For normal User
	is42: boolean;
	password: string;
}

export default CreateUserDto;