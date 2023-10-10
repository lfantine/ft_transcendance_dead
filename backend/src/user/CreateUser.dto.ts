class CreateUserDto{
	mail: string;
	Uid: string; // is for kmow friend and contact 
	username: string; // is the displayable name
	level: number;
	pic: Buffer;
	MMR: number;
	desc: string;
	nbGamePlayed: number;
	victory: number;
	history: string;
	friends: string[];
	recent_contact: string[];

	// For the socket
	socketId: string;
	status: number;

	// For 42 User
	token: string;
	refresh_token: string;
	// For normal User
	is42: boolean;
	password: string;
}

export default CreateUserDto;